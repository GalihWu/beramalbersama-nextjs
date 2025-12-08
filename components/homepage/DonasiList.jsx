import { currencyFormatter } from '@/lib/formater';
import { getProgramVertical } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CampaignRow from '../ui/skeleton/campaignRow';

export const DonasiList = ({ category }) => {
  const [campaigns, setCampaigns] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['programVertical'],
    queryFn: getProgramVertical,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const donations = data?.data || [];

  useEffect(() => {
    if (donations.length > 0) {
      const filteredDonations =
        category === 'Semua'
          ? donations
          : donations.filter((item) => item.category.name === category);
      setCampaigns(filteredDonations);
    }
  }, [category, donations]);

  if (isLoading)
    return (
      <div className="homepage-list-xs mt-2">
        <CampaignRow />
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <div className="homepage-list-xs mt-2">
        {campaigns &&
          campaigns.map((campaign, index) => (
            <Link
              href={`/donasi/detail/${campaign.link}`}
              key={index}
              id="card-donasi-vertikal"
              className="card-campaign-row"
            >
              <figure
                className="card-campaign-image"
                style={{ backgroundImage: `url("${campaign.image}")` }}
              />
              <div className="card-campaign-text">
                <div className="card-campaign-title">{campaign.title}</div>
                <div className="flex gap-1 items-center">
                  <span className="text-sm truncate">
                    {campaign.mitra.name}
                  </span>
                  <Image
                    width={12}
                    height={12}
                    src="/img/icons/verif/Verifikasi II.png"
                    alt="icon"
                    className="w-4 h-4"
                  />
                  <span
                    className={`text-xs font-medium truncate ml-3 rounded-full px-[5px] py-[2px] orange ${campaign.category}`}
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
      </div>
      <div className="flex justify-center pb-12">
        <Link className="btn button-orange" href="/donasi">
          Lihat Program Lainnya
        </Link>
      </div>
    </>
  );
};
