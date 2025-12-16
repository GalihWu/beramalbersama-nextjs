'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaPlusCircle } from 'react-icons/fa';

import { useQuery } from '@tanstack/react-query';
import { getMyAccount } from '@/service/FetchData';
import { numberFormatter } from '@/lib/formater';
import { BiLogIn } from 'react-icons/bi';
import { useAuth } from '@/context/AuthContext';

export const FloatCard = () => {
  const { isAuthenticated, isChecking } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['HomeAccount'],
    queryFn: getMyAccount,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  let reff_code = data?.data.reff_code;

  useEffect(() => {
    if (reff_code) {
      localStorage.setItem('save_reff_code', reff_code);
    }
  }, [reff_code]);

  if (!isAuthenticated) {
    return (
      <div className="dompet-box gap-3 !justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={150}
            height={150}
            src="/img/icons/dompet/Kantong berbagi.png"
            alt="Kantong Berbagi"
          />
          <div className="w-ful">
            <span className="sm:text-base text-[13px]">
              Login untuk info akun.
            </span>
            <p className="m-0">Rp ******</p>
          </div>
        </div>
        <a
          id="btn-topup"
          href="/login"
          className="bg-green rounded-lg text-white py-[10px] flex justify-center items-center gap-2 w-fit px-4 md:py-[12px] md:font-medium md:text-lg"
        >
          <BiLogIn className="text-2xl " />
          <span>Login</span>
        </a>
      </div>
    );
  }

  if (isChecking & isLoading)
    return (
      <div className="dompet-box gap-3 !justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={150}
            height={150}
            src="/img/icons/dompet/Kantong berbagi.png"
            alt="Kantong Berbagi"
          />
          <div className="w-ful">
            <span className="sm:text-base text-[13px]">
              Loading akun anda...
            </span>
            <p className="m-0">Rp ******</p>
          </div>
        </div>
        <a
          id="btn-topup"
          href="/login"
          className="bg-green rounded-lg text-white py-[10px] flex justify-center items-center gap-2 w-fit px-4 md:py-[12px] md:font-medium md:text-lg"
        >
          <BiLogIn className="text-2xl " />
          <span>Login</span>
        </a>
      </div>
    );

  if (error) {
    console.error('Error fetching account data:', error);
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="dompet-box gap-3 !justify-between">
      <div className="flex items-center gap-3">
        <Image
          width={150}
          height={150}
          src="/img/icons/dompet/Kantong berbagi.png"
          alt="Kantong Berbagi"
        />
        <div className="w-ful">
          <span className="sm:text-base text-[13px]">Saldo anda</span>
          <p className="m-0 font-semibold">
            Rp{' '}
            {numberFormatter(data?.data?.dompet_kebaikan?.saldo || 0) ??
              '******'}
          </p>
        </div>
      </div>
      <a
        id="btn-topup"
        href="/wallet"
        className="bg-green rounded-lg text-white py-[10px] flex justify-center items-center gap-2 w-fit px-4 md:py-[12px] md:font-medium md:text-lg"
      >
        <FaPlusCircle className="text-2xl " />
        <span>Isi Saldo</span>
      </a>
    </div>
  );
};
