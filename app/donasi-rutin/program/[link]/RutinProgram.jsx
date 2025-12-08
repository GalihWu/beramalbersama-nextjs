'use client';
// Sama seperti page [id] hanya bannernya yang beda

import React from 'react';
import Header from '@/components/ui/header';
import DonasiRutinBannerFull from '@/components/flow-donasi-rutin/detail/bannerFull';
import DonaisRutinForm from '@/components/flow-donasi-rutin/detail/form';

export default function RutinProgram({ detailProgram, link }) {
  const campaign = {
    title: detailProgram.title,
    image: detailProgram.image,
    nominal_achieved: detailProgram.nominal_achieved,
    total_donors: detailProgram.total_donors,
  };

  return (
    <>
      <Header
        type="title"
        text={`Donasi Rutin ${campaign.title}`}
        link="/donasi-rutin"
      />
      <div className="content-wrapper bg-grey">
        <DonasiRutinBannerFull campaign={campaign} />
        <div className="bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto">
          <DonaisRutinForm id={detailProgram.id} link={link} />
        </div>
      </div>
    </>
  );
}
