import { getProgramLinkDonors } from '@/service/FetchData';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ListDonasi from '@/components/ui/skeleton/listDonasi';
import { EmptyData } from '@/components/ui/emptyData';
import { TitleBorder } from '@/components/ui/TitleBorder';
import { DonaturList } from '@/components/ui/donaturList';
export const Donatur = ({ programId }) => {
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 visible donors

  const loadMore = () => {
    fetchNextPage();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['DonasiList', programId],
    queryFn: ({ pageParam = 1 }) =>
      getProgramLinkDonors(programId, {
        limit: 5,
        mode: 'pagination',
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    enabled: !!programId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <>
        <div className="donate-body-wrapper" id="donateUser">
          <div className="black-card">
            <TitleBorder title={'Donatur'} amount={'...'} />
            <div className="donate-body-content pb-0">
              <ListDonasi />
              <ListDonasi />
              <ListDonasi />
              <ListDonasi />
              <ListDonasi />
            </div>
          </div>
        </div>
      </>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  const allDonors = data.pages.flatMap((page) => page.data.data);

  return (
    <div className="donate-body-wrapper" id="donateUser">
      <div className="black-card">
        <TitleBorder title={'Donatur'} amount={data.pages[0].data.total} />
        <div className="donate-body-content pb-0">
          {allDonors.length > 0 ? (
            allDonors
              .slice(0, visibleCount)
              .map((donor) => (
                <DonaturList
                  key={donor.id}
                  donor={donor}
                  programLink={programId}
                />
              ))
          ) : (
            <EmptyData
              title="Belum ada Donatur"
              desc="Ayo jadi bagian dari #JembatanKebaikan"
            />
          )}
        </div>
        {visibleCount < data.pages[0].data.total && hasNextPage && (
          <div className="d-flex justify-content-center">
            <div
              className="btn button-link color-cyan"
              onClick={loadMore}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Lihat lebih banyak'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
