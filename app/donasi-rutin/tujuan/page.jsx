import React from 'react';
import Image from 'next/image';
import { PiCaretRight } from 'react-icons/pi';
import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import Link from 'next/link';

const DonationItem = ({ href, title, description, image }) => (
  <Link
    href={href}
    className="flex items-center justify-between card-transition-row border-b border-solid border-[#828690] py-[12px]"
  >
    <div className="w-11/12 flex justify-start items-center">
      <div className="aspect-square min-w-[50px]">
        <Image
          src={image}
          alt=""
          height={500}
          width={500}
          className="w-14 h-14 object-contain"
        />
      </div>
      <div className="block ml-[12px]">
        <h3 className="text-[12px] sm:text-[14px] leading-[16px] font-semibold sm:font-bold m-0">
          {title}
        </h3>
        <p className="text-[10px] sm:text-[12px] leading-[16px] text-[#4D4D4D] mt-[6px] sm:mt-[8px] mb-0">
          {description}
        </p>
      </div>
    </div>
    <div className="w-1/12 flex justify-end">
      <PiCaretRight size={20} className="text-dark" />
    </div>
  </Link>
);

export default function DonasiRutinTujuan() {
  return (
    <>
      <Header type="title" text="Pilih Tujuan Donasi Rutin" />
      <div className="content-wrapper bg-grey">
        <div className="block w-full bg-white p-[20px] max-w-[640px] mx-auto">
          <DonationItem
            image="/img/icons/rutin/RutinDipilihkan.png"
            href="/donasi-rutin/dipilihkan"
            title="Pilih Tujuan Donasi Rutin"
            description="Donasi rutin ke program yang dipilihkan Aksi Berbagi"
          />
          <DonationItem
            image="/img/icons/rutin/PilihSendiri.png"
            href="/donasi-rutin/program"
            title="Pilih Program Sendiri"
            description="Cari program kebaikan yang akan ditambahkan ke dalam donasi rutin"
          />
        </div>
        <div className="block w-full bg-white p-[20px] border-t-[10px] border-solid border-[#f7f7f7] max-w-[640px] mx-auto">
          <h2 className="text-[16px] font-extrabold !mb-[16px] mt-0">
            Donasi Rutin ke kategori pilihan
          </h2>
          <DonationItem
            image="/img/icons/rutin/Subuh.png"
            href="/donasi-rutin/subuh"
            title="Donasi Tiap Subuh"
            description="Awali hari anda dengan dengan keberkahan donasi rutin tiap Subuh"
          />
          <DonationItem
            image="/img/icons/rutin/Jumat.png"
            href="/donasi-rutin/jumat"
            title="Donasi Tiap Jum`at"
            description="Jangan sampai ketinggalan keberkahan donasi di hari terbaik"
          />
        </div>
      </div>
      <Navbar activeItem={'/donasi-rutin'} />
    </>
  );
}
