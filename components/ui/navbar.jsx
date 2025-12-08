import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export const Navbar = ({ activeItem }) => {
  const navItems = [
    {
      href: '/',
      imgSrc: '/img/icons/navbar/1. Beranda I.png',
      imgActiveSrc: '/img/icons/navbar/1. Beranda II.png',
      alt: 'beranda',
      text: 'Beranda',
    },

    {
      href: '/donasi',
      imgSrc: '/img/icons/navbar/2. Program I.png',
      imgActiveSrc: '/img/icons/navbar/2. Program II.png',
      alt: 'donasi',
      text: 'Donasi',
    },
    {
      href: '/infaq',
      imgSrc: '/img/icons/navbar/1. Pembayaran I.png',
      imgActiveSrc: '/img/icons/navbar/1. Pembayaran.png',
      alt: 'infaq',
      text: 'Infaq',
      isCenter: true,
    },
    {
      href: '/donasi-rutin',
      imgSrc: '/img/icons/navbar/4. Donasi rutin I.png',
      imgActiveSrc: '/img/icons/navbar/4. Donasi rutin II.png',
      alt: 'donasi rutin',
      text: 'Donasi Rutin',
    },
    {
      href: '/user',
      imgSrc: '/img/icons/navbar/3. Donasi saya I.png',
      imgActiveSrc: '/img/icons/navbar/3. Donasi saya II.png',
      alt: 'user',
      text: 'User',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 max-w-[640px] mx-auto">
      <div className="flex items-end justify-around px-2 py-3 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.href;
          const isCenter = item.isCenter;

          if (isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`
                    flex flex-col items-center justify-center
                    w-16 h-16 -mt-8 rounded-full shadow-xl
                    transition-all duration-300 transform
                    ${
                      isActive
                        ? 'bg-gradient-to-br from-primary-500 to-teal-600 scale-110'
                        : 'bg-gradient-to-br from-primary-400 to-teal-500 hover:scale-105'
                    }
                  `}
                >
                  <Image
                    src={isActive ? item.imgActiveSrc : item.imgSrc}
                    alt={item.alt}
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </div>
                <span
                  className={`
                    text-xs mt-1 font-medium transition-colors duration-200
                    ${isActive ? 'text-primary-600' : 'text-gray-600'}
                  `}
                >
                  {item.text}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center
                min-w-[60px] py-2 px-3 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-primary-500 hover:bg-primary-50'
                }
              `}
            >
              <div className="relative mb-1">
                <Image
                  src={isActive ? item.imgActiveSrc : item.imgSrc}
                  alt={item.alt}
                  width={20}
                  height={20}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                {/* {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
                )} */}
              </div>
              <span
                className={`
                  text-xs font-medium transition-all duration-200
                  ${isActive ? 'text-primary-600' : 'text-gray-600'}
                `}
              >
                {item.text}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
