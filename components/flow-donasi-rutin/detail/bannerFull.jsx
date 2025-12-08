import React from 'react';
import Image from 'next/image';
import { currencyFormatter } from '@/lib/formater';

export default function DonasiRutinBannerFull({ campaign }) {
  return (
    <>
      <div className="w-full max-w-[640px] mx-auto">
        <Image
          src={campaign.image}
          alt=""
          width={500}
          height={500}
          className="w-full h-auto"
        />
        <div class="sc-dr-info w-full !py-[20px] !px-[15px] !lg:px-[20px]">
          <h2 class="text-title m-0">{campaign.title}</h2>

          <div class="dr-info-flex px-0 pt-[8px]">
            <div class="box">
              <div class="text-subtitle !mb-0 text-gray">Donasi Terkumpul</div>
              <div class="text-title sm mb-0 text-tosca">
                {currencyFormatter(campaign.nominal_achieved)}
              </div>
            </div>
            <div class="box">
              <div class="text-subtitle !mb-0 text-gray">Orang bergabung</div>
              <div class="text-title sm mb-0 text-tosca">
                {campaign.total_donors}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
