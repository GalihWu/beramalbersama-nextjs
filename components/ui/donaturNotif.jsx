// components/DonaturNotif.jsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { currencyFormatter } from '@/lib/formater';

export const DonaturNotif = ({ donatur, formatHome }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!donatur?.length) return;

    // mulai hidden
    setVisible(false);

    const interval = setInterval(() => {
      // tampilkan notif baru
      setCurrentIndex((prev) => (prev + 1) % donatur.length);
      setVisible(true);

      // hilang setelah 5 detik
      const hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 3500);

      return () => clearTimeout(hideTimeout);
    }, 7000); // 5 detik hidden + 5 detik visible

    return () => clearInterval(interval);
  }, [donatur]);

  if (!donatur?.length) return null;

  const current = donatur[currentIndex];

  return (
    <div
      className={`flex max-w-[270px] items-center justify-center gap-2 bg-white/80 rounded-md px-3 py-2 z-10 overflow-hidden transition-all duration-700 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
        <Image
          src={'/img/logo.png'}
          alt="notif donatur terbaru"
          width={50}
          height={50}
          className="w-full object-contain"
        />
      </div>
      <div className="text-sm md:text-base w-fit">
        <span className="font-semibold text-primary-500">
          {formatHome ? current.user.name : current.name}
        </span>{' '}
        baru saja berdonasi sebesar{' '}
        <span className="font-semibold text-primary-500">
          {currencyFormatter(
            formatHome ? current.total : current.nominal_donasi
          )}
        </span>
      </div>
    </div>
  );
};
