import Image from 'next/image';
import React, { useState } from 'react';
import { currencyFormatter } from '@/lib/formater';
import {
  FaCaretRight,
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaWhatsapp,
} from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';
import { GrMoney } from 'react-icons/gr';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import Link from 'next/link';
import { IoMdTime } from 'react-icons/io';

export const ProfilDonasi = ({ programLink, projekSalur, salur }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="donate-detail-header mb-4">
        <div className="donate-profile !pb-0">
          {/* dampak kebaikan */}
          {salur && (
            <Link
              href={`/donasi/detail/${programLink}/report`}
              className="flex justify-between items-center underline mb-2"
            >
              <div className="text-base font-semibold md:text-lg">
                Lihat Cerita Dampak Kebaikanmu
              </div>
              <div className=" text-gray-500 cursor-pointer text-sm md:text-base flex items-center gap-1">
                <span className="hidden md:block">Lihat Selengkapnya </span>
                <FaChevronRight />
              </div>
            </Link>
          )}

          <div className="donate-profile-box !mb-0 bg-secondary-500 !rounded-t-lg !rounded-b-none !hidden">
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
              <div className="flex w-full gap-2 flex-col min-w-[180px] items-start md:items-center">
                <div className="bg-cyan-100 px-4 flex gap-2 py-2 rounded-md text-base md:text-lg font-bold text-cyan-900 w-fit">
                  <VscWorkspaceTrusted size={20} />
                  100%
                </div>
                <p className="text-white font-semibold text-base md:text-lg">
                  Garansi Penyaluran
                </p>
              </div>
              <div className="flex gap-1 flex-col text-white">
                <div classname="text-sm md:text-base">
                  Semua donatur akan mendapat informasi penyaluran 10 hari
                  setelah donasi.
                </div>
                <div className="flex items-center text-white gap-2 text-base md:text-lg font-medium">
                  <FaWhatsapp size={18} />
                  +62 8191-2344-745
                </div>
                <div className="text-sm md:text-base">
                  {' '}
                  Senin - Jumat, 08.00 sd 16.00 WIB
                </div>
              </div>
            </div>
          </div>

          <div
            className={`text-14 cursor-pointer flex justify-between items-center border border-gray-500 rounded-b-lg px-3 max-h-[42px] bg-cyan-100 text-secondary-500`}
            onClick={toggleDropdown}
          >
            <h5 className={`text-strong my-3 md:my-1 mr-2 text-primary-500`}>
              LEGALITAS{' '}
              <span className="text-gray-500">( klik selengkapnya )</span>
            </h5>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
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
      {projekSalur?.filter((salur) => salur.activity !== 'selesai').length >
        0 && (
        <div className="donate-detail-header mb-4">
          <div className="w-full rounded-lg  border border-gray-500 p-4 flex flex-col justify-between gap-3">
            {projekSalur
              .filter((salur) => salur.activity !== 'selesai')
              .map((salur, index) => (
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
                        <span className="float-right text-base text-green flex gap-1 items-center">
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
                        <p className="m-0 line-clamp-2 w-[90%] ">
                          {salur.title}
                        </p>
                      </div>
                      <div className="flex items-center w-full gap-1">
                        <IoMdTime
                          size={20}
                          color="#19B697"
                          // className="w-[20%]"
                        />
                        <p className="m-0 line-clamp-2 w-[90%] ">
                          {/* {dateFormatter(salur.execution_time, 'long')} */}
                          Proses Penggalangan -{' '}
                          {salur.location.split(',')[1]?.trim()}
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
