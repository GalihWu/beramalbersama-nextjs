import Image from 'next/image';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { numberFormatter } from '@/lib/formater';

export const Wallet = ({ wallet }) => {
  return (
    <div className="w-full sm:w-[90%] sm:border-none border rounded-lg flex items-center justify-between text-green gap-3 shadow-md px-3 py-2">
      <div className="flex gap-4">
        <Image
          width={150}
          height={150}
          src="/img/icons/dompet/Kantong berbagi.png"
          alt="Kantong Berbagi"
          className="w-12 h-12"
        />
        <div className="dompet-text">
          <p className="text-[10px]">
            Rp {numberFormatter(wallet || 0) ?? '******'}
          </p>
        </div>
      </div>
      <a
        href="/wallet"
        className="gap-2 bg-green rounded-lg text-white py-[8px] sm:py-[5px] px-2 flex justify-center items-center"
      >
        <FaPlusCircle className="text-2xl" />
        <span className="inline-block md:hidden">Isi saldo</span>
      </a>
    </div>
  );
};
