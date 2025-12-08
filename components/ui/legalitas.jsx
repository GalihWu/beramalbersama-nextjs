import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const Legalitas = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-white my-3">
      <div
        className={`text-14 cursor-pointer flex justify-between items-center border border-gray-500 rounded-md pt-2 px-3 ${
          isOpen ? '' : 'bg-primary-100 text-primary-500'
        }`}
        onClick={toggleDropdown}
      >
        <p
          className={`text-16 text-strong my-2 ${
            isOpen ? '' : 'text-primary-500'
          }`}
        >
          Legalitas Lembaga
        </p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        className={`about-detail flex flex-col px-4 pb-0 border border-gray-500 dropdown-content ${
          isOpen ? 'open' : ''
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
          <p className="text-strong">Pengesahan Menteri Kehakiman & HAM:</p>
          <p>AHU-0031116.AH.01.12.Tahun 2021 Tanggal 29 September 2021</p>
        </div>
        <div className="item-about w-100 p-0">
          <p className="text-strong">Alamat</p>
          <div className="font-semibold">Kantor Yayasan : </div>
          <p className="mt-0">
            Jl. Tentara Pelajar No 39, RT 005 RW 027, Guwosari, Kel Jebres, Kec
            Jebres, Kota Surakarta. 57126
          </p>
          <div className="font-semibold mt-2">Kantor Aksiberbagi.com : </div>
          <p className="mt-0">
            Jl. Tirtosumirat II No 4, Kampung Bumi, Kec Laweyan, Kota Surakarta.
            57149
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
            <strong>Askiberbagi.com</strong>. Banyak orang yang akan merasakan
            kebaikan dari donasi yang kamu bagikan. Terima kasih telah menjadi
            bagian dari #SahabatBerbagi.
          </p>
          <p>
            {' '}
            Kamu telah menjadi bagian dari sekian banyak sahabat berbagi hari
            ini melalui <strong>Askiberbagi.com</strong>. Jangan lupa berbuat
            baik lagi esok hari.
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
  );
};
