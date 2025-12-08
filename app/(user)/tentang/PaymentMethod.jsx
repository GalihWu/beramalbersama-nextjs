import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCopy } from 'react-icons/fa';
import { getPayment } from '@/service/FetchData';
import Toastr from '@/components/ui/toastr';

export const PaymentMethod = () => {
  const [showToast, setShowToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['donasiCategory'],
    queryFn: () => getPayment({ type: 'bank' }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading)
    return <div className="homepage-xs-main-content">Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowToast(true);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const payments = data?.data ?? [];

  return (
    <>
      {showToast && (
        <Toastr
          message="Disalin ke Clipboard"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="content-body border-top">
        <p className="text-18 text-strong">Rekening Donasi</p>

        <div
          className="text-14 cursor-pointer flex justify-between items-center border border-gray-500 rounded-md py-2 px-3"
          onClick={toggleDropdown}
        >
          <p>
            Semua rekening atas nama <strong>Yayasan Aksi Berbagi</strong>
          </p>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen && (
          <div className="about-detail d-flex flex-wrap">
            {payments
              .filter((payment) => payment.is_active === '1')
              .map((payment) => (
                <div className="about-account" key={payment.account_number}>
                  <Image
                    width={500}
                    height={500}
                    src={payment.image_url}
                    alt={payment.name}
                  />
                  <p className="text-16 text-strong">
                    {payment.account_number}
                  </p>
                  <div
                    className=" text-green border border-gray-500 rounded-md flex items-center cursor-pointer p-3"
                    onClick={() => copyToClipboard(payment.account_number)}
                  >
                    <FaCopy />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
