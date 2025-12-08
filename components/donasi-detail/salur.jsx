import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TitleBorder } from '../ui/TitleBorder';
import { EmptyData } from '../ui/emptyData';

export const Salur = ({ salur, programLink }) => {
  const reportData = salur?.data[0];
  const reportNews = salur?.news[0];

  // console.log(salur);

  return (
    <>
      <div className="donate-body-wrapper" id="donateActivity">
        <div className="donate-body-title">
          <TitleBorder title="Laporan Penyaluran" />
        </div>
        <div className="donate-body-content !max-h-[600px] !overflow-hidden">
          <ul className="activity-timeline ">
            {reportData ? (
              <li className="!bg-primary-200/20">
                <div className="donatur-row">
                  <div className="donatur-box justify-content-start">
                    <div className="image-wrap !min-w-[45px]">
                      <Image
                        width={500}
                        height={500}
                        src={reportData.mitra[0].image_url}
                        alt="Donatur"
                      />
                    </div>
                    <div className="text-wrap !w-full">
                      <h4>{reportData.mitra[0].name || 'Aksiberbagi'}</h4>
                      <p>{reportData.date || '20-12-2024'}</p>
                    </div>
                  </div>
                </div>
                <Image
                  width={500}
                  height={500}
                  src={
                    reportData.image ??
                    reportData.wa_image ??
                    reportData.kegiatan?.image
                  }
                  className="img-fluid hidden"
                  alt="img report"
                />
                <h6>{reportData.project.title}</h6>
                <div>
                  <span style={{ fontSize: '11pt' }}>
                    <span style={{ fontFamily: 'Arial,sans-serif' }}>
                      <span style={{ color: '#000000' }}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              reportData.kegiatan.deskripsi ??
                              reportData.wa_caption,
                          }}
                        ></p>
                      </span>
                    </span>
                  </span>
                </div>
              </li>
            ) : reportNews ? (
              <li className="!bg-primary-200/20">
                <div className="donatur-row">
                  <div className="donatur-box justify-content-start">
                    <div className="image-wrap" style={{ width: 'auto' }}>
                      <Image
                        width={500}
                        height={500}
                        src={reportNews.mitra[0].image_url}
                        alt="Donatur"
                      />
                    </div>
                    <div className="text-wrap">
                      <h4>{reportNews.mitra[0].name || 'Aksiberbagi'}</h4>
                      <p>{reportNews.date || '20-12-2024'}</p>
                    </div>
                  </div>
                </div>
                <h6>{reportNews.title}</h6>
                <div>
                  <span style={{ fontSize: '11pt' }}>
                    <span style={{ fontFamily: 'Arial,sans-serif' }}>
                      <span style={{ color: '#000000' }}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: reportNews.content,
                          }}
                        ></p>
                      </span>
                    </span>
                  </span>
                </div>
              </li>
            ) : (
              <EmptyData title="Belum ada Laporan Penyaluran" />
            )}
          </ul>

          {(reportData || reportNews) && (
            <div className="action-more">
              <Link
                id="salur-selengkapnya"
                href={{
                  pathname: `/donasi/detail/${programLink}/report`,
                }}
                className="btn-tosca"
              >
                Lihat Dampak Kebaikanmu Selengkapnya
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
