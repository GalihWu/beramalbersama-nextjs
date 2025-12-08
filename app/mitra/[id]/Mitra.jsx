'use client';

import Header from '@/components/ui/header';
import { Loading } from '@/components/ui/Loading';
import Skeleton from '@/components/ui/skeleton/skeleton';
import { getAllProgram } from '@/service/FetchData';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { CampaignCardList } from '@/components/ui/campaignCardList';

const Mitra = ({ idMitra, detailMitra }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  // Wrap in a Suspense boundary to handle useSearchParams safely
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchQuery(searchParams?.get('q') || null);
  }, [searchParams]);

  // console.log(detailMitra);

  const observerRef = useRef(null);

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
    queryKey: ['allProgram', searchQuery, idMitra],
    queryFn: ({ pageParam = 1 }) =>
      getAllProgram({
        limit: 6,
        mode: 'pagination',
        page: pageParam,
        search: searchQuery,
        mitra_id: idMitra,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = () => {
    fetchNextPage();
  };

  useEffect(() => {
    refetch(); // Refetch data with new category or search query
  }, [searchQuery, refetch]);

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

  if (error) return <div>An error occurred: {error.message}</div>;

  const donation = data?.pages.flatMap((page) => page.data.data);

  return (
    <>
      <Header type="title" text={`Profil ${detailMitra.name}`} />

      <div className="content-wrapper bg-grey  animate-fade-in">
        <div className="container bg-white px-4 py-12">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6 py-8 border-b">
            {/* logo */}
            <div className="rounded-full mb-8 overflow-hidden mr-0 md:mr-8 w-28 h-28 border-2 border-primary-500 flex-shrink-0">
              <Image
                alt={detailMitra.name || 'Logo Lembaga'}
                className="h-full w-full object-cover"
                src={detailMitra.image_url}
                width={112}
                height={112}
              />
            </div>

            {/* Content */}
            <div className="mx-0">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 text-center md:text-start">
                {detailMitra.name}
              </h1>

              <div className="mb-6 text-start">
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <span className="font-semibold  w-[100px]">Lokasi:</span>
                  <span className="text-gray-700">{detailMitra.address}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <span className="font-semibold  w-[100px]">No Telp:</span>
                  <span className="text-gray-700">{detailMitra.number}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {detailMitra.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-5 max-w-md mx-auto md:mx-0">
                <div className="text-center p-3 bg-primary-100/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary-500">
                    {detailMitra.program_count}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Program</div>
                </div>
                <div className="text-center p-3 bg-primary-100/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary-500">
                    {detailMitra.donor_count}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Donatur</div>
                </div>
                <div className="text-center p-3 bg-primary-100/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary-500">
                    {detailMitra.fundraiser_count}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Fundraiser</div>
                </div>
              </div>
            </div>
          </div>

          {/* Program */}
          <div>
            <div className="pt-6 pb-3">
              <div className="text-base md:text-lg font-semibold">
                Program Kebaikan
              </div>
              <div className="text-sm md:text-base text-gray">
                Program yang digalang Lembaga
              </div>
            </div>
            <div>
              <ul className="p-0">
                {(isLoading || isFetching) && !isFetchingNextPage
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <li className="flex mb-2" key={index}>
                        <Skeleton className={'w-[250px] h-[140px] rounded'} />
                        <div className="w-full h-[140px] bg-white flex flex-col gap-3 py-1 px-2">
                          <Skeleton className={'w-[80%] h-5 mb-4'} />
                          <Skeleton className={'w-full h-3'} />
                          <Skeleton className={'w-[60%] h-5'} />
                        </div>
                      </li>
                    ))
                  : donation?.map((campaign, index) => (
                      <li key={index} id="card-donasi-mendesak">
                        <CampaignCardList
                          category={campaign.category.name}
                          image={campaign.image}
                          link={campaign.link}
                          mitra={campaign.mitra.name}
                          nominal_achieved={campaign.nominal_achieved}
                          progress_achieved={campaign.progress_achieved}
                          remaining_days={campaign.remaining_days}
                          title={campaign.title}
                        />
                      </li>
                    ))}
              </ul>
              <div ref={observerRef} className="h-2" />
              {isFetchingNextPage && (
                <div className="text-center py-4">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mitra;
