import React from 'react';
// import { TitleBorder } from '../ui/TitleBorder';
import { getReport } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { TitleBorder } from '@/components/ui/TitleBorder';

export const Salur = ({ projectId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['reportProject', projectId],
    queryFn: () => getReport({ project_id: projectId, limit: 1 }),
    enabled: Boolean(projectId), // More explicit boolean conversion
    retry: false, // Disable retry if you don't want to retry on failure
  });
  if (isLoading) return <></>;
  if (error) return <div>An error occurred: {error.message}</div>;
  const reportData = data?.data;

  // console.log(reportData);

  return (
    <>
      {reportData.length > 0 ? (
        reportData.map((report, index) => (
          <div className="donate-body-wrapper border-top" key={index}>
            <TitleBorder title="Update Salur" />
            <div className="donate-body-content pb-0 mt-3">
              <ul className="activity-timeline">
                <li>
                  <div className="donatur-row">
                    <div className="donatur-box justify-content-start">
                      <div className="image-wrap">
                        <Image
                          width={500}
                          height={500}
                          src={report?.mitra[0].image_url}
                          alt="mitra"
                        />
                      </div>
                      <div className="text-wrap">
                        <h4>{report.mitra[0].name || 'Aksiberbagi'}</h4>
                        <p>{report.date || '20-12-2024'}</p>
                      </div>
                    </div>
                  </div>
                  <Image
                    width={300}
                    height={300}
                    src={report.wa_image}
                    className="img-fluid"
                    alt="update penyaluran program renovasi masjid pelosok"
                  />
                  <h5>{report.title}</h5>
                  <p
                    dangerouslySetInnerHTML={{ __html: report.wa_caption }}
                  ></p>

                  {/* <div>
                    <h5 className="font-semibold">Data :</h5>
                    <div className="flex justify-between gap-5 border-b pb-3">
                      <p>Lokasi</p>
                      <p>Desa Lencoh, Kecamatan Selo, Boyolali, Jawa Tengah</p>
                    </div>
                    <div className="flex justify-between gap-5">
                      <p>Jumlah Penerima</p>
                      <p>15 Orang</p>
                    </div>
                  </div> */}
                </li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};
