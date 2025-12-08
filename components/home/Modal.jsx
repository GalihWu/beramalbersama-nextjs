import { getProgramCategory } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Skeleton from '@/components/ui/skeleton/skeleton';

export const Modal = ({ closeModal, handleCategory }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['donasiCategory'],
    queryFn: getProgramCategory,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (error) return <div>An error occurred: {error.message}</div>;

  // console.log(data);

  return (
    <div
      className="modal modal-category size-xs "
      tabIndex={-1}
      style={{ display: 'block' }}
    >
      <div className="modal-dialog animate-fade-in-up">
        <div className="modal-content">
          <div className="modal-header">
            <div className="font-semibold text-xl">Kategori Program</div>
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
              {isLoading
                ? [...Array(5)].map((_, index) => (
                    <a
                      key={index}
                      className="button-category"
                      href="donasi-two.html"
                    >
                      <Skeleton
                        width="62px"
                        height="62px"
                        className="category-rounded"
                      />
                      <div className="category-text">Loading...</div>
                    </a>
                  ))
                : data?.data.map((category) => (
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
