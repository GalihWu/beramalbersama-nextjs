'use client';

import Header from '@/components/ui/header';
import { ReportActivity } from './ReportActivity';

const DonasiDetailReport = ({ params }) => {
  return (
    <>
      <Header type="title" text="Laporan Penyaluran" />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <ReportActivity programId={params.id} />
        </div>
      </div>
    </>
  );
};

export default DonasiDetailReport;
