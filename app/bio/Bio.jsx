'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Legalitas } from '@/components/ui/legalitas';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReport } from '@/service/FetchData';
import Link from 'next/link';
import { currencyFormatter } from '@/lib/formater';
import SpinLoading from '@/components/ui/SpinLoading';
import { Blogs } from './blogs';

const Bio = ({ programShow }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const {
    data: reportData,
    error: reportError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: reportStatus,
  } = useInfiniteQuery({
    queryKey: ['allReport'],
    queryFn: ({ pageParam = 1 }) =>
      getReport({ limit: 3, mode: 'pagination', page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    initialPageParam: 1,
  });

  const loadMore = () => {
    fetchNextPage();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (reportError) {
    return (
      <div className="text-center py-10">Error: {reportError?.message}</div>
    );
  }

  const donation = programShow?.data || [];
  const allReports = reportData?.pages.flatMap((page) => page.data.data) || [];

  return (
    <div className="bg-gray">
      <div className="container flex flex-col space-y-8 ">
        <div className="bg-white px-4 py-8 rounded-md ">
          {/* logo */}
          <div className="max-w-[260px] mx-auto mt-12 mb-6">
            <Image
              alt="brand_logo"
              className="h-auto w-full"
              src="/img/logo-akber-green.webp"
              width={300}
              height={300}
            />
          </div>

          {/* content */}
          <div>
            <div className="text-center flex flex-col">
              <p className="font-semibold text-base md:text-lg">
                Resmi dan Terpercaya Sejak 2020.
              </p>{' '}
              <p className="mx-2">
                Berhasil menyalurkan{' '}
                <b>lebih dari 900 Program dan 100rb lebih</b> &nbsp; donatur
                telah bergabung menjadi{' '}
                <span className="font-semibold text-primary-500">
                  {' '}
                  #SahabatBerbagi!
                </span>
                Yuk ambil bagian dan bergabung bersama untuk menciptakan lebih
                banyak senyuman!
              </p>
            </div>

            <Legalitas />

            <div>
              <h2 className="text-base md:text-lg font-semibold">
                REKOMENDASI PROGRAM BULAN INI
              </h2>
              <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 p-0">
                  {donation?.slice(0, 4).map((campaign, index) => (
                    <li key={index} id="card-donasi-mendesak">
                      <Link
                        className="card-campaign-column"
                        href={`/donasi/detail2/${campaign.link}?reff_code=BANKAI`}
                      >
                        <div
                          className="card-campaign-image"
                          style={{
                            backgroundImage: `url("${campaign.image}")`,
                          }}
                        />
                        <div
                          className="card-campaign-text"
                          style={{ width: '100%' }}
                        >
                          <div className="card-campaign-title">
                            {campaign.title}
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${campaign.progress_achieved}%`,
                              }}
                              aria-valuenow={campaign.progress_achieved}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="card-campaign-nominal">
                            <div className="text-left">
                              <p>Terkumpul</p>
                              <h5>
                                {currencyFormatter(campaign.nominal_achieved)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* report */}
        <div className="bg-white px-4 pt-8 rounded-md container mb-40 pb-40">
          <div className="donate-body-content pb-0 !overflow-hidden">
            <div className="text-base md:text-xl font-medium mb-3">
              Dampak Kebaikan Donasi Anda
            </div>
            <ul className="activity-timeline relative">
              {reportStatus === 'pending' ? (
                <SpinLoading />
              ) : allReports.length > 0 ? (
                allReports.slice(0, visibleCount).map((project) => (
                  <li key={project.id}>
                    <div className="donatur-row">
                      <div className="donatur-box justify-content-start">
                        <div className="image-wrap ">
                          <Image
                            width={500}
                            height={500}
                            src={project.mitra[0].image_url}
                            alt="Donatur"
                          />
                        </div>
                        <div className="text-wrap">
                          <h4>{project.mitra[0].name}</h4>
                          <p>{project.date}</p>
                          <strong className="text-cyan">
                            {project.type === 'Final'
                              ? 'Selesai Tersalurkan'
                              : project.type}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <Image
                      width={500}
                      height={500}
                      src={
                        project.image ??
                        project.wa_image ??
                        project.kegiatan?.image
                      }
                      className="img-fluid"
                      alt="img report"
                    />
                    <h6>{project.project.title}</h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          project.kegiatan?.deskripsi ?? project.wa_caption,
                      }}
                    ></p>
                  </li>
                ))
              ) : (
                <p>Tidak ada laporan tersedia</p>
              )}
            </ul>
            {hasNextPage && (
              <div className="d-flex justify-content-center mb-5">
                <button
                  className="btn button-link color-cyan"
                  onClick={loadMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? <SpinLoading /> : 'Lihat lebih banyak'}
                </button>
              </div>
            )}
          </div>

          <Blogs />

          <div className="w-full flex flex-col gap-3 justify-center items-center mb-20">
            <p className="text-center">
              Ada Pertanyaan atau Butuh Bantuan?
              <br /> Jangan Ragu Hubungi Kami
            </p>
            <Link
              href={'https://wa.link/zkejwt'}
              target="_blank"
              className="px-4 py-2 rounded-md text-primary-500 border-2 border-primary-500 font-semibold hover:text-white hover:bg-primary-500 transition duration-200 "
            >
              Hubungi kami
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
