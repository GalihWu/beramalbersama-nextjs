'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Header from '@/components/ui/header';
import { FaFilm, FaGlobe, FaSearch } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllEvent } from '@/service/FetchData';
import SpinLoading from '@/components/ui/SpinLoading';
import { EmptyData } from '@/components/ui/emptyData';

interface EventProps {
  type: {
    name: string;
    slug: string;
  };
  title: string;
  image: string;
  mitra: {
    name: string;
    image: string;
  };
  location: string | null;
  link: string;
  mode: string;
  status: string;
}

const EventCard = React.memo(
  ({ type, title, image, mitra, link, location, mode, status }: EventProps) => (
    <Link href={`/event/${link}`} className="col-6 col-sm-4">
      <div className="event-card !shadow-md hover:!shadow-lg border border-primary-500 relative">
        {status === 'pass_event' && (
          <div className="absolute top-2 right-2 bg-gray-100 text-gray-800 text-xs font-semibold py-1 px-2 rounded-xl z-10">
            Closed
          </div>
        )}
        <div className="image-wrap max-h-[105px]">
          <Image
            width={500}
            height={500}
            src={image}
            alt={title}
            priority={false}
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className={`text-wrap ${
            status === 'pass_event' ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <div className="text-sm text-gray mb-6 flex gap-1 items-center">
            {location ? (
              <>
                <div className="w-[18px]">
                  <HiOutlineLocationMarker size={16} />
                </div>
                <span className="ms-1 truncate">{location}</span>
              </>
            ) : type.name === 'Web Series' ? (
              <>
                <FaFilm />
                <span className="ms-1 truncate">{`${type.name} ${mode}`}</span>
              </>
            ) : (
              <>
                <FaGlobe />
                <span className="ms-1 truncate">{`${type.name} ${mode}`}</span>
              </>
            )}
          </div>
          <div className="title line-clamp-2 text-gray-700">{title}</div>
          <div className="author">
            <div className="author-img">
              <Image
                width={24}
                height={24}
                src={mitra.image}
                alt={mitra.name}
                className="object-cover"
              />
            </div>
            <span>{mitra.name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
);

EventCard.displayName = 'EventCard';

const Event = () => {
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['allEvent', searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getAllEvent({
        all: true,
        limit: 6,
        mode: 'pagination',
        page: pageParam,
        search: searchQuery,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    initialPageParam: 1,
  });

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const events = data?.pages.flatMap((page) => page.data.data);
  const activeEvents =
    events?.filter((event) => event.status !== 'inactive') || [];

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <Header text="Event Aksiberbagi" type="title" link="/" />
      <div className="content-wrapper content-sm container">
        <div
          className="h-[20rem] w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/img/event/img-bg.png)' }}
          role="img"
          aria-label="Event background"
        />
        <section className="sc-main sc-event bg-white min-h-screen">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="w-100 mb-15">
                  <div className="input-search">
                    <input
                      type="text"
                      className="form-control form-search"
                      placeholder="Cari Event"
                      value={tempSearchQuery}
                      onChange={(e) => setTempSearchQuery(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      className="btn-search"
                      aria-label="search"
                      onClick={handleSearch}
                    >
                      <FaSearch className="text-cyan" />
                    </button>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <SpinLoading />
              ) : activeEvents.length > 0 ? (
                <>
                  {activeEvents.map((event, index) => (
                    <EventCard key={`${event.link}-${index}`} {...event} />
                  ))}
                  {hasNextPage && activeEvents.length >= 6 && (
                    <div className="col-12 text-center mt-4">
                      <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="rounded-md hover:bg-primary-500 hover:text-white transition-all duration-300 border border-primary-500 px-4 py-2 text-primary-500 font-semibold mx-auto"
                      >
                        {isFetchingNextPage || isFetching
                          ? 'Loading...'
                          : 'Load More'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyData
                  title="Belum ada Event"
                  desc="Belum ada event yang tersedia"
                  img={null}
                  component={null}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Event;
