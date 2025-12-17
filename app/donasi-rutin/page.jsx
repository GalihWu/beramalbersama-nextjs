'use client';

import React from 'react';
import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import ListDonasiRutin from './list';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FaHeart, FaCalendarAlt, FaWallet, FaArrowRight } from 'react-icons/fa';

export default function DonasiRutinPage() {
  const { isAuthenticated, isChecking } = useAuth();

  return (
    <>
      <Header />
      <div className="content-wrapper bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* HERO BANNER - Enhanced Design */}
        <div className="relative max-w-[640px] mx-auto overflow-hidden">
          {/* Gradient Background with Pattern */}
          <div className="relative bg-gradient-to-tr from-primary-200 to-primary-300 h-auto px-[20px] py-[35px] lg:px-[25px] overflow-hidden">
            {/* Content */}
            <div className="relative z-10 lg:w-8/12 w-11/12 animate-in fade-in slide-in-from-left-4 duration-500">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 shadow-sm">
                <FaHeart className="text-rose-500 w-3 h-3" />
                <span className="text-[10px] font-semibold text-gray-700">
                  PROGRAM BERKAH
                </span>
              </div>

              {/* Title */}
              <h2 className="text-[18px] lg:text-[20px] font-bold text-dark leading-tight mb-2">
                Berbagi Kebaikan
                <br />
                <span className="text-primary-600">
                  Setiap Hari, Tanpa Putus
                </span>
              </h2>

              {/* Description */}
              <p className="text-[13px] lg:text-[14px] text-dark/80 leading-relaxed mb-4 font-medium">
                Wujudkan pahala yang mengalir terus menerus dengan donasi rutin
                otomatis dari Saku Berbagimu
              </p>

              {/* CTA Button */}
              {isAuthenticated && (
                <Link
                  href="/donasi-rutin/tujuan"
                  className="button-glow !bg-secondary-700"
                >
                  <span>Mulai Donasi Rutin</span>
                  <FaArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          {/* Feature Cards - Below Banner */}
          <div className="px-[20px] -mt-6 relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                {/* Feature 1 */}
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    <FaCalendarAlt className="text-blue-600 w-5 h-5" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-gray-700 leading-tight">
                    Atur Jadwal
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    Fleksibel
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    <FaWallet className="text-green-600 w-5 h-5" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-gray-700 leading-tight">
                    Auto Debit
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    Mudah
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    <FaHeart className="text-rose-600 w-5 h-5" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-gray-700 leading-tight">
                    Pahala Rutin
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    Berkah
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <ListDonasiRutin
            isAuthenticated={isAuthenticated}
            isCheckingToken={isChecking}
          />
        </div>
      </div>
      <Navbar activeItem={'/donasi-rutin'} />
    </>
  );
}
