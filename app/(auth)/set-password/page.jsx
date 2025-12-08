'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '@/components/ui/header';
import { useMutation } from '@tanstack/react-query';
import { postSetPassword } from '@/service/PostData';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

const SetPassword = () => {
  const showToast = useToast();
  const router = useRouter();
  const phone = Cookies.get('authphone');
  const [isProcessingPassword, setIsProcessingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordKonfirmasi, setPasswordKonfirmasi] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    if (token) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { mutate: addPassword } = useMutation({
    mutationFn: postSetPassword,
    onSuccess: (data) => {
      console.log('Password set successful:', data);
      showToast('Password set successfully!');
      Cookies.remove('authphone');
      router.push('/login');
    },
    onError: (error) => {
      console.error('Password change failed:', error);
      showToast('Failed to change password. Please try again.', 'error');
    },
  });

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password !== passwordKonfirmasi) {
      showToast('Password dan konfirmasi password tidak cocok.', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password harus memiliki minimal 6 karakter.', 'error');
      return;
    }

    const data = {
      phone,
      password,
      password_confirmation: passwordKonfirmasi,
    };

    setIsProcessingPassword(true);
    addPassword(data, {
      onSettled: () => {
        setIsProcessingPassword(false);
      },
    });
    setPassword('');
    setPasswordKonfirmasi('');
  };

  return (
    <>
      <Header type="onlytext" text="Atur Password" />
      <div className="container content-wrapper bg-white px-4">
        <form
          className="mt-[2rem] flex flex-col gap-4"
          onSubmit={handleSubmitPassword}
        >
          <div className="mb-2">
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="py-3 ps-4 bg-gray-100 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Masukan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-gray-400"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label">Konfirmasi Password</label>
            <div className="relative">
              <input
                id="passwordKonfirmasi"
                type={showPassword ? 'text' : 'password'}
                className="py-3 ps-4 bg-gray-100 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Ulangi password"
                value={passwordKonfirmasi}
                onChange={(e) => setPasswordKonfirmasi(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-gray-400"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="donate-sticky-content donate-total shadow-sm">
            <button
              type="submit"
              className="btn button-cyan w-100"
              disabled={isProcessingPassword}
            >
              {isProcessingPassword ? 'Processing...' : 'Selanjutnya'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SetPassword;
