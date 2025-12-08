'use client';

import Cookies from 'js-cookie';
import Header from '@/components/ui/header';
import { useToast } from '@/context/ToastContext';
import { postRegister } from '@/service/PostData'; // Ensure this function is set up for registration
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const LupaPassword = () => {
  const showToast = useToast();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: postRegister,
    onSuccess: (data) => {
      console.log(data);
      setLoading(false);
      Cookies.set('authphone', phone, { expires: 1 });
      router.push('/login-otp');
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
      // Reset captcha jika error
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
    },
  });

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!phone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    if (!captchaVerified) {
      showToast('Harap verifikasi bahwa Anda bukan robot', 'error');
      setLoading(false);
      return;
    }

    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) {
      showToast('Gagal mendapatkan token ReCAPTCHA', 'error');
      setLoading(false);
      return;
    }

    const credentials = {
      phone,
      'g-recaptcha-response': captchaToken,
    };
    register(credentials);
  };

  return (
    <>
      <Header type="notshare" text="Lupa Password" />
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body">
              {/* <div className="text-2xl font-bold">
                Sedang Dilakukan Maintenance
              </div> */}
              <div className="text-2xl font-bold">Atur ulang katasandi</div>
              <p>
                Masukkan no whatsapp akun pengguna Anda dan kami akan
                mengirimkan kode otp untuk mengatur ulang kata sandi anda.
              </p>
              <form onSubmit={handleRegister} className="form-login-small">
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">
                    Nomor Telepon *
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="py-3 bg-gray-100 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                    name="phone"
                    placeholder="Masukkan Nomor Telepon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_SITE_KEY_CAPTCHA}
                    onChange={handleCaptchaChange}
                  />
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    className="btn button-cyan w-100"
                    disabled={isLoading || loading}
                  >
                    {isLoading || loading ? 'Loading...' : 'Kirim Kode'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LupaPassword;
