'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MdOpenInFull } from 'react-icons/md';

// component
import { Status } from './Status';
import { DetailProjek } from './DetailProjek';
import { Intruksi } from './Intruksi';
import { Stepper } from './Stepper';
import { Salur } from './Salur';
import Header from '@/components/ui/header';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';

const TrackingDonation = ({ dataInvoice }) => {
  const [intruction, setIntruction] = useState(false);
  const [tracking, setTracking] = useState('');

  const handleTracking = (section) => {
    setTracking((prevTracking) => (prevTracking === section ? null : section));
  };
  const handleIntruction = () => {
    setIntruction((prevIntruction) => !prevIntruction);
  };

  // console.log(dataInvoice);

  return (
    <>
      <Header type="title" text="Status Donasi" />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            {/* program */}
            <div
              className="accordion accordion-flush accordion-donasi-status"
              id="accordionTracking"
            >
              {dataInvoice.items.map((item, itemIndex) => (
                <div key={itemIndex} className="accordion-item mb-3">
                  <div
                    className="content-body donasi-status-content cursor-pointer"
                    id={`flush-heading-${itemIndex}`}
                    onClick={() => handleTracking(`flush-heading-${itemIndex}`)}
                  >
                    <Stepper
                      invoice={dataInvoice.invoice}
                      nominal={item.nominal_donasi}
                      date={dataInvoice.last_payment_time}
                      status={dataInvoice.status}
                      items={item}
                      caret={tracking === `flush-heading-${itemIndex}`}
                    />
                  </div>
                  {/* {tracking === `flush-heading-${itemIndex}` && (  */}
                  <>
                    <div className="content-body border-top my-3">
                      <Link
                        href={`/donasi/detail/${item.program.link}`}
                        className="flex flex-col gap-4 rounded-lg p-3 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <Image
                          src={item.program.image}
                          alt=""
                          width={300}
                          height={300}
                          className="w-full rounded-lg object-cover"
                        />
                        <div className="flex justify-between items-end relative">
                          <div className="flex flex-col">
                            <h4 className="font-bold text-base md:text-lg">
                              {item.program.title}
                            </h4>
                            <p>{item.program?.mitra?.name}</p>
                          </div>
                          <MdOpenInFull
                            className="text-green absolute right-3 bottom-3"
                            size={20}
                          />
                        </div>
                      </Link>
                    </div>
                    {item.project && (
                      <>
                        <div className="content-body donasi-status-content border-top my-3">
                          <DetailProjek project={item.project} />
                        </div>
                        <Salur projectId={item.project.id} />
                      </>
                    )}
                  </>
                  {/* )} */}
                </div>
              ))}
            </div>

            <div className="content-body donasi-status-content border-top my-3">
              <Status
                paymentDetail={dataInvoice.payment_method}
                nominal={dataInvoice.nominal}
                status={dataInvoice.status}
                date={dataInvoice.date}
              />
            </div>

            {/* Intruksi */}
            {dataInvoice.status === 'Pending' && (
              <div className="content-body donasi-status-content border-top">
                <div
                  className="accordion accordion-flush accordion-donasi-status"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="flush-headingOne"
                      onClick={handleIntruction}
                    >
                      <div className="accordion-button collapsed cursor-pointer">
                        Intruksi Pembayaran
                      </div>
                    </h2>
                    {intruction && (
                      <Intruksi nominal={dataInvoice.nominal.toString()} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* download app */}
            <div className="content-body border-top">
              <p className="text-title mb-2">Pembayaran belum terverifikasi?</p>
              <p>
                Jika pembayaran belum terverifikasi selama 1x24 jam setelah kamu
                bayarkan, lakukan verifikasi manual dengan aman lewat fitur
                verikasi di aplikasi AksiBerbagi
              </p>

              <ul className="donate-share-links">
                <li>
                  <a
                    href="https://www.instagram.com/aksiberbagicom"
                    className="btn !bg-[#ba347e] !text-white mt-4 btn-block mb-3"
                    target="_blank"
                  >
                    <FaInstagram className="icon-left-fix" /> Follow Instagram
                    kami
                  </a>
                </li>

                <li className="!w-full">
                  <a
                    id="donasi-program-lain"
                    href="/donasi"
                    className="btn button-border-cyan"
                  >
                    Donasi ke Program Lain
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingDonation;
