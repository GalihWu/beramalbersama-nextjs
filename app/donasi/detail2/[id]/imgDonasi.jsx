import React, { useEffect, useState } from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { capitalizeFirstLetter, currencyFormatter } from '@/lib/formater';

export const ImgDonasi = ({ detailDonasi, handleChange, active }) => {
  const [type, setType] = useState('');

  useEffect(() => {
    setType(capitalizeFirstLetter(detailDonasi?.type));
  }, [detailDonasi?.type]);

  return (
    <div className="homepage-xs-banner bg-white">
      {/* <div className="banner-images "> */}
      {detailDonasi?.image && (
        <Image
          alt={detailDonasi?.title || 'Image'}
          src={detailDonasi?.image}
          placeholder="empty"
          width={800}
          height={800}
          priority
          quality={75}
          className="w-full max-h-[500px]"
        />
      )}
      {/* </div> */}

      {/* bottom */}
      <div className="donate-header-text">
        <div className="donate-header-upper">
          <div className="text-xl font-semibold md:text-2xl mb-3">
            {detailDonasi?.title}
          </div>
          {/* <div className="text-base md:text-lg mb-2 text-gray-500">
            {detailDonasi?.description}
          </div> */}
          <div className="donate-nominal-text flex justify-between">
            <h4 className="flex flex-col gap-2">
              <span>{type} Terkumpul </span>
              {currencyFormatter(detailDonasi?.nominal_achieved || 0)}
              {/* {currencyFormatter(
                detailDonasi?.nominal_achieved - detailDonasi?.nominal_used || 0
              )} */}
              {/* rumus manual saldo donasi */}
            </h4>

            <h4 className="flex flex-col gap-2 text-end">
              <span>Target {type} </span>
              {currencyFormatter(detailDonasi?.nominal_target || 0)}
            </h4>
            {/* <div
              id="lihat-semua"
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleDetail}
            >
              {detail ? (
                <>
                  Tutup <FaCaretUp />
                </>
              ) : (
                <>
                  Lihat Semua <FaCaretDown />
                </>
              )}
            </div> */}
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${detailDonasi?.progress_achieved}%` }}
            aria-valuenow={detailDonasi?.progress_achieved}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="donate-header-nominal">
          <div className="text-left">
            <h5 className="flex gap-2">
              <FaUser />
              {detailDonasi?.total_donors || 0} <span>Donatur</span>
            </h5>
          </div>
          <div className="text-right">
            <h5>
              {detailDonasi?.remaining_days || 0} <span>hari Lagi</span>
            </h5>
          </div>
        </div>

        {/* detail */}
        {/* <div
          className={`donate-header-info ${!detail ? 'd-none' : ''}`}
          id="donateInfoDiv"
        >
          <h4 className="text-green">Informasi Lainnya</h4>
          <div className="flex justify-between">
            <div>
              <div className="info-row">
                <p>Target {type}</p>
                <h4>{currencyFormatter(detailDonasi?.nominal_target || 0)}</h4>
              </div>
              <div className="info-row">
                <p>{type} Terkumpul</p>
                <h4>
                  {currencyFormatter(detailDonasi?.nominal_achieved || 0)}
                </h4>
              </div>
            </div>

            <div>
              <div className="info-row">
                <p>{type} Tersalur</p>
                <h4>{currencyFormatter(detailDonasi?.nominal_used || 0)}</h4>
              </div>
              <div className="info-row">
                <p>Penerima Manfaat</p>
                <h4>{detailDonasi?.total_beneficiery || 0}</h4>
              </div>
            </div>
          </div>
        </div> */}
        {active ? (
          <button
            id="btn-donasi-detail"
            className="btn button-orange w-full !font-medium"
            onClick={() => handleChange(detailDonasi.id, detailDonasi?.link)}
          >
            DONASI SEKARANG
          </button>
        ) : (
          <button
            // id="btn-donasi"
            className="btn button-orange w-100"
            // onClick={() => handleChange(detailDonasi.id, detailDonasi?.link)}
            disabled
          >
            {type} Belum Dibuka
          </button>
        )}
      </div>
    </div>
  );
};
