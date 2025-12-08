import { getProgramByLink, getReport } from '@/service/FetchData';
import useFormStore from '@/stores/FormStore';
import { useQueries } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const ReportActivity = ({ programId }) => {
  const { updateFormData } = useFormStore();
  const router = useRouter();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['ProjectReport', programId],
        queryFn: () => getReport({ program_link: programId }),
        enabled: !!programId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
      {
        queryKey: ['programDetail', programId],
        queryFn: () => getProgramByLink(programId),
        enabled: !!programId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    ],
  });

  const [reportQuery, detailProgramQuery] = queries;

  if (reportQuery.isLoading || detailProgramQuery.isLoading) return <></>;
  if (reportQuery.error || detailProgramQuery.isLoading)
    return <div>An error occurred: {error.message}</div>;

  const allProject = reportQuery?.data.data || [];
  const allNews = reportQuery?.data.news || [];
  const detailDonasi = detailProgramQuery?.data.data;

  const handleDonation = (id, link) => {
    updateFormData({
      type: 'donation',
      program_type: 'infaq',
      items: [id],
    });

    router.push(`/donasi/detail/${link}/form?id=${id}`);
  };

  return (
    <div className="donate-body-wrapper border-top !pb-28">
      <div className="donate-body-title">
        <h5>Laporan Terbaru</h5>
      </div>
      <div className="donate-body-content pb-0 !overflow-hidden">
        <ul className="activity-timeline">
          {allProject.length > 0 ? (
            allProject.map((project) => {
              // const projectNumber = allProject.length - index; // Calculate x (last to 1)
              return (
                <li key={project.id}>
                  <div className="donatur-row">
                    <div className="donatur-box justify-content-start">
                      <div className="image-wrap !min-w-[45px]">
                        <Image
                          width={500}
                          height={500}
                          src={project.mitra[0].image_url}
                          alt="mitra logo"
                        />
                      </div>
                      <div className="text-wrap !w-full">
                        <h4>{project.mitra[0].name}</h4>
                        <p>{project.date}</p>
                        <strong class="text-cyan">
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
                  {/* {project.ig_embed ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: project.ig_embed }}
                      />
                    ) : ( */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: project.kegiatan?.deskripsi ?? project.wa_caption,
                    }}
                  ></p>
                  {/* )} */}

                  {project.activity === 'active open' && (
                    <a className="btn button-cyan">Donasi</a>
                  )}
                </li>
              );
            })
          ) : (
            <></>
          )}

          {/* news -> data tambahan */}
          {allNews.length > 0 ? (
            allNews.map((project) => {
              // const projectNumber = allProject.length - index; // Calculate x (last to 1)
              return (
                <li key={project.id}>
                  <div className="donatur-row">
                    <div className="donatur-box justify-content-start">
                      <div className="image-wrap">
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
                        <strong class="text-cyan">{project.type}</strong>
                      </div>
                    </div>
                  </div>
                  <Image
                    width={500}
                    height={500}
                    src={project.image}
                    className="img-fluid"
                    alt="img report"
                  />
                  <h6>{project.title}</h6>
                  {/* {project.ig_embed ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: project.ig_embed }}
                      />
                    ) : ( */}
                  <p dangerouslySetInnerHTML={{ __html: project.content }}></p>
                  {/* )} */}

                  {project.activity === 'active open' && (
                    <a className="btn button-cyan">Donasi</a>
                  )}
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className={`donate-sticky animate-fade-ups`}>
        <div className="container">
          <div className="donate-sticky-content shadow-sm flex gap-3">
            {detailDonasi.status === 'PUBLISH' ? (
              <button
                id="btn-donasi-sekarang"
                className="btn button-orange !font-medium !text-base md:!text-lg cursor-pointer !w-full"
                onClick={() =>
                  handleDonation(detailDonasi.id, detailDonasi.link)
                }
              >
                Donasi Sekarang
              </button>
            ) : (
              <button
                className="btn button-cyan cursor-pointer"
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
    </div>
  );
};
