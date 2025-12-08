'use client';

import { getProgramByLink } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';

// components
import Header from '@/components/ui/header';
import { MitraSalur } from './MitraSalur';
import { ProjectsSummary } from './ProjectsSummary';
import { Activity } from './Activity';
import Skeleton from '@/components/ui/skeleton/skeleton';
import useFormStore from '@/stores/FormStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DonasiDetailSalur = ({ params }) => {
  const { updateFormData } = useFormStore();
  const [hideStickyButton, setHideStickyButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setHideStickyButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['programDetail', params.id],
    queryFn: () => getProgramByLink(params.id),
    enabled: !!params.id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div>
        <Header type="title" text="Salur" />
        <div className="content-wrapper bg-grey">
          <div className="container">
            <Skeleton className="w-full h-400px" />
          </div>
        </div>
      </div>
    );

  if (error) return <div>An error occurred: {error.message}</div>;

  const detailDonasi = data?.data;

  const handleDonation = (id, link) => {
    updateFormData({
      type: 'donation',
      program_type: 'infaq',
      items: [id],
    });

    router.push(`/donasi/detail/${link}/form?id=${id}`);
  };

  return (
    <>
      <Header type="title" text="Proyek Salur" />
      <div className="content-wrapper bg-grey">
        <div className="container ">
          <ProjectsSummary programLink={params.id} />
          <MitraSalur programLink={params.id} />

          <Activity
            programId={data?.data.id}
            programLink={params.id}
            detailDonasi={data?.data}
          />
        </div>
      </div>
      <div
        className={`donate-sticky animate-fade-ups ${
          hideStickyButton ? 'hidden' : ''
        }`}
      >
        <div className="container">
          <div className="donate-sticky-content shadow-sm flex gap-3">
            {detailDonasi.status === 'PUBLISH' ? (
              <button
                id="btn-donasi-sekarang"
                className="btn button-cyan cursor-pointer !w-full"
                onClick={() =>
                  handleDonation(detailDonasi.id, detailDonasi.link)
                }
              >
                Donasi Sekarang
              </button>
            ) : (
              <button
                className="btn button-cyan cursor-pointer"
                id="btn-donasi-sekarang"
                onClick={() =>
                  handleDonation(detailDonasi.id, detailDonasi.link)
                }
                disabled
              >
                Donasi Belum Dibuka
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DonasiDetailSalur;
