'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlusCircle } from 'react-icons/fa';

import { useQuery } from '@tanstack/react-query';
import { getMyAccount, getIsTokenValid } from '@/service/FetchData';
import { numberFormatter } from '@/lib/formater';

import Cookies from 'js-cookie';

export const FloatCard = () => {
  const [authToken, setAuthToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  // Check for authToken and validate it
  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    setAuthToken(token);

    if (token) {
      // Validate the token
      const validateToken = async () => {
        try {
          await getIsTokenValid();
          setIsTokenValid(true);
        } catch {
          setIsTokenValid(false);
        } finally {
          setIsCheckingToken(false);
        }
      };

      validateToken();
    } else {
      setIsCheckingToken(false); // No token found
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['HomeAccount'],
    queryFn: getMyAccount,
    enabled: isTokenValid, // Only fetch if the token is valid
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  console.log(data?.data);

  let reff_code = data?.data.reff_code;

  useEffect(() => {
    if (reff_code) {
      localStorage.setItem('save_reff_code', reff_code);
    }
  }, [reff_code]);

  if (isCheckingToken) {
    return <></>;
  }

  if (!authToken) {
    return (
      // <div className="homepage-banner-one">
      //   <div className="container position-relative">
      //     <p>Please log in to view your account information.</p>
      //   </div>
      // </div>
      <div className="dompet-box gap-3" style={{ justifyContent: 'start' }}>
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
        <a
          id="btn-login-dashboard"
          href="/login"
          className="bg-green rounded-lg ml-auto text-white py-[10px] flex justify-center items-center gap-3 md:w-1/4 w-1/5 md:py-[15px] md:font-medium md:text-xl"
        >
          Login
        </a>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      // <div className="homepage-banner-one">
      //   <div className="container position-relative">
      //     <p>Your session has expired. Please log in again.</p>
      //   </div>
      // </div>
      <div className="dompet-box gap-3" style={{ justifyContent: 'start' }}>
        <Image
          width={150}
          height={150}
          src="/img/icons/dompet/Kantong berbagi.png"
          alt="Kantong Berbagi"
        />
        <div className="w-ful">
          <span className="sm:text-base text-[13px]">
            Sesi sudah habis, Login lagi
          </span>
          <p className="m-0">Rp ******</p>
        </div>
        <a
          id="btn-login-dashboard"
          href="/login"
          className="bg-green rounded-lg ml-auto text-white py-[10px] flex justify-center items-center gap-3 md:w-1/4 w-1/5 md:py-[15px] md:font-medium md:text-xl"
        >
          Login
        </a>
      </div>
    );
  }

  if (isLoading) return <></>;

  if (error) {
    console.error('Error fetching account data:', error);
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="dompet-box gap-3 bg-white mt-9">
      <Image
        width={150}
        height={150}
        src="/img/icons/dompet/Kantong berbagi.png"
        alt="Kantong Berbagi"
      />
      <div className="dompet-text">
        <span className="label">Saldo Saku Berbagi</span>
        <p className="m-0">
          Rp{' '}
          {numberFormatter(data?.data?.dompet_kebaikan?.saldo || 0) ?? '******'}
        </p>
      </div>
      <a
        id="btn-topup"
        href="/wallet"
        className="bg-green rounded-lg text-white py-[10px] flex justify-center items-center gap-3 md:w-1/3 w-2/5 md:py-[15px] md:font-medium md:text-xl"
      >
        <FaPlusCircle className="text-2xl" />
        Isi Saldo
      </a>
    </div>
  );
};
