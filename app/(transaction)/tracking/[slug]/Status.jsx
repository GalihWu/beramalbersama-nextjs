import React, { useEffect, useState } from 'react';
// import { TitleBorder } from '../ui/TitleBorder';
import { currencyFormatter, dateFormatter } from '@/lib/formater';
import { TitleBorder } from '@/components/ui/TitleBorder';

import Cookies from 'js-cookie';

export const Status = ({ paymentDetail, nominal, status, date }) => {
  const [authToken, setAuthToken] = useState(null);
  const getStatusPembayaran = (status) => {
    return status === 'Canceled'
      ? '#Transaksi Dibatalkan'
      : status == 'Pending'
      ? '#MENUNGGU PEMBAYARAN'
      : '#SUDAH DIBAYAR';
  };

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    setAuthToken(token);
  }, []);
  // console.log(paymentDetail);
  return (
    <div>
      <TitleBorder title="Detail Pembayaran" />
      <div className="status-box mt-4">
        <div className="table-salur-row">
          {/* <div className="table-salur-column first">Metode Pembayaran</div> */}
          <div className="table-salur-column text-right">
            {paymentDetail.bank}
          </div>
        </div>
        {/* <div className="table-salur-row">
          <div className="table-salur-column first">No Rekening</div>
          <div className="table-salur-column text-right">
            {paymentDetail.name}
            {'  '}
            {paymentDetail.account_number === '0'
              ? '-'
              : paymentDetail.account_number}
          </div>
        </div> */}
        <div className="table-salur-row">
          <div className="table-salur-column first">Metode Pembayaran</div>
          <div className="table-salur-column text-right">
            {paymentDetail.name}&nbsp;&nbsp;&nbsp;
            {paymentDetail.account_number === '0'
              ? ''
              : paymentDetail.account_number}
          </div>
        </div>
        <div className="table-salur-row">
          <div className="table-salur-column first">Nominal</div>
          <div className="table-salur-column text-right">
            {currencyFormatter(nominal)}
          </div>
        </div>
        <div className="table-salur-row">
          <div className="table-salur-column first">Tanggal Donasi</div>
          <div className="table-salur-column text-right">
            {dateFormatter(date)}
          </div>
        </div>

        <div className="table-salur-row">
          <div className="table-salur-column first">Status Pembayaran</div>
          <div className="table-salur-column text-right">
            <span
              className={
                status === 'Pending' || status === 'Canceled'
                  ? 'text-red-500'
                  : 'text-green'
              }
            >
              {getStatusPembayaran(status)}
            </span>
          </div>
        </div>
        {/* <div className="table-salur-row">
          <div className="table-salur-column first">Status Salur</div>
          <div className="table-salur-column flex justify-end">
            <span
              className={status === "Pending" ? "text-red-500" : "text-green"}
            >
              {status === "Pending" ? "-" : status}
            </span>
          </div>
        </div> */}
        {status === 'Pending' && authToken
          ? // <button className="btn button-border-cyan w-100 my-3">
            //   Hapus Donasi
            // </button>
            ''
          : ''}
      </div>
    </div>
  );
};
