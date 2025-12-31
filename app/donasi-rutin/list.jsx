import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMyRutin } from '@/service/FetchData';
import RutinRow from '@/components/ui/skeleton/rutinRow';
import { currencyFormatter } from '@/lib/formater';
import { EmptyData } from '@/components/ui/emptyData';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
  FaCreditCard,
} from 'react-icons/fa';

function Card({ title, nominal, time, status, category, image }) {
  const [type, setType] = useState('');

  useEffect(() => {
    if (time) {
      setType(
        time === 'daily' ? 'Harian' : time === 'weekly' ? 'Mingguan' : 'Bulanan'
      );
    }
  }, [time]);

  const isActive = status !== 'nonaktif';
  const isCash = category === 'cash';

  return (
    <div
      className={clsx(
        'group relative bg-white w-full rounded-xl overflow-hidden transition-all duration-300',
        'border-2 hover:shadow-xl hover:-translate-y-1',
        isActive
          ? 'border-gray-200 hover:border-primary-300'
          : 'border-gray-200 opacity-75 hover:border-gray-300'
      )}
    >
      {/* Status Indicator Ribbon */}
      {!isActive && (
        <div className="absolute top-3 left-3 z-10 bg-gray-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <FaTimesCircle className="w-3 h-3" />
          <span>Non Aktif</span>
        </div>
      )}

      <div className="flex gap-3 p-4">
        {/* Image Section */}
        <div className="relative flex-shrink-0">
          <div className="w-auto h-28 md:h-36 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
            <Image
              src={image}
              alt={title}
              height={500}
              width={500}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Category Badge on Image */}
          <div
            className={clsx(
              'absolute -bottom-2 -right-2 p-2 rounded-lg shadow-md',
              isCash
                ? 'bg-gradient-to-br from-secondary-500 to-secondary-600'
                : 'bg-gradient-to-br from-primary-500 to-primary-600'
            )}
          >
            {isCash ? (
              <FaWallet className="w-3.5 h-3.5 text-white" />
            ) : (
              <FaCreditCard className="w-3.5 h-3.5 text-white" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Title */}
          <div>
            <h2 className="text-gray-900 text-sm md:text-base font-semibold leading-tight line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h2>

            {/* Amount */}
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-orange-600 text-lg md:text-xl font-bold">
                {currencyFormatter(nominal)}
              </span>
              <span className="text-gray-500 text-xs">
                / {type.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between gap-2">
            {/* Schedule Type */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <FaCalendarAlt className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">
                {type}
              </span>
            </div>

            {/* Payment Method Badge */}
            <div
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm',
                isCash
                  ? 'bg-gradient-to-r from-secondary-50 to-secondary-100 text-secondary-700 border border-secondary-200'
                  : 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200'
              )}
            >
              <span className="hidden sm:inline">
                {isCash ? 'Saku Berbagi' : 'Bayar Langsung'}
              </span>
              <span className="sm:hidden">{isCash ? 'Saku' : 'Bayar'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-400 rounded-xl pointer-events-none transition-colors duration-300"></div>
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
      <div className="max-w-[640px] mx-auto px-5 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 border-2 border-primary-200/50 rounded-2xl p-6 text-center shadow-lg backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4 shadow-md ring-4 ring-primary-100">
            <div className="w-8 h-8 relative">
              <Image
                src="/img/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Mulai Perjalanan Berbagi Anda
          </h3>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed max-w-sm mx-auto">
            Login untuk mengatur donasi rutin dan raih pahala yang terus
            mengalir setiap hari
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-primary-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Login Sekarang
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[640px] mx-auto px-5 lg:px-6 min-h-[calc(100dvh-375px)]">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
            <FaTimesCircle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-red-800 font-semibold mb-2">Terjadi Kesalahan</h3>
          <p className="text-red-600 text-sm">
            {error?.message || 'Something went wrong.'}
          </p>
        </div>
      </section>
    );
  }

  function mappingList(status) {
    const filter = data?.data?.filter((item) => item.status === status);
    setListCard(filter || []);
  }

  const activeCount =
    data?.data?.filter((item) => item.status === 'active')?.length || 0;
  const inactiveCount =
    data?.data?.filter((item) => item.status === 'inactive')?.length || 0;

  return (
    <section className="w-full max-w-[640px] mx-auto px-5 lg:px-6 pb-32">
      {/* Enhanced Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md -mx-5 px-5 lg:-mx-6 lg:px-6 pt-6 pb-4 shadow-sm">
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
          {/* Active Tab */}
          <button
            onClick={() => setActiveTab('active')}
            className={clsx(
              'flex-1 relative px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300',
              'flex items-center justify-center gap-2',
              activeTab === 'active'
                ? 'bg-white text-primary-600 shadow-md scale-[1.02]'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            )}
          >
            <FaCheckCircle
              className={clsx(
                'w-4 h-4 transition-colors',
                activeTab === 'active' ? 'text-primary-500' : 'text-gray-400'
              )}
            />
            <span>Aktif</span>
            {activeCount > 0 && (
              <span
                className={clsx(
                  'ml-1 px-2 py-0.5 rounded-full text-xs font-bold',
                  activeTab === 'active'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {activeCount}
              </span>
            )}
          </button>

          {/* Inactive Tab */}
          <button
            onClick={() => setActiveTab('inactive')}
            className={clsx(
              'flex-1 relative px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300',
              'flex items-center justify-center gap-2',
              activeTab === 'inactive'
                ? 'bg-white text-red-600 shadow-md scale-[1.02]'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            )}
          >
            <FaTimesCircle
              className={clsx(
                'w-4 h-4 transition-colors',
                activeTab === 'inactive' ? 'text-red-500' : 'text-gray-400'
              )}
            />
            <span>Non Aktif</span>
            {inactiveCount > 0 && (
              <span
                className={clsx(
                  'ml-1 px-2 py-0.5 rounded-full text-xs font-bold',
                  activeTab === 'inactive'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {inactiveCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Card List */}
      <div className="flex flex-col gap-4 pt-6">
        {isLoading ? (
          <div className="space-y-4">
            <RutinRow />
            <RutinRow />
            <RutinRow />
          </div>
        ) : listCard.length > 0 ? (
          listCard?.map((item, index) => (
            <Link
              key={item.id}
              href={`/donasi-rutin/detail/${item.id}`}
              className="block animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
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
              />
            </Link>
          ))
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <EmptyData
              title="Belum ada Donasi Rutin"
              desc="Ayo Mulai Donasi Rutin Sekarang"
            />
          </div>
        )}
      </div>
    </section>
  );
}
