'use client';
// Sama seperti page [id] hanya bannernya yang beda

import React from 'react';
import Header from '@/components/ui/header';
import DonasiRutinSuksesTop from '@/components/flow-donasi-rutin/result/top';
import DonasiRutinResultContent from '@/components/flow-donasi-rutin/result/content';
import { Navbar } from '@/components/ui/navbar';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRutinDetail } from '@/service/FetchData';
import Skeleton from '@/components/ui/skeleton/skeleton';
import Link from 'next/link';
import { postRoutineStop } from '@/service/PostData';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { useRouter } from 'next/navigation';

export default function DetailDonasiRutin({ params }) {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['deatailRutinTransaction', params.slug],
  //   queryFn: async () => await getRutinDetailTransaction(params.slug),
  //   enabled: !!params.slug,
  // });
  const { showModal } = useConfirmationModal();
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ['deatailRutin', params.id],
    queryFn: async () => await getRutinDetail(params.id),
    enabled: !!params.id,
  });

  const { mutate, isLoading: loadingStopRutin } = useMutation({
    mutationFn: async (id) => await postRoutineStop(id),
  });

  const handleStopRutin = (id) => {
    showModal({
      type: 'warning',
      title: 'Berhenti Rutin',
      message: 'Apakah Anda yakin untuk menghentikan donasi rutin ini?',
      onConfirm: () => {
        mutate(id);
        router.push('/donasi-rutin');
      },
      textConfirm: 'Berhenti',
    });
  };

  if (isLoading)
    return (
      <div>
        <Header type="title" text="Donasi Rutin" />
        <div className="content-wrapper bg-grey">
          <div className="bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto flex flex-col gap-3 items-center">
            <Skeleton className="w-[45%] h-5" />
            <Skeleton className="w-[60%] h-5" />
            <Skeleton className="w-[55%] h-5" />
            <div className="w-full flex justify-center items-center">
              <Skeleton className="w-[78%] h-52 m-auto rounded-lg" />
            </div>
          </div>

          <div className="bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto border-t-[10px] border-solid border-[#f7f7f7] flex flex-col gap-3 items-center">
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
            <Skeleton className="w-[88%] h-5 " />
          </div>
        </div>
        <Navbar />
      </div>
    );

  const detailRutin = data?.data || {};

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header type="title" text="Donasi Rutin" />
      <div className="content-wrapper bg-grey pb-[10vh]">
        {detailRutin.status === 'active' ? (
          <DonasiRutinSuksesTop
            type="sukses"
            campaign={detailRutin.program.title}
          />
        ) : detailRutin.invoicing === null ? (
          <DonasiRutinSuksesTop
            type="berhenti"
            campaign={detailRutin.program.title}
          />
        ) : detailRutin.invoicing.status === 'Pending' ? (
          <DonasiRutinSuksesTop
            type="pending"
            campaign={detailRutin.program.title}
          />
        ) : (
          <DonasiRutinSuksesTop
            type="gagal"
            campaign={detailRutin.program.title}
          />
        )}
        <DonasiRutinResultContent detail={detailRutin} />

        {(() => {
          // Ekstrak variabel untuk menghindari pengulangan dan meningkatkan keterbacaan
          const { invoicing, status, id } = detailRutin;
          const containerClasses =
            'bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto';

          // Jika ada invoice
          if (invoicing !== null) {
            return (
              <div className={containerClasses}>
                {invoicing.status === 'Pending' ? (
                  <Link
                    className="btn bg-orange text-white font-bold hover:bg-orange-dark transition-colors"
                    href={`/donasi-rutin/invoice/${invoicing.invoice}`}
                  >
                    Bayar Sekarang
                  </Link>
                ) : (
                  <Link
                    className="btn bg-tosca text-white font-bold hover:bg-tosca-dark transition-colors"
                    href="/donasi-rutin/tujuan"
                  >
                    Pilih Donasi Rutin Lainnya
                  </Link>
                )}
              </div>
            );
          }

          // Jika status aktif (tanpa invoice)
          if (status === 'active') {
            return (
              <div className={containerClasses}>
                <button
                  className={`bg-red-400 transition-all duration-300 hover:bg-red-600 px-4 py-3 w-fit rounded-md text-white font-semibold cursor-pointer ${
                    loadingStopRutin ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleStopRutin(id)}
                  disabled={loadingStopRutin}
                >
                  {loadingStopRutin ? 'Memproses...' : 'Hentikan Donasi Rutin'}
                </button>
              </div>
            );
          }

          // Default case
          return (
            <div className={containerClasses}>
              <Link
                className="btn bg-tosca text-white font-bold hover:bg-tosca-dark transition-colors"
                href="/donasi-rutin/tujuan"
              >
                Pilih Donasi Rutin Lainnya
              </Link>
            </div>
          );
        })()}
      </div>
      <Navbar />
    </>
  );
}
