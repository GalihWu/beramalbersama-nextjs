'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { ZakatPenghasilan } from '@/components/hitung-zakat/ZakatPenghasilan';
import { ZakatTabungan } from '@/components/hitung-zakat/ZakatTabungan';
import { ZakatDagang } from '@/components/hitung-zakat/ZakatDagang';
import { ZakatEmas } from '@/components/hitung-zakat/ZakatEmas';
import { PayButton } from '@/components/hitung-zakat/PayButton';
import Header from '@/components/ui/header';
import {
  currencyFormatter,
  dateFormatter,
  parseFormattedNumber,
} from '@/lib/formater';
import { useQuery } from '@tanstack/react-query';
import { getZakatNishab } from '@/service/FetchData';

const zakatComponents = {
  zHasil: ZakatPenghasilan,
  zTabung: ZakatTabungan,
  zDagang: ZakatDagang,
  zEmas: ZakatEmas,
};

const menuItems = [
  {
    key: 'zHasil',
    label: 'Penghasilan',
    icon: '/img/icons/zakat/ZakatPenghasilan.png',
  },
  {
    key: 'zTabung',
    label: 'Tabungan',
    icon: '/img/icons/zakat/ZakatTabungan.png',
  },
  {
    key: 'zDagang',
    label: 'Perdagangan',
    icon: '/img/icons/zakat/ZakatDagang.png',
  },
  { key: 'zEmas', label: 'Emas', icon: '/img/icons/zakat/ZakatEmas.png' },
];

const HitungZakat = () => {
  const [activeMenu, setActiveMenu] = useState('zHasil');
  const [zakatType, setZakatType] = useState(6);
  const [isYear, setIsYear] = useState(true);
  const [nishabPeriod, setNishabPeriod] = useState(0);
  const [formValues, setFormValues] = useState({
    income: 0,
    other: 0,
    piutang: 0,
    utang: 0,
    expense: 0,
    emas: 0,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['nishabzakat'],
    queryFn: getZakatNishab,
  });

  // console.log(data);

  useEffect(() => {
    if (data) {
      const nishabEmas = data?.data[1]?.value;
      const baseNishab = nishabEmas * 85;
      setNishabPeriod(isYear ? baseNishab : baseNishab / 12);
    }
  }, [data, isYear]);

  if (error) return <>something went wrong</>;

  const income = parseFormattedNumber(formValues.income);
  const other = parseFormattedNumber(formValues.other);
  const piutang = parseFormattedNumber(formValues.piutang);
  const utang = parseFormattedNumber(formValues.utang);
  const expense = parseFormattedNumber(formValues.expense);
  const emas = parseFormattedNumber(formValues.emas);

  const totalMoney = income + other + piutang - (expense + utang);
  const isZakat = totalMoney >= nishabPeriod;
  const zakat = (2.5 / 100) * totalMoney;

  const handleInputChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Nishab Emas
  const nishabEmas = Number(data?.data[1]?.value) || 0;
  const ActiveZakatComponent = zakatComponents[activeMenu];
  const totalEmas = emas * nishabEmas;
  const zakatEmas = (2.5 / 100) * totalEmas;
  const isZakatEmas = totalEmas >= nishabPeriod;
  const updateFetch = data?.data?.[1]?.updated_at;

  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body">
              <p className="title-content w-100 text-center">
                Pilih Jenis Zakat Anda
              </p>

              {/* Menu pilihan zakat */}
              <div className="menu-zakat">
                {menuItems.map(({ key, label, icon }) => (
                  <a
                    key={key}
                    className={`tab-button-zakat ${
                      activeMenu === key ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveMenu(key);
                      setFormValues(() => ({
                        ['income']: 0,
                      }));
                      setFormValues(() => ({
                        ['other']: 0,
                      }));
                      setFormValues(() => ({
                        ['piutang']: 0,
                      }));
                      setFormValues(() => ({
                        ['expense']: 0,
                      }));
                      setFormValues(() => ({
                        ['utang']: 0,
                      }));
                      setFormValues(() => ({
                        ['emas']: 0,
                      }));
                      if (key !== 'zHasil') {
                        setIsYear(nishabEmas * 85);
                      }
                      if (key == 'zHasil') {
                        setZakatType(6);
                      } else if (key == 'zTabung') {
                        setZakatType(1);
                      } else if (key == 'zDagang') {
                        setZakatType(2);
                      } else if (key == 'zEmas') {
                        setZakatType(3);
                      }
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      className="w-[35px] h-[35px]"
                      src={icon}
                      alt={label}
                    />
                    <span>{label}</span>
                  </a>
                ))}
              </div>

              {/* Render Active Zakat Component */}
              {ActiveZakatComponent && (
                <ActiveZakatComponent
                  isYear={isYear}
                  setIsYear={setIsYear}
                  nishabPeriod={nishabPeriod}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                />
              )}

              <div className="mb-4">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Wajib Bayar
                </label>
                <h6 className="text-danger text-sm md:text-base">
                  {isZakat || isZakatEmas
                    ? 'Wajib Membayar Zakat'
                    : 'Tidak Wajib Membayar Zakat, Tapi Bisa Berinfak'}
                </h6>
              </div>
              <div className="mb-4 ">
                <p className="text-sm md:text-base">Note:</p>
                <p className="text-sm md:text-base">
                  - Data harga emas diperbarui pada tanggal{' '}
                  <strong>
                    {isLoading ? '...' : dateFormatter(updateFetch)}
                  </strong>
                </p>
                <div className="grid grid-cols-3">
                  <p className="col-span-2 text-sm md:text-base">
                    - Harga <strong>emas per gram</strong> saat ini
                    (hargaemas.com)
                  </p>
                  <p className="font-semibold text-end text-sm md:text-base">
                    {isLoading ? '...' : currencyFormatter(nishabEmas)}
                  </p>
                  <p className="text-sm md:text-base col-span-2 ">
                    - Nishab 85 gram per Bulan
                  </p>
                  <p className="font-semibold text-end text-sm md:text-base">
                    {isLoading ? '...' : currencyFormatter(nishabPeriod)}
                  </p>
                </div>
                {activeMenu !== 'zDagang' && (
                  <p className="text-sm md:text-base">
                    - Dianjurkan dipotong dari gaji bruto
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PayButton
        isZakat={isZakat}
        isZakatEmas={isZakatEmas}
        activeMenu={activeMenu}
        zakatEmas={zakatEmas}
        zakat={zakat}
        zakatType={zakatType}
      />
    </>
  );
};

export default HitungZakat;
