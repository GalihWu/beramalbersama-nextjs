'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  FaAngleRight,
  FaCopy,
  FaFacebookF,
  FaInfoCircle,
  FaStopwatch,
  FaWhatsapp,
} from 'react-icons/fa';
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { getTransactionInvoice } from '@/service/FetchData';
import { currencyFormatter, fullDayFormatter } from '@/lib/formater';
import { useToast } from '@/context/ToastContext';
import { Navbar } from '@/components/ui/navbar';
import Skeleton from '@/components/ui/skeleton/skeleton';

const Invoice = ({ params }) => {
  const showToast = useToast();

  const { data, error, isLoading } = useQuery({
    queryKey: ['invoice', params.slug],
    queryFn: async () =>
      await getTransactionInvoice({ transaction: params.slug }),
    enabled: !!params.slug,
  });
  const [donationAmount, setDonationAmount] = useState(0);
  const [payment, setPayment] = useState('');

  useEffect(() => {
    if (data) {
      setPayment(data.data.payment_method);
      setDonationAmount(data.data.nominal);
    }
  }, [data]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast('Disalin ke Clipboard');
      })
      .catch((err) => {
        console.error('Gagal menyalin: ', err);
      });
  };

  if (isLoading)
    return (
      <>
        <Header type="title" text="Intruksi Pembayaran" />
        <div className="content-wrapper bg-grey">
          <div className="container">
            <div className="box-content">
              <div className="payment-cyan-wrapper">
                <Skeleton className="w-[40%] h-4 mt-2" />
                <Skeleton className="w-full h-4 mt-2" />
              </div>
              <div className="payment-white-wrapper pb-0">
                <Skeleton className="w-[30%] h-5 my-5" />

                <div className="flex justify-between px-4 py-4 bg-gray-100 mb-4">
                  <Skeleton className="h-8 w-[40%]" />
                  <Skeleton className="w-8 h8 rounded-md" />
                </div>
                <div className="flex justify-between px-4 py-4 bg-gray-100">
                  <Skeleton className="h-8 w-[40%]" />
                  <Skeleton className="w-8 h8 rounded-md" />
                </div>

                <div className="payment-note">
                  <Skeleton className="w-[60%] h-3 mt-3" />
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton className="w-full h-12 mt-2 rounded-lg" />
                </div>
              </div>

              <div className="content-body border-top">
                <div className="flex flex-col gap-6 justify-center items-center">
                  <Skeleton className="w-[60%] h-7 mb-4" />
                </div>
                <div className="flex flex-col gap-6">
                  <Skeleton className="w-full h-12 mt-2 rounded-lg" />
                  <Skeleton className="w-full h-12 mt-2 rounded-lg" />
                  <Skeleton className="w-full h-12 mt-2 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </>
    );

  if (error) return <div>An error occurred: {error.message}</div>;
  // console.log(data);

  return (
    <>
      <Header type="title" text="Intruksi Pembayaran" />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="payment-cyan-wrapper">
              <h6>Batas waktu pembayaran</h6>
              <div className="d-flex justify-content-between">
                <p>{fullDayFormatter(data.data.last_payment_time)}</p>
                <p>
                  <input
                    id="dateTime"
                    type="text"
                    className="d-none"
                    defaultValue="Jan 30, 2022 06:00:00"
                  />
                  <FaStopwatch /> <span id="timeCounter" />
                </p>
              </div>
            </div>
            <div className="payment-white-wrapper pb-0">
              <div className="payment-header">
                <p>Transfer Bank</p>
                <Image
                  width={500}
                  height={500}
                  className="w-full"
                  alt=""
                  src={payment.image_url}
                />
              </div>
              {payment.account_number !== 0 && (
                <div className="payment-account">
                  <div>
                    <h6>{payment.account_behalf}</h6>
                    <p>{payment.account_number}</p>
                  </div>
                  <div
                    className="btn text-green border border-gray-500 rounded-md"
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => copyToClipboard(payment.account_number)}
                  >
                    <FaCopy width={20} height={20} />
                  </div>
                </div>
              )}
              <div className="payment-nominal">
                <div>
                  <h6>Jumlah donasi</h6>
                  <p>{currencyFormatter(donationAmount)}</p>
                </div>
                <div
                  className="btn text-green border border-gray-500 rounded-md"
                  style={{ display: 'flex', alignItems: 'center' }}
                  onClick={() => copyToClipboard(donationAmount)}
                >
                  <FaCopy />
                </div>
              </div>
              <div className="alert alert-warning alert--icon" role="alert">
                <p className="flex sm:gap-3 gap-2 items-center">
                  <FaInfoCircle className="sm:w-6 w-12 h-full" />
                  <span>
                    <b>PENTING!</b> Mohon transfer tepat sampai 3 angka terakhir
                    agar donasi terverifikasi otomatis
                  </span>
                </p>
              </div>
              <p className="payment-note">
                *Jumlah akan didonasikan hingga 3 digit terakhir
              </p>
              <div className="payment-footer">
                {/* {data?.data.source === 'RUTIN' ? null : (
                  <a
                    href={`/status/${params.slug}`}
                    className="btn button-cyan"
                  >
                    Cek Status Pembayaran
                  </a>
                )} */}
                <a
                  href={`/help/${params.slug}`}
                  className="btn button-white mb-0"
                >
                  Cara Pembayaran <FaAngleRight className="icon-right-fix" />
                </a>
              </div>
            </div>

            <div className="content-body border-top">
              <p className="text-title text-center mb-4">
                Yuk sebarkan ke teman dan keluarga
              </p>
              <ul className="donate-share-links">
                <li>
                  <a href="#" className="btn button-fbook btn-block mb-3">
                    <FaFacebookF className="icon-left-fix" /> Bagikan ke
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="btn button-green btn-block mb-3">
                    <FaWhatsapp className="icon-left-fix" /> Bagikan ke WhatsApp
                  </a>
                </li>
                <li>
                  <a href="/donasi" className="btn button-border-cyan">
                    Donasi ke Program Lain
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Invoice;
