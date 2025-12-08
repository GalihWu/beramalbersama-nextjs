'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/header';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postChangePassword, postChangePersonalData } from '@/service/PostData';
import { getMyAccount } from '@/service/FetchData';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useToast } from '@/context/ToastContext';

// Pindahkan InputField ke luar komponen utama
const InputField = React.memo(
  ({ label, id, name, value, onChange, placeholder, type = 'text' }) => (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className="py-3 ps-4 bg-gray-100 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      />
    </div>
  )
);

InputField.displayName = 'InputField';

const Profil = () => {
  const showToast = useToast();
  const [isProcessingProfile, setIsProcessingProfile] = useState(false);
  const [isProcessingPassword, setIsProcessingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reff_code: '',
  });

  const [password, setPassword] = useState('');
  const [passwordKonfirmasi, setPasswordKonfirmasi] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const profileMutation = useMutation({
    mutationFn: postChangePersonalData,
    onSuccess: (data) => {
      setFormData({
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email,
        reff_code: data.data.reff_code,
      });
      showToast('Profil berhasil diubah');
    },
    onError: (error) => {
      console.error('Edit Profile failed:', error);
      showToast('Gagal mengubah profil. Silakan coba lagi.', 'error');
    },
  });

  const passwordMutation = useMutation({
    mutationFn: postChangePassword,
    onSuccess: () => {
      showToast('Password berhasil diubah!');
    },
    onError: (error) => {
      console.error('Gagal mengubah password:', error);
      showToast('Gagal mengubah password. Silakan coba lagi.', 'error');
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['myAccount'],
    queryFn: getMyAccount,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setFormData({
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email,
        reff_code: data.data.reff_code,
      });
    }
  }, [data, isLoading]);

  if (error) {
    return (
      <div>An error occurred: {error?.message || 'Something went wrong.'}</div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setIsProcessingProfile(true);
    profileMutation.mutate(formData, {
      onSettled: () => {
        setIsProcessingProfile(false);
      },
    });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (password !== passwordKonfirmasi) {
      showToast('Password dan konfirmasi password tidak cocok.', 'error');
      return;
    }
    const data = {
      password: password,
      password_confirmation: passwordKonfirmasi,
    };
    setIsProcessingPassword(true);
    passwordMutation.mutate(data, {
      onSettled: () => {
        setIsProcessingPassword(false);
      },
    });

    setPassword('');
    setPasswordKonfirmasi('');
  };

  return (
    <>
      <Header type="title" text="Ubah Profil" />
      <div className="container content-wrapper bg-white px-4 pb-6 animate-fade-in">
        <div className="w-100">
          <div className="tqb-transaction border-0">
            <a href="#" className="transaction-row">
              <div className="w-16 h-16 rounded-full bg-green">
                <Image
                  width={500}
                  height={500}
                  src="/img/profile.png"
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="text">
                <div
                  className="text-subtitle font-semibold"
                  style={{ fontSize: '16px' }}
                >
                  {formData.name || '...'}
                </div>
                <div className="text-subtitle">{formData.phone}</div>
                <div className="text-subtitle">{formData.email}</div>
              </div>
            </a>
          </div>
        </div>

        {/* form profile */}
        <form
          className="mt-[2rem] flex flex-col gap-4"
          onSubmit={handleSubmitProfile}
        >
          <InputField
            label="Nama Pengguna"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Nomor Whatsapp"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Kode Reveral"
            id="reff_code"
            name="reff_code"
            value={formData.reff_code}
            onChange={handleChange}
          />

          <div className="donate-sticky-content donate-total shadow-sm">
            <button
              type="submit"
              className="btn button-cyan w-100"
              disabled={isProcessingProfile}
            >
              {isProcessingProfile ? 'Processing...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>

        {/* form password */}
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
                placeholder="Masukan password baru"
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
              {isProcessingPassword ? 'Processing...' : 'Ubah Password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profil;
