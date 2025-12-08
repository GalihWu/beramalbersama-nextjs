'use client';
import React from 'react';

// import { FaCopy } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import mitra from '/public/img/banner/mitra.webp';

import { Navbar } from '@/components/ui/navbar';
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/service/FetchData';
import { dateFormatter } from '@/lib/formater';
import { PaymentMethod } from './PaymentMethod';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';

const Tentang = () => {
  // getSettings

  const { data, isLoading, error } = useQuery({
    queryKey: ['getSettings'],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
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
            <p>Tentang</p>
            <h1>{settings.company_name}</h1>
          </div>
        </div>
        <div className="container">
          <div className="box-content relative-top">
            <div className="content-body">
              <div className="sub-about">
                Kamu bisa membuat orang lain bahagia sekarang juga
              </div>
              <p className="text-24 text-strong">
                Bersama &nbsp;
                <span className="text-green">{settings.company_name}</span>
              </p>
              <p className="text-24 text-strong">
                Berbagi Kebaikan Setiap Hari Lebih Mudah
              </p>
              <Image
                alt="banner tentang"
                src="/img/banner/Tentang-Aksiberbagi.webp"
                width={500}
                height={500}
                className="w-full rounded"
              />
              <div className="about-detail">
                <p>
                  <strong>{settings.company_name}</strong> adalah platform
                  donasi online yang berkomitmen untuk memudahkan setiap
                  individu berkontribusi dalam menciptakan perubahan positif
                  bagi sesama. Dengan semangat berbagi dan kepedulian yang
                  tinggi, kami menghubungkan para donatur dengan berbagai proyek
                  sosial yang membutuhkan bantuan.
                </p>
                {/* <p>
                  <strong>{settings.company_name}</strong> berkomitmen terus
                  menjadi sarana yang transparan, mudah dan tepat. Menyalurkan
                  donasi secara tepat diterima oleh para pihak yang membutuhkan.
                </p> */}
                <Link href="/donasi" className="btn button-cyan">
                  Temukan Program Kebaikan
                </Link>
              </div>
            </div>
            <div className="content-body border-top">
              <p className="text-18 text-strong">
                Terpercaya untuk menyalurkan donasimu
              </p>
              <div className="about-detail">
                <p>
                  <strong>{settings.company_name}</strong>berdedikasi untuk
                  menjadi media yang menjamin setiap donasimu akan diterima oleh
                  orang-orang yang benar membutuhkan.
                </p>
                <div className="d-flex flex-wrap mt-4">
                  <div className="item-about bg-grey">
                    <Image
                      className="w-auto"
                      width={500}
                      height={500}
                      src="/img/icons/tentang/1. praktis dan cepat.png"
                      alt=""
                    />
                    <p className="text-strong">Praktis dan Cepat</p>
                    <p>
                      Kami terus berinovasi agar kemudahan dan kecepatan donasi
                      semakin mudah dan cepat.
                    </p>
                  </div>
                  <div className="item-about">
                    <Image
                      className="w-auto"
                      width={500}
                      height={500}
                      src="/img/icons/tentang/2. Transparant.png"
                      alt=""
                    />
                    <p className="text-strong">Transparan</p>
                    <p>
                      Donasi yang terhimpun dijamin aman dan transparan untuk
                      tersalurkan ke pihak yang membutuhkan.
                    </p>
                  </div>
                  <div className="item-about">
                    <Image
                      className="w-auto"
                      width={500}
                      height={500}
                      src="/img/icons/tentang/3. Inovasi tanpa henti.png"
                      alt=""
                    />
                    <p className="text-strong">Inovasi tanpa henti</p>
                    <p>
                      Kami berkomitmen untuk terus berinovasi untuk menghadirkan
                      media donasi online yang transparan, mudah dan bermanfaat.
                    </p>
                  </div>
                  <div className="item-about bg-grey">
                    <Image
                      className="w-auto"
                      width={500}
                      height={500}
                      src="/img/icons/tentang/4. Lengkap dan mudah.png"
                      alt=""
                    />
                    <p className="text-strong">Lengkap Dan Mudah</p>
                    <p>
                      Kamu bisa donasi dengan menggunakan berbagai macam metode
                      pembayaran.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-body border-top p-0">
              {/* <div
              className="about-banner"
              style={{
                backgroundImage: 'url(/img/banner/Tentang-Aksiberbagi.jpg)',
              }}
              /> */}

              <div className="about-detail padding-20">
                {/* <p className="text-16 text-strong">
                  Terima kasih telah kepada sahabat berbagi
                </p> */}
                <Image
                  alt="banner tentang"
                  src="/img/banner/ucapanterimakasih.webp"
                  width={500}
                  height={500}
                  className="w-full rounded"
                />
                <h4 className="text-18 text-strong mt-3">
                  Terima kasih #SahabatBerbagi
                  <br />
                  Telah Menjadi Salah Satu Orang Baik Hari Ini
                </h4>
                <p>
                  Terima kasih karena sudah berbagi kebaikan hari ini melalui{' '}
                  <strong>{settings.company_name}</strong>. Banyak orang yang
                  akan merasakan kebaikan dari donasi yang kamu bagikan. Terima
                  kasih telah menjadi bagian dari #SahabatBerbagi.
                </p>
                <p>
                  {' '}
                  Kamu telah menjadi bagian dari sekian banyak sahabat berbagi
                  hari ini melalui <strong>{settings.company_name}</strong>.
                  Jangan lupa berbuat baik lagi esok hari.
                </p>
                <div className="d-flex mt-4">
                  <div className="w-50">
                    <h6>900</h6>
                    <p className="text-thin">Program terdanai</p>
                  </div>
                  <div className="w-50">
                    <h6>136.337</h6>
                    <p className="text-thin">Orang baik bergabung</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-body border-top">
              <p className="text-18 text-strong">Legalitas Akta</p>
              <div className="about-detail d-flex flex-wrap">
                <div className="item-about p-0 mb-2">
                  <p className="text-strong">Nama</p>
                  <p>{settings.company_name}</p>
                </div>
                <div className="item-about p-0 mb-2">
                  <p className="text-strong">Nomor</p>
                  <p>{settings.company_number}</p>
                </div>
                <div className="item-about p-0 mb-2">
                  <p className="text-strong">Tanggal</p>
                  <p>{dateFormatter(settings.company_birthdate, 'long')}</p>
                </div>
                <div className="item-about p-0 mb-2">
                  <p className="text-strong">Nama Notaris</p>
                  <p>{settings.company_notary}</p>
                </div>
                <div className="item-about p-0 mb-2 w-100">
                  <p className="text-strong">Legalitas</p>
                  <p>{settings.company_legality}</p>
                </div>
                <div className="item-about w-100 p-0">
                  <p className="text-strong">Alamat</p>
                  <div className="font-semibold">Kantor Operasional : </div>
                  <p className="mt-0">
                    Gg Waru No 47, Petoran, Kel Jebres, Kec Jebres, Kota
                    Surakarta. 57126
                  </p>
                  <div className="font-semibold mt-2">Kantor Marketing : </div>
                  <p className="mt-0">
                    Jl. Tirtosumirat II No 4, Kampung Bumi, Kec Laweyan, Kota
                    Surakarta. 57149
                  </p>
                  {/* <p>{settings.company_address}</p> */}
                </div>
              </div>
            </div>
            <PaymentMethod />
            <div className="content-body border-top">
              <p className="text-18 text-strong text-center">QRIS Donasi</p>
              <Image
                width={500}
                height={500}
                className="about-qr"
                src="/img/banner/Qr-code-akber-2025.webp"
                alt=""
              />
            </div>
            <div className="content-body border-top">
              <h4 className="text-18 text-strong m-0">
                Mari Bergabung Bersama Kami
              </h4>
              <p>
                <strong>{settings.company_name}</strong> tidak akan bisa
                berjalan tanpa dukungan dari para donatur dan relawan. Mari
                bersama-sama kita wujudkan mimpi untuk menciptakan Indonesia
                yang lebih baik.
              </p>
              <h4 className="text-18 text-strong mb-0 mt-2">Mitra Donasi</h4>
              <p>
                <strong>{settings.company_name}</strong> bekerja sama dengan
                beberapa lembaga, yayasan, dan komunitas sosial masyarakat dalam
                menyalurkan program kebaika ke seluruh Nusantara dan belahan
                dunia lainnya.
              </p>
              <Image
                width={500}
                height={500}
                className="w-full h-auto"
                src={mitra}
                alt=""
              />
            </div>

            <div className="content-body border-top">
              <h4 className="text-18 text-strong m-0">Hubungi Kami</h4>
              <p>
                Untuk Informasi lebih lanjut, silahkan kunjungi &nbsp;
                <a href="/">www.aksiberbagi.com</a>
                &nbsp;
              </p>

              <div className="footer-social-media size-xs flex gap-4 pb-24">
                <Link
                  className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
                  style={{ backgroundColor: '#4eb6ae' }}
                  href="https://www.facebook.com/aksiberbagidotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={20} className="text-white " />
                </Link>
                <Link
                  className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
                  style={{ backgroundColor: '#4eb6ae' }}
                  href="https://www.instagram.com/aksiberbagicom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={20} className="text-white " />
                </Link>
                <Link
                  className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
                  style={{ backgroundColor: '#4eb6ae' }}
                  href="https://www.tiktok.com/@aksiberbagicom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok size={20} className="text-white " />
                </Link>
                <Link
                  className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
                  style={{ backgroundColor: '#4eb6ae' }}
                  href="https://x.com/aksiberbagicom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={20} className="text-white " />
                </Link>
                <Link
                  className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
                  style={{ backgroundColor: '#4eb6ae' }}
                  href="https://www.youtube.com/@AksiberbagiIndonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={20} className="text-white " />
                </Link>
                <Link
                  className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
                  style={{ backgroundColor: '#4eb6ae' }}
                  href="https://api.whatsapp.com/send?phone=6281912344745&text=Assalamu%27alaikum6281312344745"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={20} className="text-white " />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Navbar activeItem={'/'} />
      </div>
    </>
  );
};

export default Tentang;
