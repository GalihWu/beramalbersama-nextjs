'use client';
import Cookies from 'js-cookie';
import Header from '@/components/ui/header';
import { useToast } from '@/context/ToastContext';
import { postRegister } from '@/service/PostData';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaApple, FaFacebookF, FaGoogle } from 'react-icons/fa';

const Register = () => {
  const showToast = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      // console.log(data);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !phone) {
      showToast('Harap isi semua field yang wajib diisi', 'error');
      setLoading(false);
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
      name,
      phone,
      email,
      'g-recaptcha-response': captchaToken,
    };

    register(credentials);
  };

  return (
    <>
      <Header type="notshare" text="Register" />
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body">
              <div className="text-2xl font-bold">
                Mendaftar dan sebarkan kebaikan yuk
              </div>
              <form onSubmit={handleRegister} className="form-login-small">
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">
                    Nama Pengguna *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="py-3 bg-gray-100 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                    name="name"
                    placeholder="Masukkan Nama Lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email <span>(opsional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="py-3 bg-gray-100 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                    name="email"
                    placeholder="Masukkan Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_SITE_KEY_CAPTCHA}
                    onChange={handleCaptchaChange}
                  />
                </div>

                <p className="text-center">
                  Dengan mendaftar berarti kamu setuju dengan&nbsp;
                  <a className="text-green" href="/syarat-ketentuan">
                    Syarat & Ketentuan
                  </a>
                  &nbsp; Aksiberbagi.com dan&nbsp;
                  <a className="text-green" href="/syarat-ketentuan">
                    Kebijakan Privasi
                  </a>
                </p>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="btn button-cyan w-100"
                    disabled={isLoading || loading}
                  >
                    {isLoading || loading ? 'Loading...' : 'Mendaftar'}
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <p>
                    Sudah punya akun?&nbsp;
                    <a href="/login" className="auth-link">
                      Login disini
                    </a>
                  </p>
                </div>
              </form>
            </div>
            <div className="content-body border-top hidden">
              <p className="title-content text-center">
                Atau Daftar lebih cepat
              </p>
              <div className="button-auth-wrapper">
                <div className="mb-3">
                  <button className="btn button-border-grey w-100">
                    <FaApple className="icon-left-fix" /> Daftar Dengan Apple ID
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn button-red w-100">
                    <FaGoogle className="icon-left-fix" /> Daftar Dengan Google
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn button-fbook w-100">
                    <FaFacebookF className="icon-left-fix" /> Daftar Dengan
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="modalConfirm"
        tabIndex={-1}
        aria-labelledby="modalConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body modal-confirm">
              <p className="title-modal">
                Nomor Telepon yang anda masukan sudah benar?
              </p>
              <p className="text-modal">
                kami akan mengirimkan kode OTP ke nomor 08977665****
              </p>
              <div className="button-wrapper-modal">
                <button className="btn button-border-cyan">Tutup</button>
                <a href="login-otp.html" className="btn button-cyan">
                  Ya, Lanjutkan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Register;
