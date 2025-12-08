import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const KategoriDonasi = () => {
  const categories = [
    // {
    //   href: 'https://qurban.aksiberbagi.com/',
    //   src: '/img/icons/menu/7. Qurban.webp',
    //   alt: 'Donasi Qurban Icon',
    //   label: 'Qurban',
    //   id: 'btn-qurban',
    // },
    {
      href: '/donasi',
      src: '/img/icons/menu/1. Donasi.webp',
      alt: 'Donasi Icon',
      label: 'Donasi',
      id: 'btn-donasi',
    },
    {
      href: '/infaq',
      src: '/img/icons/menu/2. Infaq.webp',
      alt: 'Infaq Icon',
      label: 'Infaq',
      id: 'btn-infaq',
    },
    {
      href: '/hitung-zakat',
      src: '/img/icons/menu/3. Zakat.webp',
      alt: 'Zakat Icon',
      label: 'Zakat',
      id: 'btn-zakat',
    },
    // {
    //   href: '/panenpahala',
    //   src: '/img/icons/menu/4. Ramadhan.webp',
    //   alt: 'Donasi ramadhan Icon',
    //   label: 'Ramadhan',
    //   id: 'btn-ramadhan',
    // },

    {
      href: '/donasi-rutin',
      src: '/img/icons/menu/6. Donasi rutin.webp',
      alt: 'Donasi Rutin Icon',
      label: 'Rutin',
      id: 'btn-rutin',
    },
  ];

  return (
    <div className="homepage-xs-main-content pb-1">
      <div className="grid grid-cols-4 pt-[4rem] pb-[2rem]">
        {categories.map((category, index) => (
          <Link
            id={category.id}
            className="text-center flex flex-col justify-center items-center"
            href={category.href}
            key={index}
          >
            <Image
              width={50}
              height={50}
              alt={category.alt}
              className="rounded-image mt-4 sm:w-[50px] md:w-[60px]"
              src={category.src}
            />
            <div className="text-gray-600 mt-1">{category.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
