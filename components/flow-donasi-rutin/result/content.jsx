import React, { useEffect, useState } from 'react';
import {
  currencyFormatter,
  dateFormatter,
  formatTimeToWIB,
} from '@/lib/formater';

const frequencyMap = {
  daily: { frequency: 'Harian', type: '' },
  weekly: { frequency: 'Mingguan', type: 'Hari' },
  monthly: { frequency: 'Bulanan', type: 'Tanggal' },
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between mb-[8px]">
    <div className="w-1/2">
      <p className="!m-0 sm:text-[14px] text-[12px] text-[#4d4d4d] font-semibold">
        {label}:
      </p>
    </div>
    <div className="w-1/2">
      <p className="!m-0 sm:text-[14px] text-[12px] text-[#4d4d4d] text-end">
        {value}
      </p>
    </div>
  </div>
);

export default function DonasiRutinResultContent({ detail }) {
  const {
    nominal,
    status,
    range,
    time,
    range_type,
    summary,
    commitment,
    invoicing,
    created_at,
  } = detail;

  const [days, setDays] = useState('');
  const daysTranslation = {
    Monday: 'Senin',
    Tuesday: 'Selasa',
    Wednesday: 'Rabu',
    Thursday: 'Kamis',
    Friday: 'Jumat',
    Saturday: 'Sabtu',
    Sunday: 'Minggu',
  };

  function translateDays(day) {
    return daysTranslation[day];
  }

  useEffect(() => {
    if (range_type == 'weekly') {
      const newDays = translateDays(range);
      setDays(newDays);
    } else {
      setDays(range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, range_type]);

  const { frequency, type } = frequencyMap[detail.range_type] || {
    frequency: '',
    type: '',
  };
  console.log(type, days);

  return (
    <>
      <div className="bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto border-t-[10px] border-solid border-[#f7f7f7]">
        <InfoRow
          label="Dijadwalkan mulai tanggal"
          value={dateFormatter(created_at)}
        />
        <InfoRow label="Frekuensi" value={frequency} />

        <InfoRow label="Tiap Pukul" value={formatTimeToWIB(time)} />
        <InfoRow
          label="Metode Pembayaran"
          value={commitment === null ? 'Saku Berbagi' : 'Bayar Langsung'}
        />
        {/* {range_type !== 'daily' && <InfoRow label={type} value={days} />} */}
        <InfoRow label="Nominal per Hari" value={currencyFormatter(nominal)} />
        <InfoRow
          label="Sudah Berapa Hari"
          value={summary.frekuensi_donasi + ' Hari'}
        />
        {commitment !== null && (
          <InfoRow label="Durasi Total" value={`${commitment} Hari`} />
        )}
        <InfoRow
          label="Status"
          value={
            <p
              className={`!m-0 font-bold sm:text-[16px] text-[14px] text-[#4d4d4d] text-end ${
                status === 'active' ? 'text-cyan' : 'text-red-600'
              }`}
            >
              {status === 'active' ? 'Aktif' : 'Nonaktif'}
            </p>
          }
        />
        {invoicing !== null && invoicing.status === 'Pending' ? (
          <div className="flex justify-between border-t border-dashed border-[#919191] pt-[20px] mt-[14px]">
            <div className="w-1/2">
              <p className="!m-0 sm:text-[14px] text-[14px] text-[#4d4d4d] font-semibold">
                Total Yang Perlu Dibayarkan:
              </p>
            </div>
            <div className="w-1/2">
              <p className="!m-0 sm:text-[14px] text-[14px] text-[#4d4d4d] font-bold text-end">
                {currencyFormatter(invoicing.total)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between border-t border-dashed border-[#919191] pt-[20px] mt-[14px]">
            <div className="w-1/2">
              <p className="!m-0 sm:text-[14px] text-[14px] text-[#4d4d4d] font-semibold">
                Total Yang Didonasikan:
              </p>
            </div>
            <div className="w-1/2">
              <p className="!m-0 sm:text-[14px] text-[14px] text-[#4d4d4d] font-bold text-end">
                {currencyFormatter(summary.total_donasi)}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
