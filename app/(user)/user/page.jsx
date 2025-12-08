'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FaArchive,
  FaChevronRight,
  FaEdit,
  FaFile,
  FaInfoCircle,
  FaSignOutAlt,
  FaUser,
  // FaCalendarAlt,
  // FaChartBar,
  // FaChartPie,
  // FaCoins,
  // FaLock,
  // FaMoneyCheck,
  // FaTicketAlt,
} from 'react-icons/fa';
import Image from 'next/image';

import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import { useQuery } from '@tanstack/react-query';
import { getIsTokenValid, getMyAccount } from '@/service/FetchData';
import { logout } from '@/service/PostData';
import { Wallet } from './Wallet';
import Link from 'next/link';
import Skeleton from '@/components/ui/skeleton/skeleton';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { GrTransaction } from 'react-icons/gr';

const User = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('authToken');

      setAuthToken(token);

      if (token) {
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
        setIsCheckingToken(false);
      }
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['myAccount'],
    queryFn: getMyAccount,
    enabled: isTokenValid,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const isLoadingData = useMemo(
    () => isLoading || isCheckingToken,
    [isLoading, isCheckingToken]
  );

  if (error) {
    return (
      <div>An error occurred: {error?.message || 'Something went wrong.'}</div>
    );
  }
  const user = data?.data || {};

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <Header />
      <section className="content-wrapper content-sm animate-fade-in">
        <div className="sc-main sc-event bg-white">
          <div className="container">
            {isLoadingData ? (
              <div className="w-full items-center">
                <div className="tqb-transaction border-0 flex-col gap-4 md:gap-0 flex md:flex-row">
                  <Skeleton className="w-full h-16" />
                  <Skeleton className="w-full h-16 rounded-md sm:w-[70%] sm:border-none border shadow-md px-3 py-2" />
                </div>
              </div>
            ) : authToken && isTokenValid ? (
              <>
                <div className="w-full items-center">
                  <div className="tqb-transaction border-0 flex-col gap-4 md:gap-0 flex md:flex-row">
                    <Link
                      href="/profil"
                      className="transaction-row relative"
                      style={{ width: '100%' }}
                    >
                      <div className="w-16 h-16 rounded-full bg-green ">
                        <Image
                          width={250}
                          height={250}
                          src="/img/profile.png"
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <div className="text-base md:text-lg font-semibold">
                          {user?.name ?? 'Hamba Allah'}
                        </div>
                        <div className="text-subtitle">{user?.phone}</div>
                        <div className="text-subtitle">{user?.email}</div>
                      </div>
                      <FaEdit className="w-5 h-5 text-gray-400 absolute top-2 right-2" />
                    </Link>
                    <Wallet wallet={data?.data?.dompet_kebaikan?.saldo} />
                  </div>
                </div>
                <div className="w-100">
                  <div className="event-menu-row gap-2 flex flex-col">
                    <div className="text-base md:text-lg mb-2 font-semibold">
                      Data Pribadi
                    </div>
                    <a href="/profil" className="event-menu-item">
                      <div className="icon-wrap">
                        <FaUser />
                      </div>
                      <div className="title">Ubah Data Akun</div>
                      <div className="icon-abs">
                        <FaChevronRight />
                      </div>
                    </a>
                    <a href="/donasi-saya" className="event-menu-item">
                      <div className="icon-wrap">
                        <FaArchive />
                      </div>
                      <div className="title">Donasi Saya</div>
                      <div className="icon-abs">
                        <FaChevronRight />
                      </div>
                    </a>
                    <a href="/event-saya" className="event-menu-item">
                      <div className="icon-wrap">
                        <BsFillCalendarEventFill />
                      </div>
                      <div className="title">Event Saya</div>
                      <div className="icon-abs">
                        <FaChevronRight />
                      </div>
                    </a>
                    <a href="/mutasi-saku" className="event-menu-item">
                      <div className="icon-wrap">
                        <GrTransaction />
                      </div>
                      <div className="title">Aktivitas Saku Berbagi Saya</div>
                      <div className="icon-abs">
                        <FaChevronRight />
                      </div>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full py-6">
                <div className="text-lg md:text-xl font-semibold mb-3">
                  Masuk Untuk Mengakses Fitur Lainnya
                </div>
                <button
                  className="w-full rounded-lg border-2 border-primary-500 text-lg md:text-xl text-primary-500 font-bold h-[50px]  hover:text-white hover:bg-primary-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-in-out "
                  onClick={() => router.push('/login')}
                >
                  Masuk Sekarang
                </button>
                <p>
                  Belum punya akun{' '}
                  <span
                    className="text-primary-500 cursor-pointer"
                    onClick={() => router.push('/register')}
                  >
                    Daftar kan diri anda disini
                  </span>
                </p>
              </div>
            )}
            {/* Menu General */}
            <div className="event-menu-row mt-3 gap-2 flex flex-col">
              <div className="text-base md:text-lg mb-2">
                Tentang <span className="font-bold">AksiBerbagi.com</span>
              </div>{' '}
              <Link href="/tentang" className="event-menu-item">
                <div className="icon-wrap">
                  <FaInfoCircle />
                </div>
                <div className="title">Tentang Kami</div>
                <div className="icon-abs">
                  <FaChevronRight />
                </div>
              </Link>
              <a href="/syarat-ketentuan" className="event-menu-item">
                <div className="icon-wrap">
                  <FaFile />
                </div>
                <div className="title">Syarat &amp; Ketentuan</div>
                <div className="icon-abs">
                  <FaChevronRight />
                </div>
              </a>
              {/* Menu Login */}
              {authToken && isTokenValid && (
                <div
                  onClick={handleLogout}
                  className="event-menu-item cursor-pointer text-danger mt-15 !text-red-600"
                >
                  <div className="icon-wrap">
                    <FaSignOutAlt />
                  </div>
                  <div className="title">Keluar</div>
                  <div className="icon-abs">
                    <FaChevronRight />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Navbar activeItem={'/user'} />
    </>
  );
};

export default User;
