import React from 'react';
// import { TitleBorder } from '../ui/TitleBorder';
import { dateFormatter } from '@/lib/formater';
import { TitleBorder } from '@/components/ui/TitleBorder';
import Image from 'next/image';

export const DetailProjek = ({ project }) => {
  // console.log(project);

  return (
    <>
      <TitleBorder title="Detail Projek" />

      <div className="flex justify-between py-2 mt-4">
        <div className="table-salur-column first">Nama Projek</div>
        <div className="table-salur-column text-right">{project.title}</div>
      </div>
      <div className="flex justify-between py-2">
        <div className="table-salur-column first">Lokasi</div>
        <div className="table-salur-column text-right">{project.location}</div>
      </div>
      <div className="flex justify-between py-2">
        <div className="table-salur-column first">Mitra Salur</div>
        <div className="table-salur-column text-right">
          {project.mitra?.name}
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div className="table-salur-column first">Tanggal Project</div>
        <div className="table-salur-column text-right">
          {dateFormatter(project.excecution_time)}
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div className="table-salur-column first">Jumlah Penerima </div>
        <div className="table-salur-column text-right">
          {project.beneficiary} Orang
        </div>
      </div>
      {project.activity !== 'selesai' && (
        <div>
          {project.image && (
            <div className="w-full h-auto overflow-hidden mt-3 rounded">
              <Image
                alt="project"
                src={project.image}
                width={400}
                height={400}
                className="w-full object-contain"
              />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
          />
        </div>
      )}
    </>
  );
};
