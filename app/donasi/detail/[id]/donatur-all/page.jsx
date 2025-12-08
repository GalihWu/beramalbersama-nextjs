'use client';

import React, { useEffect, useState } from 'react';

import { Donatur } from './Donatur';
import { Fundraiser } from './Fundraiser';
import Header from '@/components/ui/header';
import { useRouter } from 'next/navigation';
import useFormStore from '@/stores/FormStore';

const DonasiDetailDonatur = ({ params }) => {
  const router = useRouter();
  const [idProgram, setIdProgram] = useState(null);
  const { updateFormData, clearFormData } = useFormStore();

  useEffect(() => {
    const getMinProgram = async (link) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program-minimum/link/${link}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch metadata for ID: ${id}`);
      }

      const data = await res.json();
      setIdProgram(data?.data.id);
    };

    getMinProgram(params.id);
  }, [params.id]);

  useEffect(() => {
    clearFormData();
  }, [clearFormData]);

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
      <Header type="title" text="Donatur & Fundraiser" />
      <div className="content-wrapper bg-grey">
        <div className="container !pb-28">
          <Donatur programId={params.id} />
          <Fundraiser programId={params.id} />
        </div>
        <div className={`donate-sticky animate-fade-ups`}>
          <div className="container">
            <div className="donate-sticky-content shadow-sm flex gap-3">
              <button
                id="btn-donasi-sekarang"
                className="btn button-orange !font-medium !text-base md:!text-lg cursor-pointer !w-full"
                onClick={() => handleDonation(idProgram, params.id)}
              >
                Donasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonasiDetailDonatur;
