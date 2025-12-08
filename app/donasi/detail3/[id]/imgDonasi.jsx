import React, { useEffect, useState } from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Image from 'next/image';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { capitalizeFirstLetter, currencyFormatter } from '@/lib/formater';

export const ImgDonasi = ({ detailDonasi, handleChange, active }) => {
  const [type, setType] = useState('');
  const [detail, setDetail] = useState(false);

  const handleDetail = () => {
    setDetail((prevDetail) => !prevDetail);
  };

  useEffect(() => {
    setType(capitalizeFirstLetter(detailDonasi?.type));
  }, [detailDonasi?.type]);

  return (
    <div className="homepage-xs-banner bg-white">
      {/* <div className="banner-images "> */}
      <div className="relative">
        <Image
          alt={detailDonasi?.title || 'Image'}
          src={detailDonasi?.image}
          placeholder="empty"
          width={800}
          height={800}
          priority
          quality={75}
          className="w-full max-h-[500px] object-cover"
        />

        {/* Overlay gradasi putih dari bawah ke atas */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0) 60%)',
          }}
        />

        <div className="flex w-full items-center gap-4 absolute bottom-4 left-0 px-4 z-10">
          <div className="w-16 h-16 rounded-full bg-white border border-gray-300 overflow-hidden">
            <Image
              src={detailDonasi?.mitra.image}
              loading="lazy"
              alt="mitra"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h6 className="flex flex-col">
              <div className="flex gap-2 items-center font-medium">
                {detailDonasi?.mitra.name}
                <Image
                  width={36}
                  height={36}
                  src="/img/icons/verif/Verifikasi II.png"
                  className="ml-0 h-4 w-auto"
                  alt="verified"
                />
              </div>
              <p className="text-neutral-500 text-sm">
                Identifikasi Terverifikasi
              </p>
            </h6>
            <p>{detailDonasi?.mitra.location}</p>
          </div>
        </div>
      </div>

      {/* </div> */}

      {/* bottom */}
      <div className="donate-header-text">
        <div className="donate-header-upper">
          <div className="text-xl font-semibold md:text-2xl mb-3">
            {detailDonasi?.title}
          </div>

          <div className="donate-nominal-text flex justify-between">
            <h4 className="flex flex-col gap-2">
              <span>Saldo {type} </span>
              {currencyFormatter(
                detailDonasi?.nominal_achieved - detailDonasi?.nominal_used || 0
              )}
              {/* rumus manual saldo donasi */}
            </h4>

            <div
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
            </div>
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
            <h5 className="flex gap-2 items-center">
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
        <div
          className={`donate-header-info mb-2 ${!detail ? 'd-none' : ''}`}
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
                <h4>
                  {currencyFormatter(
                    Math.max(
                      detailDonasi?.nominal_used || 0,
                      detailDonasi?.nominal_by_news || 0
                    )
                  )}
                </h4>
              </div>
              <div className="info-row">
                <p>Penerima Manfaat</p>
                <h4>
                  {Math.max(
                    detailDonasi?.total_beneficiery || 0,
                    detailDonasi?.beneficiery_by_news || 0
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
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
            id="btn-donasi-detail"
            className="btn button-orange w-100"
            disabled
          >
            {type} Belum Dibuka
          </button>
        )}
      </div>
    </div>
  );
};
