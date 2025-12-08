import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getProgramCategory } from '@/service/FetchData';
import Skeleton from '../ui/skeleton/skeleton';

export const TipeDonasi = ({ toggleModal, handleCategory }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['donasiCategory'],
    queryFn: getProgramCategory,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  // category-rounded
  if (isLoading)
    return (
      <div className="homepage-xs-main-content">
        <div className="homepage-main-header text-start mb-1 mt-4">
          <Skeleton height={30} width={300} />
        </div>
        <div
          className="homepage-category two-column border-0 my-0 size-xs"
          style={{ padding: '0px' }}
        >
          {[...Array(5)].map((_, index) => (
            <a key={index} className="button-category" href="donasi-two.html">
              <Skeleton
                width="62px"
                height="62px"
                className="category-rounded"
              />
              <div className="category-text">Loading...</div>
            </a>
          ))}
        </div>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="homepage-xs-main-content">
      <div className="homepage-main-header text-start mb-1 mt-4">
        <div className="m-0 text-semibold md:font-bold text-lg md:text-xl">
          Pilih Kategori Donasi Favoritmu
        </div>
      </div>
      <div
        className="homepage-category two-column border-0 my-0 size-xs"
        style={{ padding: '0px' }}
      >
        {data.data.slice(0, 4).map((category) => (
          <div
            key={category.id}
            className="button-category"
            onClick={() => handleCategory(category.name)}
          >
            <div className="category-rounded">
              <Image
                src={category.image_url}
                alt={category.image}
                width={500}
                height={500}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="category-text">{category.name}</div>
          </div>
        ))}
        <div className="button-category" onClick={toggleModal} type="button">
          <div className="category-rounded">
            <Image
              src="/img/icons/kategori/11. Lainnya.png"
              alt="Lainnya"
              width={500}
              height={500}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="category-text">Kategori Lainnya</div>
        </div>
      </div>
    </div>
  );
};
