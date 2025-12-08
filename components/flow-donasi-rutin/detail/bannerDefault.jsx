import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DONASI_OPTIONS = {
  dipilihkan: {
    image: '/img/icons/menu/6. Donasi rutin.png',
    title: 'Program Donasi Rutin Dipilihkan',
    description: 'Donasi rutin ke program yang dipilihkan AksiBerbagi',
  },
  subuh: {
    image: '/img/icons/menu/6. Donasi rutin.png',
    title: 'Donasi Tiap Subuh',
    description: 'Awali hari anda dengan keberkahan donasi rutin tiap Subuh',
  },
  jumat: {
    image: '/img/icons/menu/6. Donasi rutin.png',
    title: 'Donasi Tiap Jum`at',
    description: 'Jangan sampai ketinggalan keberkahan donasi di hari terbaik',
  },
};

const DonasiRutinBannerDefault = ({ type }) => {
  const router = useRouter();
  const [donasi, setDonasi] = useState({
    image: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    if (DONASI_OPTIONS[type]) {
      setDonasi(DONASI_OPTIONS[type]);
    } else {
      router.push('/404');
    }
  }, [type, router]);

  return (
    <div className="flex items-center justify-start mb-8 shadow-sm py-3 border border-gray rounded px-3">
      <div className="min-w-14 overflow-hidden">
        <Image
          src={donasi.image}
          alt={donasi.title}
          height={500}
          width={500}
          className="w-14 h-14 object-contain"
        />
      </div>
      <div className="ml-3">
        <h3 className="text-sm sm:text-base leading-[16px] font-bold">
          {donasi.title}
        </h3>
        <p className="text-xs sm:text-sm leading-[16px] text-[#4D4D4D] mt-1">
          {donasi.description}
        </p>
      </div>
    </div>
  );
};

export default DonasiRutinBannerDefault;
