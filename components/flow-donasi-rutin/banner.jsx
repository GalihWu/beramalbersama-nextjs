'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/button';

export default function BannerDonasiRutin({ authToken, isTokenValid }) {
  return (
    <>
      <div className="relative banner-tosca-gradient max-w-[640px] mx-auto h-[250px] px-[15px] py-[30px] lg:px-[20px]">
        <Image
          alt=""
          src="/img/banner/person.webp"
          height={300}
          width={300}
          className="absolute bottom-0 right-[15px]  lg:w-[233px]  w-[143px]"
          // className="absolute bottom-0 right-[15px] lg:h-[228px] lg:w-[243px] h-[128px] w-[143px]"
        />
        <div className="block lg:w-8/12 w-10/12">
          <h2 className="text-[16px] mt-0 text-dark text-semibold">
            Mau Donasi setiap hari tanpa putus?
          </h2>
          <p className="my-[10px] text-[12px] text-dark leading-[16px]">
            Daftarkan diri dalam program “Donasi Rutin”, pilih program lalu atur
            nominal dan jadwal donasi. Dipotong otomatis dari Saku Berbagimu.
          </p>
          <Link href="/donasi-rutin/tujuan">
            {!(authToken && isTokenValid) ? (
              <></>
            ) : (
              <Button variant="orange-gradient" className="mt-[8px]">
                Mulai Donasi Rutin
              </Button>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
