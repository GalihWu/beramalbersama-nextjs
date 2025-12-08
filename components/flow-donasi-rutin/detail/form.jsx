'use client';

import React, { useEffect, useState } from 'react';
import FormNominal from '@/components/ui/form/formNominal';
import FormPayment from '@/components/ui/form/formPayment';
import { useMutation, useQueries } from '@tanstack/react-query';
import { postRoutineStore } from '@/service/PostData';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import {
  getMyAccount,
  getPaymentMethods,
  getProgramSetup,
} from '@/service/FetchData';
import Image from 'next/image';
import PaymentModal from '@/components/ui/ModalPaymentMethod';
import { useToast } from '@/context/ToastContext';
import { currencyFormatter } from '@/lib/formater';

const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
const minutes = Array.from({ length: 60 }, (_, i) =>
  i < 10 ? `0${i}` : `${i}`
);

const dayOptions = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
const dayOptionsMonth = Array.from({ length: 28 }, (_, i) =>
  (i + 1).toString()
);
const weeklyDays = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
];

const daysTranslation = {
  Senin: 'Monday',
  Selasa: 'Tuesday',
  Rabu: 'Wednesday',
  Kamis: 'Thursday',
  Jumat: 'Friday',
  Sabtu: 'Saturday',
  Minggu: 'Sunday',
};

function translateDays(day) {
  return daysTranslation[day];
}

const Select = ({ value, onChange, options, label, name, type }) => (
  <div className="flex justify-between mt-[12px] transition-all duration-300 ease-in-out">
    <div className="w-1/4">
      <p className="!m-0  text-[12px] sm:text-[14px] text-[#4d4d4d]">{label}</p>
    </div>
    <div className="w-2/4">
      <select
        className="form-select rounded-[6px] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-tosca focus:border-tosca"
        name={name}
        value={value}
        onChange={onChange}
        disabled={type === 'jumat'}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default function DonasiRutinForm({ id, type, link }) {
  const showToast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    range_type: 'daily',
    range: 'senin',
    type: 'commitment',
    program_id: id || '',
    time: '05:00',
    payment_method_id: '',
    nominal: 0,
    commitment: 1,
    status: 'Pending',
    date: '1',
  });
  const [hour, setHour] = useState('08');
  const [minute, setMinute] = useState('00');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCommitment, setIsCommitment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payment, setPayment] = useState({ name: '', image: '' });
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);

  useEffect(() => {
    if (type === 'subuh') {
      setHour('04');
      setMinute('33');
    }

    if (type === 'jumat') {
      setFormData((prev) => ({
        ...prev,
        range_type: 'weekly',
        range: 'Jumat',
      }));
      setHour('03');
      setMinute('00');
    }

    if (!isCommitment) {
      setPayment({ name: '', image: '' });
    }
  }, [type, isCommitment]);

  const mutation = useMutation({
    mutationFn: postRoutineStore,
    onSuccess: (data) => {
      console.log('Routine successful:', data);
      if (isCommitment) {
        router.push(`/donasi-rutin/invoice/${data?.data.invoice}`);
      } else {
        router.push(`/donasi-rutin/detail/${data?.data.id}`);
      }
    },
    onError: (error) => {
      console.error('Routine failed:', error);
    },
  });

  const queries = useQueries({
    queries: [
      {
        queryKey: ['myAccount'],
        queryFn: getMyAccount,
      },
      {
        queryKey: ['paymentMethodsRutin', link],
        queryFn: () => getPaymentMethods({ program_link: link }),
      },
      {
        queryKey: ['programSetup', 'rutin'],
        queryFn: () => getProgramSetup({ typeProgram: 'rutin' }),
      },
    ],
  });

  const [myAccountQuery, paymentMethodsQuery, programSetupQuery] = queries;

  useEffect(() => {
    if (programSetupQuery.data) {
      const id = programSetupQuery.data.data[0].value;
      setFormData((prev) => ({ ...prev, program_id: id }));
    }
  }, [programSetupQuery.data]);

  if (myAccountQuery.error || paymentMethodsQuery.error) {
    return (
      <div className="transition-opacity duration-500 ease-in-out opacity-100">
        An error occurred:{' '}
        {myAccountQuery.error?.message ||
          paymentMethodsQuery.error?.message ||
          'Something went wrong.'}
      </div>
    );
  }

  const wallet = myAccountQuery.data?.data.dompet_kebaikan.saldo || 0;

  const handlePaymentId = (paymentMethod) => {
    setFormData((prev) => ({ ...prev, payment_method_id: paymentMethod.id }));
    setOpenModal(false);
    setPayment({ name: paymentMethod.name, image: paymentMethod.image_url });
    setPaymentMethodSelected(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'hour') {
      setHour(value);
    } else if (name === 'minute') {
      setMinute(value);
    }
  };

  const handleCommitment = (commit) => {
    setIsCommitment(commit);
    if (commit) {
      setPaymentMethodSelected(false);
    }
  };

  const total = formData.nominal * formData.commitment;
  const dompet_kebaikan = myAccountQuery.data?.data.dompet_kebaikan.saldo || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (formData.nominal < 1000) {
      showToast('Minimal donasi 1000', 'error');
      setIsProcessing(false);
      return;
    }
    if (!isCommitment) {
      if (formData.nominal > dompet_kebaikan) {
        showToast('Saldo Saku Berbagi anda tidak cukup', 'error');
        setIsProcessing(false);
        return;
      }
    }

    const time = `${hour}:${minute}`;
    const range_type = formData.range_type;
    const range =
      formData.range_type === 'weekly'
        ? translateDays(formData.range)
        : formData.date;

    const payload = {
      program_id: formData.program_id,
      range_type,
      range,
      time,
      nominal: formData.nominal,
      status: formData.status,
      // payment_method_id: formData.payment_method_id,
    };

    if (!isCommitment) {
      payload.dompet_kebaikan_store = dompet_kebaikan;
      payload.payment_method_id = 3000;
      payload.type = 'default';
    }

    if (isCommitment) {
      payload.payment_method_id = formData.payment_method_id;
      payload.commitment = formData.commitment;
      payload.type = 'commitment';
    }

    if (isCommitment && !paymentMethodSelected) {
      showToast('Silakan pilih metode pembayaran terlebih dahulu', 'error');
      setIsProcessing(false);
      return;
    }

    mutation.mutate(payload, {
      onSuccess: () => setIsProcessing(false),
      onError: () => setIsProcessing(false),
    });
  };

  const { range_type, range, commitment, date, nominal } = formData;

  return (
    <div className={`pb-32 animate-fade-in`}>
      <form onSubmit={handleSubmit}>
        <div className="transition-all duration-300 ease-in-out">
          <p className="text-[10px] sm:text-[12px] leading-[15px] mb-[8px] text-[#4d4d4d] mt-0 transition-all duration-300 ease-in-out">
            Tentukan nominal
          </p>
          <FormNominal nominal={nominal} onChange={handleChange} />
          <p className="text-[12px] sm:text-[14px] leading-[16px] mt-[16px] text-[#4d4d4d] mb-0 font-semibold transition-all duration-300 ease-in-out">
            Informasi metode pembayaran
          </p>
          <p className="text-[10px] sm:text-[12px] leading-[15px] mt-2 mb-[8px] text-[#4d4d4d] transition-all duration-300 ease-in-out">
            Donasi rutin akan otomatis dipotong dari Saku Berbagi Anda setiap
            periodenya
          </p>
          <FormPayment wallet={wallet} handleCommitment={handleCommitment} />
          {isCommitment && (
            <div className="payment-infaq transition-all duration-500 ease-in-out">
              <div className="input-payment transition-all duration-300 ease-in-out">
                {payment.image && (
                  <Image
                    width={500}
                    height={500}
                    className="h-12 w-auto transition-all duration-300 ease-in-out"
                    src={payment.image}
                    alt=""
                  />
                )}
                <div className="payment-text transition-all duration-300 ease-in-out">
                  {payment.name ? payment?.name : 'Metode Pembayaran'}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className={`btn button-cyan px-3 transition-all duration-300 ease-in-out hover:scale-105 ${
                    formData.nominal < 1000 ? 'disabled' : ''
                  }`}
                >
                  Pilih
                </button>
              </div>
            </div>
          )}

          <div
            className={`flex w-full p-[12px] rounded-[6px] text-[10px] sm:text-[12px] transition-all duration-300 ease-in-out ${
              nominal > dompet_kebaikan && !isCommitment
                ? 'bg-[#EC3339] text-white'
                : 'bg-[#D7F9FF] text-[#4d4d4d] '
            } mt-[12px]`}
          >
            {isCommitment
              ? 'Bayar sekali sekarang dan nikmati donasi rutin yang berjalan otomatis'
              : nominal > dompet_kebaikan
              ? 'Saldo Saku Berbagi Anda tidak mencukupi. Silakan top up terlebih dahulu'
              : 'Donasi akan otomatis diproses menggunakan saldo Saku Berbagi Anda'}
          </div>
        </div>

        <div className="py-5 transition-all duration-300 ease-in-out">
          <div className="flex justify-between transition-all duration-300 ease-in-out">
            <div className="w-1/4">
              <p className="!m-0  text-[12px] sm:text-[14px] text-[#4d4d4d] transition-all duration-300 ease-in-out">
                Donasi setiap:
              </p>
            </div>
            <div className="w-2/4">
              <select
                className="form-select rounded-[6px] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-tosca focus:border-tosca"
                name="range_type"
                value={range_type}
                onChange={handleChange}
                disabled={type === 'jumat' || type === 'subuh'}
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>
          </div>

          <div className="transition-all duration-300 ease-in-out">
            {isCommitment ? (
              <Select
                value={commitment}
                onChange={handleChange}
                options={dayOptions}
                label="Lama Donasi :"
                name="commitment"
              />
            ) : null}
          </div>
          {range_type === 'weekly' && (
            <Select
              value={range}
              onChange={handleChange}
              options={weeklyDays}
              label="Hari : "
              name="range"
              type={type}
            />
          )}

          {range_type === 'monthly' && (
            <Select
              value={date}
              onChange={handleChange}
              options={dayOptionsMonth}
              label="Tanggal"
              name="date"
            />
          )}
          <div className="flex justify-between mt-[12px] transition-all duration-300 ease-in-out">
            <div className="w-1/4">
              <p className="!m-0  text-[12px] sm:text-[14px] text-[#4d4d4d] transition-all duration-300 ease-in-out">
                Pukul
              </p>
            </div>
            <div className="w-2/4 flex transition-all duration-300 ease-in-out">
              <select
                className="form-select rounded-[6px] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-tosca focus:border-tosca"
                name="hour"
                value={hour}
                onChange={handleChange}
                disabled={type === 'subuh' || type === 'jumat'}
              >
                {hours.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="form-select rounded-[6px] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-tosca focus:border-tosca"
                name="minute"
                value={minute}
                onChange={handleChange}
                disabled
              >
                {minutes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex w-full p-[12px] mt-5 rounded-[6px] text-[10px] sm:text-[12px] text-[#4d4d4d] transition-all duration-300 ease-in-out bg-[#D7F9FF] mt-[32px]">
            {isCommitment
              ? 'Sistem akan memproses donasi rutin Anda secara otomatis sesuai jadwal'
              : 'Donasi rutin akan aktif selama saldo Saku Berbagi Anda mencukupi'}
          </div>
        </div>
        <div className="bottom-navigation w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto transition-all duration-300 ease-in-out">
          <Button variant="orange" size="full" disabled={isProcessing}>
            {isProcessing ? 'Memproses...' : 'Konfirmasi'} &nbsp;
            {isCommitment && total.length !== 0 && currencyFormatter(total)}
          </Button>
        </div>
      </form>

      {/* modal */}
      <PaymentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        paymentMethods={paymentMethodsQuery.data?.data}
        onSelectPayment={handlePaymentId}
        includePaymentMethod={['bank']}
      />
    </div>
  );
}
