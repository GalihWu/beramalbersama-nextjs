'use client';

import Header from '@/components/ui/header';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import useEventFormStore from '@/stores/EventFormStore';
import { FaGlobe, FaRegClock, FaRegFile } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiMoviePlay } from 'react-icons/bi';
import { FaRegCirclePlay } from 'react-icons/fa6';
import {
  MdInsertLink,
  MdLockOutline,
  MdOutlinePeopleAlt,
  MdTransitEnterexit,
} from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  currencyFormatter,
  dateFormatter,
  dayFormatter,
  numberFormatter,
} from '@/lib/formater';
import { IoCloseOutline } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { getEventByLink } from '@/service/FetchData';

interface Attribute {
  source: string;
  description: string;
  title: string;
  source_from: string;
  type: string;
}

interface EventDataProps {
  attributes: Attribute[];
  id: string;
  datetime: string;
  description: string;
  due_duetime: string;
  image: string;
  mitra: {
    name: string;
    image: string;
  };
  location: string | null;
  link: string;
  mode: string;
  price: string;
  summary: string;
  title: string;
  confirmed_quota: number;
  quota: number;
  type: {
    name: string;
  };
  is_registered: boolean;
  status: string;
  reg_only: number | null;
}

// Komponen untuk menampilkan informasi event dengan desain card elegan
const EventInfoItem = ({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
}) => (
  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-500/30">
    <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

// Komponen untuk menampilkan atribut/link kelas dengan desain modern
const ClassAttributeItem = ({
  attribute,
  isRegistered,
  isFirst,
}: {
  attribute: Attribute;
  isRegistered: boolean;
  isFirst: boolean;
}) => {
  const getIcon = () => {
    if (attribute.type === 'video') return BiMoviePlay;
    if (attribute.source_from === 'url') return MdInsertLink;
    return FaRegFile;
  };

  const getActionIcon = () => {
    if (attribute.type === 'video') return FaRegCirclePlay;
    return MdTransitEnterexit;
  };

  const IconComponent = getIcon();
  const ActionIconComponent = getActionIcon();

  // Jika terdaftar atau atribut pertama, tampilkan sebagai link
  if (isRegistered || isFirst) {
    return (
      <Link
        href={attribute.source}
        className="group flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-primary-500/5 to-transparent hover:from-primary-500/10 hover:to-primary-500/5 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:shadow-md"
        target="_blank"
      >
        <div className="flex gap-4 items-center">
          <div className="p-2.5 rounded-lg bg-primary-500/20 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
            <IconComponent size={20} />
          </div>
          <div className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            {attribute.title}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
          <ActionIconComponent
            size={20}
            className={attribute.type !== 'video' ? 'rotate-180' : ''}
          />
        </div>
      </Link>
    );
  }

  // Jika belum terdaftar dan bukan atribut pertama, tampilkan terkunci
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-200 opacity-60 cursor-not-allowed">
      <div className="flex gap-4 items-center">
        <div className="p-2.5 rounded-lg bg-gray-200 text-gray-400">
          <IconComponent size={20} />
        </div>
        <div className="font-medium text-gray-500">{attribute.title}</div>
      </div>
      <div className="p-2 rounded-lg bg-gray-200 text-gray-400">
        <MdLockOutline size={20} />
      </div>
    </div>
  );
};

// Komponen untuk form pembelian tiket dengan desain premium
const TicketForm = ({
  eventData,
  ticketCount,
  onTicketChange,
  onClose,
}: {
  eventData: EventDataProps;
  ticketCount: number;
  onTicketChange: (increment: boolean) => void;
  onClose: () => void;
}) => {
  const totalPrice = useMemo(
    () => Number(eventData.price) * ticketCount,
    [ticketCount, eventData.price]
  );

  return (
    <div className="overflow-hidden mb-4 flex flex-col gap-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-800">Detail Pembelian</h4>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <IoCloseOutline size={24} className="text-gray-500" />
        </button>
      </div>

      {eventData.type.name === 'Event' ? (
        <>
          <div className="bg-gradient-to-br from-gray-50 to-white px-4 py-3 flex justify-between rounded-xl border border-gray-200 shadow-sm">
            <div className="text-gray-600 font-medium">Harga Tiket</div>
            <div className="font-semibold text-gray-800">
              Rp {numberFormatter(eventData.price)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-500/5 to-white px-4 py-3 flex justify-between items-center rounded-xl border border-primary-500/30 shadow-sm">
            <div className="text-gray-600 font-medium">Jumlah Tiket</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onTicketChange(false)}
                disabled={ticketCount === 1}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 font-semibold text-gray-700 hover:border-primary-500 hover:bg-primary-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                -
              </button>
              <span className="font-semibold text-lg text-gray-800 min-w-[2ch] text-center">
                {ticketCount}
              </span>
              <button
                onClick={() => onTicketChange(true)}
                disabled={ticketCount === 5}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 font-semibold text-gray-700 hover:border-primary-500 hover:bg-primary-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-500/10 to-primary-500/5 px-4 py-4 flex justify-between rounded-xl border-2 border-primary-500/30 shadow-md">
            <div className="text-gray-700 font-semibold">Total Harga</div>
            <div className="font-bold text-lg text-primary-500">
              {currencyFormatter(totalPrice)}
            </div>
          </div>

          <div className="text-xs text-gray-500 px-2 py-2 bg-amber-50 rounded-lg border border-amber-200">
            <span className="font-medium">⚠️ Catatan:</span> Maksimal 5 tiket
            per akun
          </div>
        </>
      ) : (
        <div className="bg-gradient-to-br from-primary-500/10 to-primary-500/5 px-4 py-4 flex justify-between rounded-xl border-2 border-primary-500/30 shadow-md">
          <div className="text-gray-700 font-semibold">Total Harga</div>
          <div className="font-bold text-lg text-primary-500">
            {currencyFormatter(totalPrice)}
          </div>
        </div>
      )}
    </div>
  );
};

const EventDetail = ({
  eventData,
  link,
}: {
  eventData: EventDataProps;
  link: string;
}) => {
  const router = useRouter();
  const [getTicket, setGetTicket] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const { updateEventData, clearEventData } = useEventFormStore();
  const [isRegitered, setIsRegistered] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['eventbyid', link],
    queryFn: () => getEventByLink(link),
  });

  useEffect(() => {
    if (data && !isLoading) {
      setIsRegistered(data.data.is_registered);
    }
  }, [data, isLoading]);

  useEffect(() => {
    clearEventData();
  }, [clearEventData]);

  const handleTicketCountChange = (increment: boolean) => {
    setTicketCount((prevCount) => {
      if (increment && prevCount < 5) return prevCount + 1;
      if (!increment && prevCount > 1) return prevCount - 1;
      return prevCount;
    });
  };

  const handleSubmit = () => {
    const eventFormData = {
      id: eventData.id,
      title: eventData.title,
      image: eventData.image,
      date: `${dayFormatter(eventData.datetime, 'long')}, ${dateFormatter(
        eventData.datetime,
        'long'
      )}`,
      type: `${eventData.type.name} ${eventData.mode}`,
      qty: ticketCount,
      price: eventData.price,
      totalPrice: Number(eventData.price) * ticketCount,
      reg_only: eventData.reg_only,
    };

    updateEventData(eventFormData);
    router.push(`/event/${eventData.link}/form`);
  };

  const getButtonText = () => {
    if (eventData.status !== 'active')
      return `${eventData.type.name} telah berakhir`;
    if (isRegitered) return 'Anda sudah terdaftar';
    if (getTicket) return 'Bayar Sekarang';
    return `Daftar ${eventData.type.name}`;
  };

  const isButtonDisabled = isRegitered || eventData.status !== 'active';

  // console.log(eventData.reg_only);

  return (
    <>
      <Header type="title" text={eventData.title} link="/event" />

      <div className="content-wrapper content-sm container animate-fade-in !pb-32 !pt-6">
        {/* Hero Image dengan overlay gradient */}
        <div className="relative overflow-hidden rounded-b shadow-lg mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
          <Image
            src={eventData.image}
            alt="event"
            width={300}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="bg-white container pt-6 pb-16">
          {/* Title dengan accent line */}
          <div className="relative mb-6">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-transparent rounded-full"></div>
            <h3 className="font-bold text-xl md:text-2xl text-gray-900 leading-tight">
              {eventData.title}
            </h3>
          </div>

          {/* Organizer Card dengan desain premium */}
          <div className="relative my-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-500/5 to-transparent p-3 border border-primary-500/20 shadow transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10 flex gap-4 items-center">
              <div className="relative rounded-2xl bg-white p-1 shadow-md">
                <div className="rounded-xl overflow-hidden w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src={eventData.mitra.image}
                    width={400}
                    height={400}
                    alt="logo"
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium mb-1">
                  Diselenggarakan oleh
                </p>
                <p className="font-bold text-base md:text-lg text-gray-900">
                  {eventData.mitra.name}
                </p>
              </div>
            </div>
          </div>

          {/* Information Event Grid dengan cards */}
          <div className="mb-8">
            <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
              Informasi Event
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventInfoItem
                icon={FaRegClock}
                title="Waktu & Tanggal"
                value={`${dayFormatter(
                  eventData.datetime,
                  'long'
                )}, ${dateFormatter(eventData.datetime, 'long')}`}
              />

              <EventInfoItem
                icon={FaGlobe}
                title="Jenis Event"
                value={`${eventData.type.name} ${eventData.mode}`}
              />

              {eventData.location && (
                <EventInfoItem
                  icon={HiOutlineLocationMarker}
                  title="Lokasi Event"
                  value={eventData.location}
                />
              )}

              {eventData.quota && (
                <EventInfoItem
                  icon={MdOutlinePeopleAlt}
                  title="Peserta"
                  value={`${eventData.confirmed_quota}/${eventData.quota}`}
                />
              )}
            </div>
          </div>

          {/* Description dengan styling yang lebih baik */}
          <div className="mb-8">
            <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
              Tentang Event Ini
            </h3>
            <div
              className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm"
              dangerouslySetInnerHTML={{ __html: eventData.description }}
            />
          </div>

          {/* Link Kelas dengan desain modern */}
          {eventData.attributes.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
                Mulai Kelas
              </h3>
              <div className="flex flex-col gap-3">
                {eventData.attributes.map((attribute, index) => (
                  <ClassAttributeItem
                    key={index}
                    attribute={attribute}
                    isRegistered={isRegitered}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Button dengan backdrop blur */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-lg bg-white/95 border-t border-gray-200 shadow-2xl">
          <div className="container px-4 py-4 max-w-2xl mx-auto">
            <div className="donate-sticky-content">
              {getTicket && (
                <TicketForm
                  eventData={eventData}
                  ticketCount={ticketCount}
                  onTicketChange={handleTicketCountChange}
                  onClose={() => setGetTicket(false)}
                />
              )}

              <button
                onClick={
                  eventData.reg_only !== 0
                    ? handleSubmit
                    : getTicket
                    ? handleSubmit
                    : () => setGetTicket(true)
                }
                className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 shadow-lg ${
                  isButtonDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-[#5FC0AE] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }`}
                disabled={isButtonDisabled}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
