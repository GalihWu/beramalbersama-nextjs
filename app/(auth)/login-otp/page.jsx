'use client';

import Cookies from 'js-cookie';
import Header from '@/components/ui/header';
import { useToast } from '@/context/ToastContext';
import { formatCountdown } from '@/lib/formater';
import { postOtp, postRegister } from '@/service/PostData';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const LoginOTP = () => {
  const router = useRouter();
  const showToast = useToast();
  const phone = Cookies.get('authphone');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [countdown, setCountdown] = useState(180);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const { mutate: verifyOtp } = useMutation({
    mutationFn: postOtp,
    onSuccess: (data) => {
      setLoading(false);
      console.log(data);
      setOtp(Array(6).fill(''));
      setCountdown(0);
      router.push('/set-password');
    },
    onError: (error) => {
      setError(error.message || 'An error occurred');
      setLoading(false);
    },
  });

  const { mutate: requestOtp } = useMutation({
    mutationFn: postRegister,
    onSuccess: (data) => {
      console.log(data);
      setLoading(false);
      setCountdown(180);
      setError('');
    },
    onError: (error) => {
      setError(error.message || 'An error occurred');
    },
  });

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleRequestOtp = () => {
    if (countdown > 0) {
      showToast('Please wait before requesting a new OTP', 'error');
      return;
    }
    setLoading(true);
    requestOtp({ phone });
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const otpString = otp.join('');

    if (otpString.length < 6) {
      showToast('Please enter a valid OTP', 'error');
      setLoading(false);
      return;
    }

    const credentials = {
      otp: otpString,
      phone,
    };
    verifyOtp(credentials);
  };

  return (
    <>
      <Header type="notshare" text="Verifikasi OTP" />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body">
              <p className="title-content">Pastikan Kepemilikan Akun Ini</p>
              <p>
                Masukan 6 digit kode yang dikirimkan ke nomor
                <strong>&nbsp; {phone}</strong>
              </p>
              <form onSubmit={handleOtpSubmit} className="form-login-small">
                <div className="mb-4">
                  <div className="input-otp w-[80%] mx-auto">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="number"
                        className="form-control form-otp"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength="1"
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    className="btn button-cyan w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verifikasi'}
                  </button>
                </div>
                <div className="text-center">
                  <p>Belum menerima kode OTP?</p>
                  {countdown > 0 ? (
                    <p>
                      Kirim ulang dalam{' '}
                      <strong> {formatCountdown(countdown)} detik</strong>
                    </p>
                  ) : (
                    <div
                      className="border rounded-md cursor-pointer font-semibold p-2 w-[30%] mx-auto"
                      onClick={() => handleRequestOtp()}
                    >
                      Kirim Ulang
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOTP;
