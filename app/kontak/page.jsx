'use client';

import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import { getSettings } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

const Kontak = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getSettings'],
    queryFn: getSettings,
  });

  if (isLoading) {
    return <div className="homepage-list-xs mt-2"></div>;
  }

  if (error) {
    return (
      <div>An error occurred: {error?.message || 'Something went wrong.'}</div>
    );
  }

  const settings = data?.data ?? [];

  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <div
          className="banner-title"
          style={{ backgroundImage: 'url("/img/waves-cyan.svg")' }}
        >
          <div className="container">
            <h1>KONTAK KAMI</h1>
            <p>Kami Siap Membantu Anda</p>
          </div>
        </div>
        <div className="container">
          <div className="box-content relative-top">
            <div className="content-body">
              <Image
                width={300}
                height={300}
                className="contact-image"
                src="/img/banner/kontak.webp"
                alt="Ilustrasi Kontak Kami"
              />
              <p className="text-20 text-strong text-center mt-5">
                Tetap Terhubung Dengan Kami
              </p>
              <p className="text-center">
                Punya pertanyaan seputar penggalangan dana dan kerja sama dengan{' '}
                <strong>AksiBerbagi</strong>?
              </p>
              <div className="d-flex flex-wrap mt-2 ">
                <div className="item-about p-0 mb-2">
                  <p className="text-center">Nomor WA Marketing</p>
                  <p className="text-18 text-strong text-center">
                    0813 1996 4703
                  </p>
                  <p className="text-center">Nomor WA Donasi</p>
                  <p className="text-18 text-strong text-center">
                    0813 1234 4746
                  </p>
                </div>
                <div className="mx-auto mb-2 ">
                  <p className="text-center">Layanan Program</p>
                  <p className="text-18 text-strong text-center">
                    0822 2059 0552
                  </p>
                </div>
                <div className="item-about w-100 p-0 mt-4">
                  <p className="text-18 text-strong">Yayasan Aksi Berbagi</p>
                  <p>{settings.company_address}</p>
                </div>
              </div>
              <div className="about-map mb-24">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d494.3812158066358!2d110.799882!3d-7.569558!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16faab01dd33%3A0x2146907f4d1cfe49!2sAksi%20Berbagi!5e0!3m2!1sid!2sid!4v1737775338501!5m2!1sid!2sid"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        <Navbar activeItem="/kontak" />
      </div>
    </>
  );
};

export default Kontak;
