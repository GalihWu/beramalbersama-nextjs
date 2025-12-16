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
      <div className="flex items-center justify-around max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[60px] transition-all duration-300 px-2 py-4 w-full ${
                isActive
                  ? 'border-t-[3px] border-primary-500 bg-gradient-to-b from-primary-100/70 via-primary-50 to-transparent'
                  : ''
              }`}
            >
              <div
                className={`mb-1.5 transition-all duration-300 ${
                  isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-90'
                }`}
              >
                <Image
                  src={isActive ? item.imgActiveSrc : item.imgSrc}
                  alt={item.alt}
                  width={24}
                  height={24}
                  className="transition-all duration-300"
                />
              </div>

              <span
                className={`
                  text-xs font-normal transition-all duration-300
                  ${
                    isActive
                      ? 'text-primary-500 translate-y-[-1px] opacity-100'
                      : 'text-gray-500 opacity-80'
                  }
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
