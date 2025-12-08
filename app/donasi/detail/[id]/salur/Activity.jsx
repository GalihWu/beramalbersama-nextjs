import SpinLoading from '@/components/ui/SpinLoading';
import { getProject } from '@/service/FetchData';
import useFormStore from '@/stores/FormStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const Activity = ({ programId, programLink }) => {
  const router = useRouter();
  const { updateFormData, clearFormData } = useFormStore();

  const { data, error, isLoading } = useQuery({
    queryKey: ['ProjectSalur', programLink],
    queryFn: () => getProject({ program_link: programLink }),
    enabled: !!programLink,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    clearFormData();
  }, [clearFormData]);

  if (isLoading) return <SpinLoading />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (data?.data.length === 0) return <></>;
  const allProject = data?.data;

  const handleChange = (id, link, projectId) => {
    updateFormData({
      type: 'donation',
      program_type: 'infaq',
      items: [id],
      projects: [projectId],
    });

    router.push(`/donasi/detail/${link}/form`);
  };

  // console.log(data);
  return (
    <div className="donate-body-wrapper border-top !pb-24">
      <div className="donate-body-title">
        <h5>Proyek Salur Terbaru</h5>
      </div>
      <div className="donate-body-content pb-0 !overflow-hidden">
        <ul className="activity-timeline">
          {allProject.length > 0
            ? allProject.map((project, index) => {
                {
                  /* const projectNumber = allProject.length - index;  */
                }
                return (
                  <li key={index} className="bg-gray">
                    <div className="donatur-row">
                      <div className="donatur-box justify-content-start">
                        <div className="image-wrap">
                          <Image
                            width={500}
                            height={500}
                            src={project.mitra.image}
                            alt="Donatur"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">
                            {project.mitra.name}
                          </h4>
                          <div className="text-sm text-gray">
                            {project.excecution_time}
                          </div>
                          <strong class="text-cyan">
                            {project.activity === 'active open'
                              ? 'Proyek Sedang Tergalang'
                              : project.activity === 'selesai'
                              ? 'Proyek Selesai'
                              : 'Proyek akan/sudah Tergalang'}
                          </strong>
                        </div>
                      </div>
                    </div>
                    {project.image && (
                      <Image
                        width={300}
                        height={300}
                        src={project.image}
                        className="img-fluid"
                        alt="Update penyaluran program renovasi masjid pelosok"
                      />
                    )}
                    <h6>{project.title}</h6>
                    {/* <h6>
                      Project-ke {projectNumber}: {project.title}
                    </h6> */}
                    <p
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    ></p>
                    {project.activity === 'active open' && (
                      <a
                        className="btn button-cyan"
                        onClick={() =>
                          handleChange(programId, programLink, project?.id)
                        }
                      >
                        Donasi Untuk Proyek Ini
                      </a>
                    )}
                  </li>
                );
              })
            : renderEmptyState()}
        </ul>
      </div>
    </div>
  );
};
