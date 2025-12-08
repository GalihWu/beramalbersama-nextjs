import React, { useEffect, useState } from 'react';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { Tooltip } from 'react-tooltip';
import Image from 'next/image';
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronRight,
  FaRegQuestionCircle,
  FaUser,
} from 'react-icons/fa';
import { capitalizeFirstLetter, currencyFormatter } from '@/lib/formater';
import Link from 'next/link';

import { DonaturNotif } from '@/components/ui/donaturNotif';

export const ImgDonasi = ({ detailDonasi, handleChange, active, donatur }) => {
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

        {/* notif donatur terbaru */}
        <div className="absolute bottom-[100px] inset-x-0 left-1/2 -translate-x-1/2">
          <DonaturNotif donatur={donatur?.data} />
        </div>

        {/* Overlay gradasi putih dari bawah ke atas */}
        {/* <div
          className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0) 60%)',
          }}
        /> */}

        <Link
          className="flex w-full items-center gap-4 py-3 px-4 z-10 relative duration-200 transition-colors hover:bg-primary-200/10"
          href={`/mitra/${detailDonasi?.mitra.id}`}
        >
          <div className="w-16 h-16 rounded-full bg-white border border-primary-500 overflow-hidden">
            <Image
              src={detailDonasi?.mitra.image}
              loading="lazy"
              alt="mitra"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-medium">{detailDonasi?.mitra.name}</div>
            <div className="text-secondary-500 text-sm flex gap-2 items-center w-fit bg-cyan-100/40 font-medium px-3 py-1 rounded-full -ml-2">
              Verified{' '}
              <Image
                width={36}
                height={36}
                src="/img/icons/verif/Verifikasi II.png"
                className="ml-0 h-4 w-auto"
                alt="verified"
              />
            </div>
          </div>
          <div className="absolute right-4">
            <FaChevronRight size={18} />
          </div>
        </Link>
      </div>

      {/* </div> */}

      {/* bottom */}
      <div className="donate-header-text">
        <div className="donate-header-upper">
          <div className="text-xl font-semibold md:text-2xl mb-3">
            {detailDonasi?.title}
          </div>

          <div className="donate-nominal-text flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <span>Dana Tersedia</span>{' '}
                <FaRegQuestionCircle
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Dana yang siap disalurkan"
                  data-tooltip-place="right"
                  size={12}
                />
                <Tooltip
                  id="my-tooltip"
                  className="!text-xs py-2 max-w-[200px]"
                />
              </div>
              <span className="text-lg md:text-xl text-primary-500 font-bold">
                {currencyFormatter(
                  detailDonasi?.nominal_achieved - detailDonasi?.nominal_used ||
                    0
                )}
              </span>
              {/* rumus manual saldo donasi */}
            </div>

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
            className="btn button-orange w-full !font-bold !h-[52px] mt-2"
            style={{
              animation: 'pulse-scale 2.5s ease-in-out infinite',
            }}
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
