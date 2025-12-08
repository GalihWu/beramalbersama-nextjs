'use client';

import React from 'react';
import Header from '@/components/ui/header';

import DonasiRutinBannerDefault from '@/components/flow-donasi-rutin/detail/bannerDefault';
import DonaisRutinForm from '@/components/flow-donasi-rutin/detail/form';

export default function DetailDonasiRutin({ params }) {
  const { slug } = params;
  return (
    <>
      <Header
        type="title"
        text={
          slug === 'dipilihkan'
            ? 'Donasi Rutin'
            : slug === 'subuh'
            ? 'Donasi Tiap Subuh'
            : 'Donasi Tiap Jumat'
        }
      />
      <div className="content-wrapper bg-grey">
        <div className="bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto">
          <DonasiRutinBannerDefault type={slug} />
          <DonaisRutinForm type={slug} />
        </div>
      </div>
    </>
  );
}
