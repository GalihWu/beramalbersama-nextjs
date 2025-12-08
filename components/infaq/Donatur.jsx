import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

import { getDonors } from '@/service/FetchData';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { currencyFormatter, initialName } from '@/lib/formater';

import { postLike } from '@/service/PostData';
import { EmptyData } from '../ui/emptyData';

export const Donatur = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [localLikes, setLocalLikes] = useState({}); // State untuk menyimpan like lokal

  const mutation = useMutation({
    mutationFn: postLike,
    onSuccess: (data, id) => {
      console.log('liked', id);
      // Jika sukses, kita tidak perlu mengubah localLikes karena seharusnya data dari server sudah update
      // Tapi kita biarkan localLikes tetap untuk UX yang lebih baik
    },
    onError: (error, id) => {
      console.log('like error', error);
      // Jika error, kembalikan like count ke semula
      setLocalLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) - 1,
      }));
    },
  });

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
    queryKey: ['donors', { limit: 5, mode: 'pagination', page: 1 }],
    queryFn: ({ pageParam = 1 }) =>
      getDonors({
        limit: 5,
        mode: 'pagination',
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
  });

  if (isLoading) return <></>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const allDonors = data.pages.flatMap((page) => page.data.data);

  const handleAamiin = (id) => {
    // Optimistic update - tambahkan like count secara lokal dulu
    setLocalLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    // Kirim request ke server
    mutation.mutate(id);
  };

  const getLikeCount = (donor) => {
    // Gabungkan like dari server dengan like lokal
    const serverLike = donor.amin || 0;
    const localLike = localLikes[donor.id] || 0;
    return serverLike + localLike;
  };

  return (
    <div className="black-card">
      <div className="donate-body-content pb-0">
        {allDonors.length > 0 ? (
          allDonors.slice(0, visibleCount).map((donor) => {
            const likeCount = getLikeCount(donor);
            return (
              <div className="donatur-row" key={donor.id}>
                <div className="donatur-box">
                  <div className="image-wrap">
                    <h4 className="!text-white text-lg">
                      {initialName(donor.name)}
                    </h4>
                  </div>
                  <div className="text-wrap">
                    <div className="flex gap-3 items-center">
                      <h4>{donor.name}</h4>
                    </div>
                    {/* <p>
                          {donationTime(donor.time, donor.date)} 
                        </p> */}
                    <p>Via {donor.bank_name}</p>
                  </div>
                  <div className="text-nominal">
                    <p>{currencyFormatter(donor.nominal_donasi)}</p>
                  </div>
                </div>

                {donor.doa && (
                  <div className="donatur-comment !w-[90%]">
                    <p>{donor.doa}</p>
                    <div className="flex justify-between items-center mt-3 border-t pt-3 ">
                      <div
                        id={`amin-${donor.id}`}
                        className="text-sm md:text-base"
                      >
                        {likeCount === 0 ? (
                          'Yuk aminkan doa saudara kita'
                        ) : (
                          <span>
                            {likeCount} <strong>orang </strong> meng amiin kan
                            doa ini
                          </span>
                        )}
                      </div>
                      <button
                        className="btn button-border-cyan !flex !text-base !gap-1 !min-w-[85px] items-center"
                        id={`hati-${donor.id}`}
                        onClick={() => handleAamiin(donor.id)}
                      >
                        <FaHeart size={16} />
                        Aamiin
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <EmptyData title={'Belum ada donatur'} />
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
  );
};
