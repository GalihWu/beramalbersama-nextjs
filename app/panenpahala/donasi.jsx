import Image from 'next/image';
import React from 'react';

import { Loading } from '@/components/ui/Loading';

import { currencyFormatter } from '@/lib/formater';
import Link from 'next/link';

export const Donasi = ({
  data,
  campaigns,
  visibleCount,
  loadMore,
  hasNextPage,
  isFetchingNextPage,
}) => {
  return (
    <div className="homepage-xs-main-content programs shadow-sm">
      <div className="homepage-list-xs">
        <div className="text-[18px] md:text-[22px] mt-8 text-center font-extrabold text-primary-500 mb-2 md:mb-4">
          Donasi Khusus Ramadhan
        </div>

        {campaigns && campaigns.length > 0 ? (
          campaigns.slice(0, visibleCount).map((campaign) => (
            <Link
              className="card-campaign-row"
              href={`/donasi/detail/${campaign.link}`}
              key={campaign.id}
            >
              <figure
                className="card-campaign-image"
                style={{ backgroundImage: `url("${campaign.image}")` }}
              />
              <div className="card-campaign-text">
                <div className="card-campaign-title">{campaign.title}</div>
                <div className="card-campaign-client">
                  <span className="truncate">{campaign.mitra?.name}</span>
                  <Image
                    width={100}
                    height={100}
                    src="/img/icons/verif/Verifikasi II.png"
                    alt="icon"
                    className="md:w-4 w-3"
                  />
                  <span
                    className={`text-xs font-medium ml-3 rounded-full px-[5px] py-[2px] orange truncate ${campaign.category}`}
                  >
                    {campaign.category.name}
                  </span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${campaign.progress_achieved}%` }}
                    aria-valuenow={campaign.progress_achieved}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="card-campaign-nominal">
                  <div className="text-left">
                    <p className="m-0">Terkumpul</p>
                    <h5>{currencyFormatter(campaign.nominal_achieved)}</h5>
                  </div>
                  <div className="text-right">
                    <p className="m-0">Sisa Hari</p>
                    <h5>{campaign.remaining_days}</h5>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No campaigns available</p>
        )}

        {visibleCount < (data?.pages[0]?.data?.total || 0) && hasNextPage && (
          <div className="d-flex justify-content-center mb-5">
            <button
              className="btn button-link color-cyan"
              onClick={loadMore}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? <Loading /> : 'Lihat lebih banyak'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
