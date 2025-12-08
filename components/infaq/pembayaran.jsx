'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getQrCodeInfaq } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import { FormInfaq } from '@/components/infaq/FormInfaq';
import { Donatur } from '@/components/infaq/Donatur';

export const Pembayaran = () => {
  const [activeMenu, setActiveMenu] = useState('iOnline');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const { data, error } = useQuery({
    queryKey: ['infaq'],
    queryFn: getQrCodeInfaq,
  });

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container animate-fade-in">
      <div className="pb-0">
        <div className="infaq-top">
          {/* Tab Menu */}
          <div className="grid grid-cols-3 border-b border-gray-300 mb-6">
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 ease-in-out ${
                activeMenu === 'iOnline'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-primary-500'
              }`}
              onClick={() => handleMenuClick('iOnline')}
            >
              Infaq Online
            </button>
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 ease-in-out ${
                activeMenu === 'Qr'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-primary-500'
              }`}
              onClick={() => handleMenuClick('Qr')}
            >
              QR Code
            </button>
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 ease-in-out ${
                activeMenu === 'Donatur'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-primary-500'
              }`}
              onClick={() => handleMenuClick('Donatur')}
            >
              Donatur
            </button>
          </div>

          {/* Content Area */}
          <div
            className={`content-infaq animate-fade-in ${
              activeMenu === 'iOnline' ? '' : 'hidden'
            }`}
            id="iOnlineTab"
          >
            <FormInfaq />
          </div>

          {/* infaq code */}
          <div
            className={`content-infaq animate-fade-in ${
              activeMenu === 'Qr' ? '' : 'hidden'
            }`}
            id="iQrTab"
          >
            <Image
              width={500}
              height={500}
              className="infaq-qr-image"
              // src="/img/qr-code.png"
              src={data?.data?.image_url}
              alt={data?.data?.name}
            />
          </div>

          {/* Donatur */}
          <div
            className={`content-infaq animate-fade-in ${
              activeMenu === 'Donatur' ? '' : 'hidden'
            }`}
            id="iDonaturTab"
          >
            <Donatur />
          </div>
        </div>
      </div>
    </div>
  );
};
