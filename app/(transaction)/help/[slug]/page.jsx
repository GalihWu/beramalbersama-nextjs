'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCopy, FaInfoCircle } from 'react-icons/fa';

import Header from '@/components/ui/header';
import { currencyFormatter } from '@/lib/formater';
import { getTransactionInvoice } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/context/ToastContext';
import Skeleton from '@/components/ui/skeleton/skeleton';

const DonasiHelp = ({ params }) => {
  const showToast = useToast();
  const { data, error, isLoading } = useQuery({
    queryKey: ['invoice', params.slug],
    queryFn: async () =>
      await getTransactionInvoice({ transaction: params.slug }),
    enabled: !!params.slug,
  });

  // console.log(data);
  const [donationAmount, setDonationAmount] = useState(0);
  const [payment, setPayment] = useState('');

  useEffect(() => {
    if (data) {
      setPayment(data.data.payment_method);
      setDonationAmount(data.data.nominal);
    }
  }, [data]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast('Disalin ke Clipboard');
      })
      .catch((err) => {
        console.error('Gagal menyalin: ', err);
      });
  };

  if (isLoading)
    return (
      <>
        <Header type="title" text="Panduan Pembayaran" />
        <div className="content-wrapper bg-grey">
          <div className="container">
            <div className="box-content">
              <div className="payment-white-wrapper pb-0">
                <Skeleton className="w-[30%] h-5 my-5" />

                <div className="flex justify-between px-4 py-4 bg-gray-100 mb-4">
                  <Skeleton className="h-8 w-[40%]" />
                  <Skeleton className="w-8 h8 rounded-md" />
                </div>
                <div className="flex justify-between px-4 py-4 bg-gray-100">
                  <Skeleton className="h-8 w-[40%]" />
                  <Skeleton className="w-8 h8 rounded-md" />
                </div>

                <div className="payment-note">
                  <Skeleton className="w-[60%] h-3 mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <Header type="title" text="Panduan Pembayaran" />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body donasi-help-content">
              <div className="payment-white-wrapper pb-0">
                <div className="payment-header">
                  <p>Transfer Bank</p>
                  <Image
                    width={100}
                    height={100}
                    className="w-full"
                    alt=""
                    src={payment.image_url}
                  />
                </div>
                {payment.account_number !== 0 && (
                  <div className="payment-account">
                    <div>
                      <h6>{payment.account_behalf}</h6>
                      <p>{payment.account_number}</p>
                    </div>
                    <div
                      className="btn text-green border border-gray-500 rounded-md"
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={() => copyToClipboard(payment.account_number)}
                    >
                      <FaCopy width={20} height={20} />
                    </div>
                  </div>
                )}
                <div className="payment-nominal">
                  <div>
                    <h6>Jumlah donasi</h6>
                    <p>{currencyFormatter(donationAmount)}</p>
                  </div>
                  <div
                    className="btn text-green border border-gray-500 rounded-md"
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => copyToClipboard(donationAmount)}
                  >
                    <FaCopy />
                  </div>
                </div>
                <div className="alert alert-warning alert--icon" role="alert">
                  <p className="flex sm:gap-3 gap-2 items-center">
                    <FaInfoCircle className="sm:w-6 w-12 h-full" />
                    <span>
                      <b>PENTING!</b> Mohon transfer tepat sampai 3 angka
                      terakhir agar donasi terverifikasi otomatis
                    </span>
                  </p>
                </div>
                <p className="payment-note">
                  *Jumlah akan didonasikan hingga 3 digit terakhir
                </p>
              </div>
            </div>
            <div className="content-body donasi-help-content border-top">
              <p className="text-title mb-3">Panduan Pembayaran</p>
              <ol>
                <li>
                  Lakukan pembayaran melalui ATM / mobile banking / internet
                  banking / SMS banking / kantor bank terdekat.
                </li>
                <li>
                  Isi <strong>nomor rekening</strong> tujuan sesuai yang ada di
                  halaman pembayaran <strong>(a.n Yayasan Aksi Berbagi)</strong>
                  .
                </li>
                <li>
                  Masukan <strong>nominal donasi</strong> sesuai jumlah
                  donasimu, termasuk <strong>3 digit terakhir</strong>
                </li>
                <li>
                  Pembayaran akan diverifikasi oleh Kitabisa. Waktu verikasi
                  paling lambat 1x24 jam untuk sesama bank, dan 2x24 jam dihari
                  kerja jika antar bank yang berbeda.
                </li>
              </ol>
              <div className="card-help-payment">
                <div className="head">
                  <Image
                    width={500}
                    height={500}
                    src="/img/icons/credit-card.svg"
                    className="w-14"
                    alt=""
                  />
                  <div className="texts">
                    <h6>
                      Bayar pakai Virtual Account untuk transaksi selanjutnya
                      ya! Kenapa?
                    </h6>
                  </div>
                </div>
                <div className="body">
                  <ul className="list-unstyled">
                    <li>
                      <p className="text-sub">Bebas biaya transfer</p>
                      <p>Tidak ada tambahan kode unik ke jumlah donasi</p>
                    </li>
                    <li>
                      <p className="text-sub">Verifikasi lebih cepat</p>
                      <p>Pembayaran terverifikasi otomatis</p>
                    </li>
                    <li>
                      <p className="text-sub">Pembayaran lebih mudah</p>
                      <p>Tidak perlu upload bukti transfer</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-help-payment">
                <div className="head">
                  <Image
                    width={500}
                    height={500}
                    src="/img/icons/balance-wallet.svg"
                    className="w-14"
                    alt=""
                  />
                  <div className="texts">
                    <h6>Pembayaran terjamin</h6>
                    <p>
                      Aksi Berbagi menjamin keamanan dana yang kamu bayarkan
                      ditiap transaksi.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-help-payment">
                <div className="head">
                  <Image
                    width={500}
                    height={500}
                    src="/img/icons/fact-check.svg"
                    className="w-14"
                    alt=""
                  />
                  <div className="texts">
                    <h6>Jaga keamanan datamu</h6>
                    <p>
                      Jangan menyebarkan bukti &amp; data pembayaran ke pihak
                      manapun kecuali Kitabisa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonasiHelp;
