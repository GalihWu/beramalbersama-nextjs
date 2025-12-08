import { currencyFormatter } from '@/lib/formater';
import Image from 'next/image';
import React from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

const steps = [
  {
    title: 'Pembayaran',
    imageActive: '/img/icons/icon-tracking/1. Pembayaran.png',
    image: '/img/icons/icon-tracking/1. Pembayaran I.png',
  },
  {
    title: 'Menunggu Salur',
    imageActive: '/img/icons/icon-tracking/2. Menunggu salur.png',
    image: '/img/icons/icon-tracking/2. Menunggu salur I.png',
  },
  {
    title: 'Proses Salur',
    imageActive: '/img/icons/icon-tracking/3. proses salur.png',
    image: '/img/icons/icon-tracking/3. proses salur I.png',
  },
  {
    title: 'Selesai Salur',
    imageActive: '/img/icons/icon-tracking/4. Selesai salur.png',
    image: '/img/icons/icon-tracking/4. Selesai salur I.png',
  },
];

const getUpdatedSteps = (status, projectId = null) => {
  return steps.map((step, index) => {
    let isActive = false;
    let isPending = false;
    let isFailed = false; // Tambahkan status untuk gagal

    switch (status) {
      case 'Waiting for payment':
        isPending = index === 0;
        break;
      case 'Refunding':
        isActive = index === 0;
        break;
      case 'Pending':
        if (projectId) {
          isActive = index === 0 || index === 1;
          isPending = index === 2;
        } else {
          isActive = index === 0;
          isPending = index === 1;
        }
        break;
      case 'Process':
        isActive = index === 0 || index === 1 || index === 2;
        isPending = index === 3;
        break;
      case 'Done':
        isActive = true;
        break;
      default:
        isActive = false;
        isPending = false;
        isFailed = true;
        break;
    }

    return { ...step, isActive, isPending, isFailed };
  });
};

export const Stepper = ({ date, nominal, items }) => {
  const updatedSteps = getUpdatedSteps(items.activity, items.project?.id);

  if (!date) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">
            <span className="text-green">{items.program.title}</span>
          </h3>
          <p className="text-lg font-bold text-gray-600">
            {currencyFormatter(nominal)}
          </p>
        </div>
        <div>{/* Konten tambahan di sini jika diperlukan */}</div>
      </div>

      <div className="flex justify-between px-[26px] sm:px-[24px] pb-3">
        {updatedSteps.map((step, index) => (
          <Image
            key={index}
            src={step.isActive ? step.imageActive : step.image}
            alt={step.title}
            width={100}
            height={100}
            className="md:w-8 w-6"
          />
        ))}
      </div>

      <div className="flex items-center justify-between px-4">
        {updatedSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col text-center items-center justify-start w-1/4">
              <div
                className={`relative flex items-center justify-center w-9 h-9 rounded-full ${
                  step.isFailed
                    ? 'bg-red-500' // Warna merah untuk status gagal
                    : step.isActive
                    ? 'bg-green' // Warna hijau untuk aktif
                    : step.isPending
                    ? 'bg-orange-300' // Warna orange untuk proses salur
                    : 'bg-gray-300' // Warna abu-abu untuk non-aktif
                }`}
              >
                {step.isActive || step.isFailed ? (
                  <FaRegCheckCircle className="w-4 h-4 text-white" />
                ) : step.isPending ? (
                  <FaRegCircle className="w-4 h-4 text-white" />
                ) : null}
              </div>
            </div>
            {index < updatedSteps.length - 1 && (
              <div
                className={`${
                  step.isFailed
                    ? 'bg-red-500'
                    : step.isActive
                    ? 'bg-green'
                    : step.isPending
                    ? 'bg-orange-500'
                    : 'bg-gray-300'
                } w-full h-1`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-between gap-2 text-center mt-3">
        {updatedSteps.map((step, index) => (
          <p key={index} className="md:text-base text-xs">
            {step.title}
          </p>
        ))}
      </div>
    </div>
  );
};
