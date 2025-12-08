import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import { Loading } from '@/components/ui/Loading';

import { currencyFormatter } from '@/lib/formater';
import Link from 'next/link';

export const Donasi = ({
  campaigns,

  loadMore,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 } // Trigger saat 10% element terlihat
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, loadMore]);
  return (
    <div className="homepage-xs-main-content programs shadow-sm">
      <div className="homepage-list-xs animate-fade-in">
        {campaigns?.map((campaign) => (
          <Link
            className="card-campaign-row card-transition-row "
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
        ))}
        <div ref={observerRef} className="h-2" />
        {isFetchingNextPage && (
          <div className="text-center py-4">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};
