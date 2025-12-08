import Image from 'next/image';
import React from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { TitleBorder } from '../ui/TitleBorder';
import { currencyFormatter, initialName } from '@/lib/formater';
import Link from 'next/link';
import { EmptyData } from '../ui/emptyData';

export const Fundraiser = ({ programLink, fundraiser }) => {
  return (
    <>
      <div className="donate-body-wrapper" id="donateFr">
        <div className="black-card">
          <div className="donate-body-title">
            {/* <TitleBorder title={'Fundraiser'} amount={totalFr} /> */}
            <TitleBorder title={'Fundraiser'} amount={fundraiser.total} />
            <Link
              id="semua-fundraiser"
              href={`/donasi/detail/${programLink}/donatur-all`}
              className="button-link"
            >
              <span className="text flex gap-1 items-center text-green">
                Lihat Semua <FaCaretRight />
              </span>
            </Link>
          </div>
          <div className="donate-body-content pb-0">
            {fundraiser.data[0] ? (
              fundraiser.data.map((fundraiser) => (
                <div className="donatur-row" key={fundraiser.id}>
                  <div className="donatur-box justify-content-start">
                    <div className="image-wrap">
                      <h4 className="!text-white text-lg">
                        {initialName(fundraiser.name)}
                      </h4>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-lg md:text-xl font-medium">
                        {fundraiser.name}
                      </h4>
                      <p className="mt-0">
                        Mengajak{' '}
                        <strong>{fundraiser.total_donatur} orang </strong>
                        berinfak
                      </p>
                      <h6 className="text-green">
                        {currencyFormatter(fundraiser.total_donasi)}
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyData title="Fundraiser" desc="Belum ada fundraiser" />
            )}
          </div>
        </div>
      </div>
      <div className="donate-body-wrapper" style={{ padding: '0px 20px' }}>
        <Link href={'/login'}>
          <Image
            width={400}
            height={400}
            alt=""
            className="w-full"
            src="/img/banner/JadiFundraiser.webp"
          />
        </Link>
      </div>
    </>
  );
};
