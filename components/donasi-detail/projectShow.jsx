import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TitleBorder } from '../ui/TitleBorder';
import { EmptyData } from '../ui/emptyData';
import { dateFormatter } from '@/lib/formater';

export const ProjectShow = ({ project, programLink }) => {
  // console.log(project);
  return (
    <>
      <div className="donate-body-wrapper" id="donateActivity">
        <div className="donate-body-title">
          <TitleBorder title="Proyek Sedang Tergalang" />
        </div>
        <div className="donate-body-content !max-h-[600px] !overflow-hidden">
          <ul className="activity-timeline ">
            {project ? (
              <li className="!bg-primary-200/20">
                <div className="donatur-row">
                  <div className="donatur-box justify-content-start">
                    <div className="image-wrap !min-w-[45px]">
                      <Image
                        width={500}
                        height={500}
                        src={project.mitra.image}
                        alt="Donatur"
                      />
                    </div>
                    <div className="text-wrap !w-full ">
                      <h4>{project.mitra.name || 'Aksiberbagi'}</h4>
                      <p>{dateFormatter(project.excecution_time)}</p>
                    </div>
                  </div>
                </div>
                {project.image && (
                  <div className="w-full h-auto overflow-hidden">
                    <Image
                      src={project.image}
                      alt="projectshow"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                )}
                <h6>{project.title}</h6>
                <div>
                  <span style={{ fontSize: '11px' }}>
                    <span style={{ fontFamily: 'Arial,sans-serif' }}>
                      <span style={{ color: '#000000' }}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: project.description,
                          }}
                        ></p>
                      </span>
                    </span>
                  </span>
                </div>
              </li>
            ) : (
              <EmptyData title="Belum ada Proyek" />
            )}
          </ul>

          {project && (
            <div className="action-more">
              <Link
                id="salur-selengkapnya"
                href={{
                  pathname: `/donasi/detail/${programLink}/salur`,
                }}
                className="btn-tosca"
              >
                Lihat Proyek Selengkapnya
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
