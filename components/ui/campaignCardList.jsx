import { currencyFormatter } from '@/lib/formater';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const CampaignCardList = ({
  image,
  link,
  title,
  mitra,
  category,
  progress_achieved,
  nominal_achieved,
  remaining_days,
}) => {
  return (
    <Link
      href={`/donasi/detail/${link}`}
      id="card-donasi-vertikal"
      className="card-campaign-row card-transition-row"
    >
      <figure
        className="card-campaign-image"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="card-campaign-text">
        <div className="card-campaign-title">{title}</div>
        <div className="flex gap-1 items-center">
          <span className="text-sm truncate">{mitra}</span>
          <Image
            width={12}
            height={12}
            src="/img/icons/verif/Verifikasi II.png"
            alt="icon"
            className="w-4 h-4"
          />
          <span
            className={`text-xs font-medium truncate ml-3 rounded-full px-[5px] py-[2px] orange ${category}`}
          >
            {category}
          </span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress_achieved}%` }}
            aria-valuenow={progress_achieved}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="card-campaign-nominal">
          <div className="text-left">
            <p className="m-0">Terkumpul</p>
            <h5>{currencyFormatter(nominal_achieved)}</h5>
          </div>
          <div className="text-right">
            <p className="m-0">Sisa Hari</p>
            <h5>{remaining_days}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};
