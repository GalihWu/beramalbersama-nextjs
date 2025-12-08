'use client';

import React, { useEffect, useState } from 'react';
import { Donasi } from './donasi';
import { Footer } from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import { getAllProgram } from '@/service/FetchData';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import CampaignRow from '@/components/ui/skeleton/campaignRow';

const Banner = React.memo(({ src, alt, isLink }) => {
  const content = <Image width={300} height={300} src={src} alt={alt} />;

  return isLink ? (
    <a href="#" className="banner-link">
      {content}
    </a>
  ) : (
    <div className="banner-non-link">{content}</div>
  );
});

Banner.displayName = 'Banner';

const DonasiRamadhan = () => {
  const [visibleCount, setVisibleCount] = useState(5);

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
    queryKey: ['allProgram'],
    queryFn: ({ pageParam = 1 }) =>
      getAllProgram({
        limit: 5,
        mode: 'pagination',
        page: pageParam,
        category: 13,
        search: '',
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    setVisibleCount(5);
    refetch();
  }, [refetch]);

  if ((isLoading || isFetching) && !isFetchingNextPage) {
    return (
      <>
        <Header type="title" text="Panen Pahala Ramadhan" />
        <div className="content-wrapper bg-grey">
          <div className="container pb-4">
            {[
              { src: '/img/ramadhan/ramadhan-1.webp', isLink: false },
              { src: '/img/ramadhan/ramadhan-2.webp', isLink: false },
            ].map((banner, index) => (
              <Banner key={index} {...banner} />
            ))}

            <CampaignRow />
            <CampaignRow />
            <CampaignRow />
          </div>
        </div>
      </>
    );
  }

  if (error) return <div>An error occurred: {error.message}</div>;

  const campaigns = data.pages.flatMap((page) => page.data.data);

  return (
    <>
      <Header type="title" text="Panen Pahala Ramadhan" />
      <div className="content-wrapper bg-grey">
        <div className="container pb-4">
          {[
            { src: '/img/ramadhan/ramadhan-1.webp', isLink: false },
            { src: '/img/ramadhan/ramadhan-2.webp', isLink: false },
          ].map((banner, index) => (
            <Banner key={index} {...banner} />
          ))}

          <Donasi
            data={data}
            campaigns={campaigns}
            visibleCount={visibleCount}
            loadMore={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
                setVisibleCount((prevCount) => prevCount + 4);
              }
            }}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
      <Footer />
      <Navbar activeItem={'/'} />
    </>
  );
};

export default DonasiRamadhan;
