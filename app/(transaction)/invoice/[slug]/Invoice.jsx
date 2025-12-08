'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  FaAngleRight,
  FaCopy,
  // FaFacebookF,
  FaInfoCircle,
  FaStopwatch,
  FaWhatsapp,
} from 'react-icons/fa';
import Header from '@/components/ui/header';

import { currencyFormatter, fullDayFormatter } from '@/lib/formater';
import { useToast } from '@/context/ToastContext';
import { Navbar } from '@/components/ui/navbar';
import { useRouter } from 'next/navigation';
// import GTMPageViewLoader from "@/components/global/GTMPageViewLoader";
import { GTMSendDataLayer } from '@/components/global/GTMSendDataLayer';
import { GTMInfoPurchase } from '@/components/global/GTMInfoPurchase';

const Invoice = ({ invoice, slug }) => {
  const showToast = useToast();
  const router = useRouter();

  const [donationAmount, setDonationAmount] = useState(0);
  const [payment, setPayment] = useState({});

  useEffect(() => {
    if (
      !invoice?.data ||
      !invoice.data.items ||
      invoice.data.items.length === 0
    ) {
      return;
    }

    const isNotEvent = invoice.data.items[0].detail_type !== 'event';
    const isPaid = invoice.data.status === 'Paid';

    if (isNotEvent && isPaid) {
      router.push(`/tracking/${slug}`);
    }
  }, [slug, router, invoice]);

  // useEffect(() => {
  //   if (!invoice?.data?.total || !invoice?.data?.invoice) return;

  //   // Tunda eksekusi GTM hingga benar-benar di client
  //   const timer = setTimeout(() => {
  //     GTMSendDataLayer(invoice.data.total, invoice.data.invoice);
  //     GTMInfoPurchase(invoice.data.total, invoice.data.invoice);
  //   }, 100); // delay kecil untuk pastikan DOM dan GTM siap

  //   return () => clearTimeout(timer);
  // }, [invoice]);

  useEffect(() => {
    // Validasi data lengkap
    if (!invoice?.data?.total || !invoice?.data?.invoice) return;

    const total = invoice.data.total;
    const transactionId = invoice.data.invoice;

    const sendTracking = () => {
      // 1. Kirim ke Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        GTMSendDataLayer(total, transactionId);
      }

      // 2. Kirim ke GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        GTMInfoPurchase(total, transactionId);
      }
    };

    const timer = setTimeout(sendTracking, 500);

    // Opsional: Redirect setelah tracking terkirim
    const redirectTimer = setTimeout(() => {
      if (invoice.data.payment_url) {
        router.push(invoice.data.payment_url);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [invoice, router]);

  useEffect(() => {
    // kemudian lakukan redirect
    const url = invoice.data.payment_url;
    if (url) {
      setTimeout(() => router.push(url), 1500);
    }
  }, [invoice, router]);

  useEffect(() => {
    if (invoice) {
      setPayment(invoice.data.payment_method);
      setDonationAmount(invoice.data.nominal);
    }
  }, [invoice]);

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

  return (
    <>
      <Header type="notshare" text="Intruksi Pembayaran" />
      {/* <GTMPageViewLoader
        purchase={invoice?.data.total}
        uuid={invoice?.data.invoice}
      /> */}
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            {payment.name !== 'OVO' && donationAmount !== 0 && (
              <div className="payment-cyan-wrapper">
                <h6>Batas waktu pembayaran</h6>
                <div className="d-flex justify-content-between">
                  <p>{fullDayFormatter(invoice?.data.last_payment_time)}</p>
                  <p>
                    <input
                      id="dateTime"
                      type="text"
                      className="hidden"
                      defaultValue="Jan 30, 2022 06:00:00"
                    />
                    <FaStopwatch /> <span id="timeCounter" />
                  </p>
                </div>
              </div>
            )}
            {donationAmount === 0 ? (
              <div className="payment-white-wrapper pb-6 flex flex-col items-center text-center ">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4 mt-16">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  Selamat!
                </h3>
                <p className="text-gray-600 md:text-lg text-sm mt-1">
                  Anda sudah{' '}
                  <span className="font-medium text-green-600">terdaftar</span>{' '}
                  sebagai Peserta Event
                </p>
              </div>
            ) : (
              <div className="payment-white-wrapper pb-0">
                <div className="payment-header !max-h-[60px]">
                  <p>Transfer via</p>
                  <Image
                    width={500}
                    height={500}
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
                {payment.name !== 'OVO' && (
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
                )}

                <div className="alert alert-warning alert--icon" role="alert">
                  <p className="flex sm:gap-3 gap-2 items-center">
                    <FaInfoCircle className="sm:w-6 w-12 h-full" />
                    {payment.name !== 'OVO' ? (
                      <span>
                        <b>PENTING!</b> Mohon transfer tepat sampai 3 angka
                        terakhir agar donasi terverifikasi otomatis
                      </span>
                    ) : (
                      <span>
                        <b>PENTING</b> Mohon untuk cek aplikasi OVO anda sesuai
                        dengan nomor Donatur
                      </span>
                    )}
                  </p>
                </div>
                <p className="payment-note">
                  *Jumlah akan didonasikan hingga 3 digit terakhir
                </p>
                <div className="payment-footer">
                  {invoice?.data.items[0].program?.link === 'infaq' ||
                  invoice?.data.items[0].program == null ? null : (
                    <a
                      id="btn-tracking-donasi"
                      href={`/tracking/${slug}`}
                      className="btn button-cyan"
                    >
                      Tracking Donasi
                    </a>
                  )}
                  <a
                    id="btn-cara-pembayaran"
                    href={`/help/${slug}`}
                    className="btn button-white mb-0"
                  >
                    Cara Pembayaran <FaAngleRight className="icon-right-fix" />
                  </a>
                </div>
              </div>
            )}
            <div className="content-body border-top">
              <p className="text-title text-center mb-4">
                Ada yang ingin ditanyakan?
              </p>
              <ul className="donate-share-links">
                {/* <li>
                  <a
                    href="https://www.facebook.com/aksiberbagidotcom"
                    className="btn button-fbook btn-block mb-3"
                    target="_blank"
                  >
                    <FaFacebookF className="icon-left-fix" /> Bagikan ke
                    Facebook
                  </a>
                </li> */}

                <li>
                  <a
                    href="https://api.whatsapp.com/send?phone=6281912344745&text=Assalamu%27alaikum"
                    className="btn button-green !bg-[#31d24e] btn-block mb-3"
                    target="_blank"
                  >
                    <FaWhatsapp className="icon-left-fix" /> Chat Admin
                  </a>
                </li>
                {invoice.data.items[0].detail_type === 'event' ? (
                  <li>
                    <a
                      id="donasi-program-lain"
                      href="/event"
                      className="btn button-border-cyan"
                    >
                      Ikuti Event Lain
                    </a>
                  </li>
                ) : (
                  <li>
                    <a
                      id="donasi-program-lain"
                      href="/donasi"
                      className="btn button-border-cyan"
                    >
                      Donasi ke Program Lain
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Invoice;
