'use client';
import React, { Suspense, useEffect, useState } from 'react';

// components
import { Kategori } from './kategori';
import { Donasi } from './donasi';
import { Navbar } from '@/components/ui/navbar';
import Header from '@/components/ui/header';
import { Loading } from '@/components/ui/Loading';

import { getAllProgram } from '@/service/FetchData';
import { useInfiniteQuery } from '@tanstack/react-query';
import CampaignRow from '@/components/ui/skeleton/campaignRow';
import { useSearchParams } from 'next/navigation';

const ProgramDonasi = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  // Wrap in a Suspense boundary to handle useSearchParams safely
  const searchParams = useSearchParams();
  useEffect(() => {
    setSearchQuery(searchParams?.get('q') || null);
  }, [searchParams]);

  const loadMore = () => {
    fetchNextPage();
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
    queryKey: ['allProgram', selectedCategory, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getAllProgram({
        limit: 5,
        mode: 'pagination',
        page: pageParam,
        category: selectedCategory,
        search: searchQuery,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch(); // Refetch data with new category or search query
  }, [selectedCategory, searchQuery, refetch]);

  if (error) return <div>An error occurred: {error.message}</div>;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Header type="search" text={searchQuery} />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <Kategori onCategorySelect={handleCategorySelect} />
          {(isLoading || isFetching) && !isFetchingNextPage ? (
            <div className="bg-white">
              <CampaignRow />
              <CampaignRow />
              <CampaignRow />
              <CampaignRow />
              <CampaignRow />
            </div>
          ) : (
            <Donasi
              campaigns={data.pages.flatMap((page) => page.data.data)}
              loadMore={loadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      </div>
      <Navbar activeItem="/donasi" />
    </>
  );
};

// export default ProgramDonasi;
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProgramDonasi />
    </Suspense>
  );
}
