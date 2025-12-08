'use client';
import Header from '@/components/ui/header';
import { useToast } from '@/context/ToastContext';
import { postLogin } from '@/service/PostData';
import { useMutation } from '@tanstack/react-query';
// import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaApple, FaFacebookF, FaGoogle } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Login = () => {
  const showToast = useToast();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    if (token) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: login, isLoading } = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const { token } = data.data;
      // localStorage.setItem('authToken', token);
      Cookies.set('authToken', token, { expires: 14 });
      // Ganti dengan halaman yang sama untuk refresh
      router.back(router.asPath);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      showToast('Please enter your email/phone and password', 'error');
      return;
    }
    let credentials = '';
    // Distinguish email and phone
    const isEmail = emailOrPhone.includes('@');
    if (isEmail) {
      credentials = {
        email: isEmail ? emailOrPhone : '',
        password,
      };
    } else {
      credentials = {
        phone: !isEmail ? emailOrPhone : '',
        password,
      };
    }

    // Trigger the login mutation
    login(credentials);
  };

  return (
    <>
      <Header type="notshare" text="Login" />
      {/* {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )} */}

      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body">
              <p className="title-content">
                Masuk untuk nikmati kemudahan berdonasi dan akses fitur lainnya
              </p>
              <form onSubmit={handleLogin} className="form-login-small">
                {error && (
                  <div className="alert alert-danger">
                    Nomor Telepon atau Password Anda Salah
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">
                    Telepon
                  </label>
                  <input
                    type="text"
                    className="py-3 bg-gray-100 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Masukkan  nomor telepon"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="py-3 bg-gray-100 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-end my-2">
                  <a href="/lupa-password" className="auth-link">
                    Lupa Password?
                  </a>
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="btn button-cyan w-100 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Masuk'}
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <p>
                    Belum punya akun?{' '}
                    <a href="/register" className="auth-link">
                      Daftar disini
                    </a>
                  </p>
                </div>
              </form>
            </div>
            <div className="content-body border-top hidden">
              <p className="title-content text-center">
                Atau masuk lebih cepat
              </p>
              <div className="button-auth-wrapper">
                <div className="mb-3">
                  <button className="btn button-border-grey w-100">
                    <FaApple className="icon-left-fix" /> Masuk Dengan Apple ID
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn button-red w-100">
                    <FaGoogle className="icon-left-fix" /> Masuk Dengan Google
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn button-fbook w-100">
                    <FaFacebookF className="icon-left-fix" /> Masuk Dengan
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div
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
      </div>
       */}
    </>
  );
};

export default Login;
