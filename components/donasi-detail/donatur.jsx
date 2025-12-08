import React from 'react';
import { FaCaretRight } from 'react-icons/fa';

import { TitleBorder } from '@/components/ui/TitleBorder';
import Link from 'next/link';

import { DonaturList } from '@/components/ui/donaturList';

export const Donatur = ({ donatur, programLink }) => {
  return (
    <div className="donate-body-wrapper" id="donateUser ">
      <div className="black-card">
        <div className="donate-body-title">
          <TitleBorder title={'Donatur'} amount={donatur.total} />
          <Link
            id="semua-donatur"
            href={`/donasi/detail/${programLink}/donatur-all`}
            className="button-link"
          >
            <span className="text-green flex gap-1 items-center">
              Lihat Semua <FaCaretRight />
            </span>
          </Link>
        </div>
        <div className="donate-body-content pb-0">
          {donatur.data.slice(0, 3).map((donor) => (
            <DonaturList
              key={donor.id}
              donor={donor}
              programLink={programLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
