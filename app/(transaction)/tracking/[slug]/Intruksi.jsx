import { currencyFormatter } from '@/lib/formater';
import React from 'react';

export const Intruksi = ({ nominal }) => {
  const totalDonation = nominal.slice(0, -3) + '000';
  const uniqCode = nominal.slice(-3);

  return (
    <div
      id="flush-collapseOne"
      className="accordion-collapse"
      aria-labelledby="flush-headingOne"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        <div className="status-box bg-grey mb-0">
          <div className="table-salur-row">
            <div className="table-salur-column">Jumlah Donasi</div>
            <div className="table-salur-column">
              {currencyFormatter(totalDonation)}
            </div>
          </div>
          <div className="table-salur-row">
            <div className="table-salur-column">Kode Unik (*)</div>
            <div className="table-salur-column">
              {currencyFormatter(uniqCode)}
            </div>
          </div>
        </div>
        <p className="text-note mt-2">* 3 angka terakhir akan didonasikan</p>
      </div>
    </div>
  );
};
