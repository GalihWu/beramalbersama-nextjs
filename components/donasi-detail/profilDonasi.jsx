import Image from 'next/image';
import React, { useState } from 'react';
import { currencyFormatter, dateFormatter } from '@/lib/formater';
import { FaCaretRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';
import { GrMoney, GrStatusUnknown } from 'react-icons/gr';
import Link from 'next/link';

export const ProfilDonasi = ({ programLink, detailMitra, projekSalur }) => {
  // console.log(projekSalur);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // console.log(projekSalur);

  return (
    <>
      <div className="donate-detail-header mb-4">
        <div className={`donate-profile !pb-0`}>
          <h4>Informasi Penggalangan Dana</h4>
          <div className="donate-profile-box !mb-0">
            <div className="w-full">
              <h5>Penggalang Dana</h5>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="flex w-full">
                <Image
                  // src={'/img/icons/donatur.webp'}
                  src={detailMitra?.image}
                  loading="lazy"
                  alt="mitra"
                  width={300}
                  height={300}
                  className="image"
                />
                <a href="#" className="desc">
                  <h6 className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      {detailMitra?.name}
                      <Image
                        width={36}
                        height={36}
                        src="/img/icons/verif/Verifikasi II.png"
                        className="ml-0 h-4 w-auto"
                        alt="verified"
                      />
                    </div>
                    <p>Identifikasi Terverifikasi</p>
                  </h6>
                  <p>{detailMitra?.location}</p>
                </a>
              </div>
              <div
                className={`text-14 cursor-pointer flex justify-between items-center border border-gray-500 rounded-md px-3 max-h-[42px] ${
                  isOpen ? '' : 'bg-primary-100 text-primary-500'
                }`}
                onClick={toggleDropdown}
              >
                <h5
                  className={`text-strong my-2 md:my-0 mr-2 ${
                    isOpen ? '' : 'text-primary-500'
                  }`}
                >
                  Legalitas
                </h5>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {/* <div className="group-profile">
            <p>
              Penggalangan ini bagian dari &nbsp;
              <a style={{ color: "#29a399" }}>Rumah Singgah by Grup sosial</a>
            </p>
          </div> */}
          </div>
          <div className="bg-white my-3">
            <div
              className={`about-detail flex flex-col px-4 pb-0 border border-gray-500 dropdown-content ${
                isOpen ? 'open' : '!h-0'
              }`}
            >
              <div className="p-0 mb-2 w-100">
                <p className="text-strong">Akta Notaris : </p>
                <p>Nama: Yayasan Aksi Berbagi</p>
                <p>Nomor: 771</p>
                <p>Tanggal: 29 Juni 2020</p>
                <p>Nama Notaris: Fera Puspitasari, S.H., M.Kn</p>
              </div>
              <div className="item-about p-0 mb-2 w-100">
                <p className="text-strong">Nomor Induk Berusaha (NIB):</p>
                <p>1309230047886</p>
              </div>
              <div className="item-about p-0 mb-2 w-100">
                <p className="text-strong">Izin PUB</p>
                <p>934/HUK-PS/2021</p>
              </div>
              <div className="item-about p-0 mb-2 w-100">
                <p className="text-strong">Izin DINSOS Kota Surakarta : </p>
                <p>460/2306/ORSOS/2021</p>
              </div>
              <div className="item-about p-0 mb-2 w-100">
                <p className="text-strong">
                  Pengesahan Menteri Kehakiman & HAM:
                </p>
                <p>AHU-0031116.AH.01.12.Tahun 2021 Tanggal 29 September 2021</p>
              </div>
              <div className="item-about w-100 p-0">
                <p className="text-strong">Alamat</p>
                <div className="font-semibold">Kantor Yayasan : </div>
                <p className="mt-0">
                  Jl. Tentara Pelajar No 39, RT 005 RW 027, Guwosari, Kel
                  Jebres, Kec Jebres, Kota Surakarta. 57126
                </p>
                <div className="font-semibold mt-2">
                  Kantor Aksiberbagi.com :{' '}
                </div>
                <p className="mt-0">
                  Jl. Tirtosumirat II No 4, Kampung Bumi, Kec Laweyan, Kota
                  Surakarta. 57149
                </p>
              </div>
              <div className="about-detail">
                <h4 className="text-lg md:text-xl text-strong mt-3">
                  Terima kasih #SahabatBerbagi
                  <br />
                  Telah Menjadi Salah Satu Orang Baik Hari Ini
                </h4>
                <p>
                  Terima kasih karena sudah berbagi kebaikan hari ini melalui{' '}
                  <strong>Askiberbagi.com</strong>. Banyak orang yang akan
                  merasakan kebaikan dari donasi yang kamu bagikan. Terima kasih
                  telah menjadi bagian dari #SahabatBerbagi.
                </p>
                <p>
                  {' '}
                  Kamu telah menjadi bagian dari sekian banyak sahabat berbagi
                  hari ini melalui <strong>Askiberbagi.com</strong>. Jangan lupa
                  berbuat baik lagi esok hari.
                </p>
                <div className="flex mt-4">
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
          </div>
        </div>
      </div>

      {/* Rencana salur */}
      {projekSalur?.length > 0 && (
        <div className="donate-detail-header mb-4">
          <div className="w-full rounded-lg  border border-gray-500 p-4 flex flex-col justify-between gap-3">
            {projekSalur.map((salur, index) => (
              <div className="" key={salur.id}>
                {index === 0 && (
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-lg mb-2">
                      Rencana Salur Terdekat
                    </div>
                    <Link
                      href={`/donasi/detail/${programLink}/salur`}
                      className="button-link"
                      id="salur-selengkapnya"
                    >
                      <span className="float-right text-base md:text-lg text-green flex gap-1 items-center">
                        Selengkapnya <FaCaretRight />
                      </span>
                    </Link>
                  </div>
                )}
                {/* <div className="font-semibold text-lg mb-2">
                  Projek Ke - {salur.project_number}
                </div> */}
                <div className="flex-col md:flex-row flex gap-4 justify-center md:justify-start mb-4">
                  {salur.image && (
                    <Image
                      src={salur.image}
                      loading="lazy"
                      alt=""
                      width={300}
                      height={300}
                      className="w-[55%] h-auto md:w-[36%] md:h-[22%] object-cover rounded-md"
                    />
                  )}

                  <div className="flex flex-col gap-[10px] md:gap-3 lg:gap-3">
                    <div className="flex items-center w-full gap-1">
                      <BiDonateHeart
                        size={24}
                        color="#19B697"
                        // className="w-[20%]"
                      />
                      <p className="m-0 line-clamp-2 w-[90%] ">{salur.title}</p>
                    </div>
                    <div className="flex items-center w-full gap-1">
                      <GrStatusUnknown
                        size={20}
                        color="#19B697"
                        // className="w-[20%]"
                      />
                      <p className="m-0 line-clamp-2 w-[90%] ">
                        {dateFormatter(salur.execution_time, 'long')}
                      </p>
                    </div>
                    <div className="flex items-center w-full gap-1">
                      <GrMoney
                        size={20}
                        color="#19B697"
                        // className="w-[20%]"
                      />
                      <p className="m-0 line-clamp-2 w-[90%] ">
                        {currencyFormatter(salur.nominal_target)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
