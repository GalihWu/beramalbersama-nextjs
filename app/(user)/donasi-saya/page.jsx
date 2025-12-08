'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyDonation, getMySalur } from '@/service/FetchData';
import Header from '@/components/ui/header';
import { currencyFormatter, dateFormatter } from '@/lib/formater';
import { EmptyData } from '@/components/ui/emptyData';
import { Tooltip } from 'react-tooltip';
import { Loading } from '@/components/ui/Loading';

function Card({ image, title, nominal, status, date, source, salur }) {
  return (
    <div className="w-full border border-solid border-[#4c4c4c] sm:p-[14px] p-[8px] rounded-[8px] card-transition-row">
      <div className="flex relative w-full">
        <Image
          src={image || '/img/donasi-satu.webp'}
          alt={title}
          height={500}
          width={500}
          className="rounded-[4px] sm:w-52 w-40 sm:h-36 h-24"
        />
        <div className="w-[calc(100%-108px)] ml-[8px] sm:my-1">
          <h2 className="text-dark text-[12px] md:text-[14px] leading-[16px] my-0 mt-2 max-h-[32px] overflow-hidden text-ellipsis">
            {title}
          </h2>
          {source === 'RUTIN' && (
            <div className="overflow-hidden cursor-pointer">
              <Image
                src={'/img/icons/menu/6. Donasi rutin.webp'}
                width={50}
                height={50}
                alt="Donasi Rutin"
                className="w-8 h-8"
                data-tooltip-id="rutin-icon-tooltip"
                data-tooltip-content="Donasi Rutin"
                data-tooltip-place="right"
              />
              <Tooltip id="rutin-icon-tooltip" className="!text-sm py-2" />
            </div>
          )}
          <div className="sm:text-[14px] text-[12px] text-green font-bold absolute bottom-0">
            {currencyFormatter(nominal)}
          </div>
        </div>
        <div className="sm:text-[12px] text-[10px] text-grey absolute bottom-0 right-0">
          {dateFormatter(date)}
        </div>
        <div
          className={clsx(
            'w-fit px-[6px] sm:px-[8px] sm:py-[3px] py-[2px] text-[8px] sm:text-[12px] text-white absolute bottom-5 md:bottom-7 right-0 rounded-full',
            status === 'Canceled'
              ? 'bg-red-400'
              : status === 'Pending'
              ? salur
                ? 'bg-orange-500'
                : 'bg-gray-400'
              : status === 'Siap Salur' || status === 'Sedang Penyaluran'
              ? 'bg-primary-500'
              : 'bg-secondary-500'
          )}
        >
          {status === 'Pending'
            ? salur
              ? 'Proses Salur'
              : 'Menunggu Pembayaran'
            : status === 'Paid'
            ? 'Sudah Dibayar'
            : status === 'Done'
            ? 'Selesai Tersalurkan'
            : status}
        </div>
      </div>
    </div>
  );
}

export default function DonasiSaya() {
  const [activeTab, setActiveTab] = useState('Transaksi');
  const observerRef = useRef(null);

  // Query untuk data transaksi (donasi)
  const {
    data: donationData,
    error: donationError,
    isLoading: donationLoading,
    fetchNextPage: fetchNextDonationPage,
    hasNextPage: hasNextDonationPage,
    isFetchingNextPage: isFetchingNextDonationPage,
  } = useInfiniteQuery({
    queryKey: ['myDonation', activeTab],
    queryFn: ({ pageParam = 1 }) =>
      getMyDonation({
        limit: 10,
        status: '',
        mode: 'pagination',
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: activeTab === 'Transaksi',
  });

  // Query untuk data penyaluran
  const {
    data: salurData,
    error: salurError,
    isLoading: salurLoading,
    fetchNextPage: fetchNextSalurPage,
    hasNextPage: hasNextSalurPage,
    isFetchingNextPage: isFetchingNextSalurPage,
  } = useInfiniteQuery({
    queryKey: ['mySalur', activeTab],
    queryFn: ({ pageParam = 1 }) =>
      getMySalur({
        invoice: null,
        limit: 10,
        status: '',
        mode: 'pagination',
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: activeTab === 'Penyaluran',
  });

  // Effect untuk infinite scroll
  useEffect(() => {
    if (!hasNextDonationPage || isFetchingNextDonationPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextDonationPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextDonationPage, isFetchingNextDonationPage, fetchNextDonationPage]);

  useEffect(() => {
    if (!hasNextSalurPage || isFetchingNextSalurPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextSalurPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextSalurPage, isFetchingNextSalurPage, fetchNextSalurPage]);

  // Handler untuk perubahan tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Menggabungkan data dari semua halaman
  const transaksiData =
    donationData?.pages.flatMap((page) => page.data.data) || [];
  const penyaluranData =
    salurData?.pages.flatMap((page) => page.data.data) || [];

  // Menampilkan error jika ada
  if (donationError || salurError) {
    return (
      <div>
        An error occurred:{' '}
        {donationError?.message ||
          salurError?.message ||
          'Something went wrong.'}
      </div>
    );
  }

  return (
    <>
      <Header type="title" text="Donasi Saya" />
      <div className=" w-full max-w-[640px] mx-auto pt-8 pb-2 px-[20px] sticky top-16 z-50 bg-white">
        <div className="relative flex w-full border-b border-solid border-[#4C4C4C]">
          {/* Transaksi Tab */}
          <div
            className={clsx(
              'relative flex h-10 w-32 justify-center items-center px-[15px] -bottom-[1px] border-b border-solid text-semibold rounded-t-[6px] transition-all duration-300 ease-in-out',
              activeTab === 'Transaksi'
                ? 'border-[#D0454C] bg-[#D0454C]'
                : 'border-[#4C4C4C] bg-transparent text-dark hover:bg-gray-100',
              activeTab !== 'Penyaluran' && 'bg-[#D0454C]/[0.1] text-[#D0454C]'
            )}
            role="button"
            onClick={() => handleTabChange('Transaksi')}
          >
            <span className="transition-all duration-300 ease-in-out transform">
              {activeTab === 'Transaksi' ? (
                <span className="inline-block scale-105">Transaksi</span>
              ) : (
                <span className="inline-block hover:scale-105">Transaksi</span>
              )}
            </span>
          </div>

          {/* Penyaluran Tab */}
          <div
            className={clsx(
              'relative flex h-10 w-32 justify-center items-center px-[15px] -bottom-[1px] border-b border-solid text-semibold rounded-t-[6px] transition-all duration-300 ease-in-out',
              activeTab === 'Penyaluran'
                ? 'border-primary-500 bg-[#75D3C1]/[0.3] text-primary-500'
                : 'border-[#4C4C4C] bg-transparent text-dark hover:bg-gray-100'
            )}
            role="button"
            onClick={() => handleTabChange('Penyaluran')}
          >
            <span className="transition-all duration-300 ease-in-out transform">
              {activeTab === 'Penyaluran' ? (
                <span className="inline-block scale-105">Penyaluran</span>
              ) : (
                <span className="inline-block hover:scale-105">Penyaluran</span>
              )}
            </span>
          </div>

          {/* Animated Underline */}
          <div
            className={clsx(
              'absolute bottom-0 h-[2px] transition-all duration-300 ease-in-out',
              activeTab === 'Transaksi'
                ? 'left-0 w-32 bg-[#D0454C]'
                : 'left-32 w-32 bg-[#75D3C1]'
            )}
          />
        </div>
      </div>

      <div className="container content-wrapper bg-white">
        <div className=" w-full max-w-[640px] mx-auto pt-0 p-[15px] lg:p-[20px] bg-white min-h-[calc(100dvh-375px)]">
          <div className="flex flex-col gap-[14px] pb-[20px]">
            {activeTab === 'Transaksi' && (
              <>
                {transaksiData.length === 0 && !donationLoading ? (
                  <EmptyData
                    title="Donasi Kosong"
                    desc="Belum ada Donasi"
                    component={
                      <a href="/donasi" className="btn button-border-cyan">
                        Ayo Donasi Sekarang
                      </a>
                    }
                  />
                ) : (
                  transaksiData
                    .filter((item) => item.payment_status !== 'Canceled')
                    .map((item) => {
                      const url =
                        item.payment_status === 'Pending'
                          ? `/invoice/${item.invoice}`
                          : `/tracking/${item.invoice}`;

                      return (
                        <Link key={item.id} href={url}>
                          <Card
                            image={item.image_url}
                            title={item.judul}
                            nominal={item.nominal_donasi}
                            status={item.payment_status}
                            date={item.date}
                            source={item.source}
                          />
                        </Link>
                      );
                    })
                )}

                {/* Loading indicator untuk infinite scroll */}
                {(donationLoading || isFetchingNextDonationPage) && (
                  <div className="text-center py-4">
                    <Loading />
                  </div>
                )}

                {/* Elemen observer untuk infinite scroll */}
                <div ref={observerRef} className="h-2" />
              </>
            )}

            {activeTab === 'Penyaluran' && (
              <>
                {penyaluranData.length === 0 && !salurLoading ? (
                  <EmptyData
                    title="Donasi Kosong"
                    desc="Belum ada Donasi yang Disalurkan"
                    component={
                      <a href="/donasi" className="btn button-border-cyan">
                        Ayo Donasi Sekarang
                      </a>
                    }
                  />
                ) : (
                  penyaluranData.map((item) => {
                    const url = `/tracking/${item.invoice}`;

                    return (
                      <Link key={item.id} href={url}>
                        <Card
                          image={item.image_url}
                          title={item.judul}
                          nominal={item.nominal_donasi}
                          status={item.status}
                          date={item.date}
                          source={item.source}
                          salur
                        />
                      </Link>
                    );
                  })
                )}

                {/* Loading indicator untuk infinite scroll */}
                {(salurLoading || isFetchingNextSalurPage) && (
                  <div className="text-center py-4">
                    <Loading />
                  </div>
                )}

                {/* Elemen observer untuk infinite scroll */}
                <div ref={observerRef} className="h-2" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
