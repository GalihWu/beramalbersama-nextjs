'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import Image from 'next/image';
import { numberFormatter } from '@/lib/formater';

export default function FormPayment({ wallet, handleCommitment }) {
  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState({
    code: '',
    label: 'Pilih Metode Pembayaran',
    img: null,
  });

  const handlePaymentSelect = (res) => {
    setPaymentType(res);
    if (res.code === 'cash') {
      handleCommitment(true);
    } else if (res.code === 'wallet') {
      handleCommitment(false);
    }
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const paymentList = [
    {
      code: 'wallet',
      label: 'Saku Berbagimu',
      img: '/img/icons/Kantong berbagi.png',
    },
    {
      code: 'cash',
      label: 'Bayar Langsung',
      img: '/img/icons/Bayar langsung.png',
    },
  ];

  return (
    <>
      <div className="block w-full">
        <div
          className="flex justify-start items-center w-full relative border border-solid border-[#636363] rounded-[6px] px-[10px] h-[40px]"
          role="button"
          onClick={() => setOpen(!open)}
        >
          {paymentType?.img ? (
            <Image
              src={paymentType?.img}
              alt=""
              height={28}
              width={28}
              className="mr-[10px]"
            />
          ) : (
            <div />
          )}
          <p
            className={clsx(
              'text-[12px] font-normal my-0 flex justify-between items-center',
              paymentType?.code === 'wallet' && ' w-[calc(100%-70px)]'
            )}
          >
            {paymentType?.label}
            {paymentType?.code === 'wallet' && (
              <span className="text-primary-500 text-end">
                Rp {numberFormatter(wallet)}
              </span>
            )}
          </p>
          <div className="absolute h-[30px] w-[30px] top-1/2 right-[10px] -translate-y-1/2 flex items-center justify-center">
            {!open ? <PiCaretDown size={18} /> : <PiCaretUp size={18} />}
          </div>
        </div>

        <div
          className={clsx(
            'border border-solid border-[#636363] rounded-[6px] mt-[10px] overflow-hidden',
            open ? 'block' : 'hidden'
          )}
        >
          {paymentList?.map((res, i) => (
            <div
              className={clsx(
                'flex justify-start items-center w-full relative px-[10px] h-[40px] py-[4px]',
                paymentList?.length !== i + 1 &&
                  'border-b border-solid border-[#dee2e6]'
              )}
              role="button"
              onClick={() => handlePaymentSelect(res)}
              key={i}
            >
              {res?.img !== null ? (
                <Image
                  src={res?.img}
                  alt=""
                  height={26}
                  width={26}
                  className="mr-[10px]"
                />
              ) : (
                <div />
              )}
              <p
                className={clsx(
                  'text-[12px] font-normal my-0 flex justify-between items-center',
                  res?.code === 'wallet' && ' w-[calc(100%-70px)]'
                )}
              >
                {res?.label}
                {res?.code === 'wallet' && (
                  <span className="text-primary-500 text-end">
                    Rp {numberFormatter(wallet)}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
