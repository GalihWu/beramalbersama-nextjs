'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyWallet } from '@/service/FetchData';
import Header from '@/components/ui/header';
import { currencyFormatter, formatTimeAgo } from '@/lib/formater';
import { Loading } from '@/components/ui/Loading';
import { FaHandHoldingHeart, FaWallet } from 'react-icons/fa';
import { EmptyData } from '@/components/ui/emptyData';
import Link from 'next/link';

const MutasiSakurBerbagi = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myEvent'],
    queryFn: getMyWallet,
  });

  const myWallet = data?.data || [];

  if (error) {
    return (
      <div>An error occurred: {error?.message || 'Something went wrong.'}</div>
    );
  }
  return (
    <div>
      <Header type="title" text="Aktivitas Saku Berbagi Saya" />
      <div className="container content-wrapper content-sm">
        <div className="container bg-white pb-32">
          <div className="flex justify-between items-center border-b py-4 mb-2">
            <div className="font-bold text-gray text-base md:text-lg">
              Total saldo sekarang{' '}
            </div>
            <div className="font-bold text-primary-500 text-base md:text-lg">
              {isLoading ? '...' : currencyFormatter(Number(myWallet.saldo))}
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : myWallet.history.length === 0 ? (
            <EmptyData
              title="Belum ada aktivitas transaksi"
              desc="Top up sekarang untuk mengisi Saku Berbagimu"
              component={
                <div>
                  <Link href="/wallet" className="btn-new-tosca">
                    Top Up
                  </Link>
                </div>
              }
            />
          ) : (
            myWallet.history.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 py-2 border-b"
              >
                {/* <div
                  className={`w-5 h-5 rounded-full ${
                    item.type === 'debit' ? 'bg-red-500' : 'bg-primary-500'
                  }`}
                /> */}
                <div className="border rounded-md p-2">
                  {item.type === 'debit' ? (
                    <FaHandHoldingHeart size={20} className="text-orange-500" />
                  ) : (
                    <FaWallet size={20} className="text-primary-500" />
                  )}
                </div>

                <div className="flex justify-between flex-1">
                  <div>
                    <div className="text-base md:text-lg font-medium">
                      {item.type == 'top_up' ? 'Isi Saldo' : 'Donasi'}
                    </div>
                    <div className="text-sm md:text-base text-gray">
                      {formatTimeAgo(item.created_at)}
                    </div>
                  </div>
                  <div className="font-semibold">
                    {' '}
                    {item.type === 'debit' ? '-' : '+'}{' '}
                    {currencyFormatter(Number(item.amount))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MutasiSakurBerbagi;
