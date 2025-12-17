import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMyRutin } from '@/service/FetchData';
import RutinRow from '@/components/ui/skeleton/rutinRow';
import { currencyFormatter } from '@/lib/formater';
import { EmptyData } from '@/components/ui/emptyData';

function Card({ title, nominal, time, status, category, image }) {
  const [type, setType] = useState('');

  useEffect(() => {
    if (time) {
      setType(
        time === 'daily' ? 'Harian' : time === 'weekly' ? 'Mingguan' : 'Bulanan'
      );
    }
  }, [time]);

  return (
    <div className="bg-white w-full border border-solid border-[#4c4c4c] sm:p-[14px] p-[8px] rounded-[8px] hover:shadow-md transition-transform duration-200 delay-100 ease-in-out hover:-translate-y-[2px]">
      <div className="flex relative w-full">
        <Image
          src={image}
          alt={title}
          height={500}
          width={500}
          className="rounded-[4px] w-auto h-28 md:h-36 "
        />
        <div className="w-[calc(100%-108px)] ml-[8px] relative">
          <h2 className="text-dark text-[12px] sm:text-[15px] leading-[16px] my-0 max-h-[32px] overflow-hidden text-ellipsis line-clamp-2">
            {title}
          </h2>
          <p className="sm:text-[13px] text-[11px] text-grey absolute left-0 text-end m-0 sm:pt-1 mt-1">
            <span className="font-semibold text-orange">
              {`${currencyFormatter(nominal)}`}
            </span>
          </p>

          <div className="text-xs md:text-base leading-[16px] text-black absolute bottom-5 md:bottom-8 right-2 text-end ">
            {type}
          </div>
        </div>
        <div
          className={clsx(
            'w-fit px-[6px] sm:px-[8px] sm:py-[3px] py-[2px] text-[8px] sm:text-[12px] text-white absolute bottom-0 right-0 rounded-full',
            status === 'nonaktif'
              ? 'bg-gray-400'
              : category === 'cash'
              ? 'bg-secondary-500'
              : 'bg-primary-500'
          )}
        >
          {category === 'cash' ? 'Saku Berbagi' : 'Bayar Langsung'}
        </div>
      </div>
    </div>
  );
}

export default function ListDonasiRutin({ isAuthenticated, isCheckingToken }) {
  const [activeTab, setActiveTab] = useState('active');
  const [listCard, setListCard] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['myRutin'],
    queryFn: getMyRutin,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (data) {
      mappingList(activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, activeTab]);

  if (!isAuthenticated && !isCheckingToken) {
    return (
      <div className="max-w-[640px] mx-auto px-[20px] mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200 rounded-2xl p-5 text-center shadow-md">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
            <div className=" w-7 h-7">
              <Image
                src="/img/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="object-contain w-fulll h-full"
              />
            </div>
          </div>
          <h3 className="text-[16px] font-bold text-gray-800 mb-2">
            Mulai Perjalanan Berbagi Anda
          </h3>
          <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">
            Login untuk mengatur donasi rutin dan raih pahala yang terus
            mengalir
          </p>
          <Link href={'/login'} className="button-outline">
            Login sekarang
          </Link>
        </div>
      </div>
    );
  }

  function mappingList(status) {
    const filter = data?.data?.filter((item) => item.status === status);
    setListCard(filter || []);
  }

  if (error) {
    return (
      <section className="w-full max-w-[640px] mx-auto p-[15px] lg:p-[20px] bg-white min-h-[calc(100dvh-375px)]">
        <div>
          An error occurred: {error?.message || 'Something went wrong.'}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[640px] mx-auto p-[15px] lg:p-[20px] bg-white min-h-[calc(100dvh-375px)] pb-32 ">
      <div className="relative flex w-full border-b border-solid border-[#4C4C4C]">
        <div
          className={clsx(
            'relative flex h-10 w-32 justify-center items-center px-[15px] -bottom-[1px] border-b border-solid text-semibold rounded-t-[6px]',
            activeTab === 'active'
              ? 'border-primary-500 bg-[#75D3C1]/[0.3] text-primary-500'
              : 'border-[#4C4C4C] bg-transparent text-dark'
          )}
          role="button"
          onClick={() => setActiveTab('active')}
        >
          Aktif
        </div>
        <div
          className={clsx(
            'relative flex h-10 w-32 justify-center items-center px-[15px] -bottom-[1px] border-b border-solid text-semibold rounded-t-[6px]',
            activeTab === 'inactive'
              ? 'border-[#D0454C] bg-[#D0454C]/[0.1] text-[#D0454C]'
              : 'border-[#4C4C4C] bg-transparent text-dark'
          )}
          role="button"
          onClick={() => setActiveTab('inactive')}
        >
          Non Aktif
        </div>
      </div>
      <div className="flex flex-col gap-[14px] py-[20px]">
        {isLoading ? (
          <div>
            <RutinRow />
            <RutinRow />
            <RutinRow />
          </div>
        ) : listCard.length > 0 ? (
          listCard?.map((item) => (
            <Link
              key={item.id}
              href={`/donasi-rutin/detail/${item.id}`}
              className="animate-fade-in"
            >
              <Card
                title={item.program.title}
                nominal={item.nominal}
                time={item.range_type}
                status={item.status === 'inactive' ? 'nonaktif' : 'aktif'}
                category={
                  item.type === 'commitment' ? 'Bayar Langsung' : 'cash'
                }
                image={item.program.image}
                // payment_method={item.payment_method.bank}
              />
            </Link>
          ))
        ) : (
          <EmptyData
            title="Belum ada Donasi Rutin"
            desc="Ayo Mulai Donasi Rutin Sekarang"
          />
        )}
      </div>
    </section>
  );
}
