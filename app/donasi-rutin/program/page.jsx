'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Navbar } from '@/components/ui/navbar';
import Header from '@/components/ui/header';
import { getProgramShowOn } from '@/service/FetchData';
import { useInfiniteQuery } from '@tanstack/react-query';
import CampaignRow from '@/components/ui/skeleton/campaignRow';
import { Loading } from '@/components/ui/Loading';
import { currencyFormatter } from '@/lib/formater';

const ProgramDonasi = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => {
    fetchNextPage();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['routineProgram'],
    queryFn: () => getProgramShowOn('rutin'),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
  });

  useEffect(() => {
    setVisibleCount(5);
    refetch();
  }, [refetch]);

  if ((isLoading || isFetching) && !isFetchingNextPage)
    return (
      <>
        <Header type="title" text="Program Donasi Rutin" />
        <div className="content-wrapper bg-grey">
          <div className="container">
            <CampaignRow />
            <CampaignRow />
            <CampaignRow />
            <CampaignRow />
          </div>
        </div>
      </>
    );

  if (error) return <div>An error occurred: {error.message}</div>;

  const campaigns = data.pages.flatMap((page) => page.data);

  // console.log(data);
  return (
    <>
      <Header type="title" text="Program Donasi Rutin" />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="homepage-xs-main-content programs shadow-sm">
            <div className="homepage-list-xs">
              {campaigns && campaigns.length > 0 ? (
                campaigns.slice(0, visibleCount).map((campaign) => (
                  <Link
                    className="card-campaign-row"
                    href={`/donasi-rutin/program/${campaign.link}`}
                    key={campaign.id}
                  >
                    <figure
                      className="card-campaign-image"
                      style={{ backgroundImage: `url("${campaign.image}")` }}
                    />
                    <div className="card-campaign-text">
                      <div className="card-campaign-title">
                        {campaign.title}
                      </div>
                      <div className="card-campaign-client">
                        {campaign.mitra?.name}
                        <Image
                          width={100}
                          height={100}
                          src="/img/icons/verif/Verifikasi II.png"
                          alt="icon"
                          className="md:w-4 w-3"
                        />
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
                          <p>Terkumpul</p>
                          <h5>
                            {currencyFormatter(campaign.nominal_achieved)}
                          </h5>
                        </div>
                        <div className="text-right">
                          <p>Sisa Hari</p>
                          <h5>{campaign.remaining_days}</h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No campaigns available</p>
              )}

              {visibleCount < (data?.pages[0]?.data?.total || 0) &&
                hasNextPage && (
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
        </div>
      </div>
      <Navbar activeItem="/donasi-rutin" />
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramDonasi />
    </Suspense>
  );
}
