import { getProgramCategory } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Skeleton from '../ui/skeleton/skeleton';

export const Modal = ({ closeModal, handleCategory }) => {
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
        <div className="homepage-main-header text-start">
          <div className="m-0 text-semibold md:font-bold text-lg md:text-xl">
            Pilih Kategori Donasi Favoritmu
          </div>
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

  // console.log(data);

  return (
    <div
      className="modal modal-category size-xs fade show"
      tabIndex={-1}
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pilih Kategori Program</h5>
            <button
              type="button"
              className="btn button-icon button-close"
              onClick={closeModal}
              aria-label="Close"
            >
              <FaTimes color="red" />
            </button>
          </div>
          <div className="modal-body">
            <div className="homepage-category">
              {data?.data.map((category) => (
                <div
                  key={category.id}
                  className="button-category"
                  onClick={() => {
                    handleCategory(category.name);
                    closeModal();
                  }}
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
                  <div className="category-text text-green">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
