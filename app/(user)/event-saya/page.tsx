/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EmptyData } from '@/components/ui/emptyData';
import Header from '@/components/ui/header';
import Skeleton from '@/components/ui/skeleton/skeleton';
import { dateFormatter } from '@/lib/formater';
import { getMyEvent } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaClock } from 'react-icons/fa';

type Status = 'Sukses' | 'Pending' | 'Canceled';

interface CardProps {
  title: string;
  date: string;
  status: Status;
  image: string;
  link: string;
}

const EventCard = ({
  title,
  date,

  status,
  image,
  link,
}: CardProps) => {
  const statusStyles = {
    Sukses: 'bg-green text-white',
    Pending: 'bg-gray text-gray',
    Canceled: 'bg-red-400 text-white',
  };

  return (
    <Link
      href={`/event/${link}`}
      className="flex gap-3 py-3 border-b-2 border-gray-300 relative"
    >
      <div className="w-80 md:w-96 h-24 md:h-36 rounded overflow-hidden">
        <Image
          width={300}
          height={300}
          src={image}
          alt="event_img"
          className="object-contain w-full h-full rounded"
        />
      </div>
      <div className="w-full py-1 ">
        <div
          className={`rounded font-medium text-sm md:text-base py-[3px] md:py-1 px-3 w-fit text-center absolute top-[14px] left-0 ${statusStyles[status]}`}
        >
          {status}
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold text-gray mt-0 truncate w-[200px] md:w-[340px] text-sm md:text-base">
            {title}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray text-sm md:text-base">
              <FaClock />
              <span>{dateFormatter(date)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  status: Status;
  link: string;
}

const EventSaya = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myEvent'],
    queryFn: getMyEvent,
  });

  if (error) {
    return (
      <div>An error occurred: {error?.message || 'Something went wrong.'}</div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: Event[] = data?.data
    .filter((event: any) => event.payment_status !== 'Canceled')
    .map((event: any) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      image: event.image_url,
      link: event.slug,
      status: event.payment_status === 'active' ? 'Sukses' : 'Pending',
    }));

  return (
    <div>
      <Header type="notshare" text="Event Saya" />
      <div className="container content-wrapper content-sm">
        <div className="container bg-white ">
          <div className="flex justify-between items-center py-4">
            <div>
              <div className="text-gray font-semibold text-base md:text-xl">
                Event Saya
              </div>
              <p className="text-gray text-sm md:text-base m-0">
                Daftar event & Transaksi saya
              </p>
            </div>
          </div>
        </div>

        {/* events */}
        <div className="container bg-white mt-2 py-4 flex flex-col gap-4 min-h-dvh">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton
                  width={''}
                  height={''}
                  className="h-28 md:h-40 w-auto rounded"
                />
              </div>
            ))
          ) : events.length === 0 ? (
            <EmptyData
              img={null}
              title="Belum ada Event"
              desc="Anda belum mendaftarkan event manapun saat ini"
              component={
                <div>
                  <Link href="/event" className="btn-new-tosca">
                    Pilih Event
                  </Link>
                </div>
              }
            />
          ) : (
            events.map(({ id, ...eventProps }) => (
              <EventCard key={id} {...eventProps} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSaya;
