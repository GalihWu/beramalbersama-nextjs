'use client';

import React from 'react';
// import React, { useEffect, useRef } from 'react';
// import Glide from '@glidejs/glide';
import Image from 'next/image';
import { getHomeBanner } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../ui/skeleton/skeleton';
import { FloatCard } from '@/components/homepage/FloatCard';
import Link from 'next/link';

export const BannerSlide = () => {
  // const sliderRef = useRef(null);
  // const glideInstanceRef = useRef(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ['homeBanner'],
    queryFn: getHomeBanner,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // useEffect(() => {
  //   if (sliderRef.current && data) {
  //     if (glideInstanceRef.current) {
  //       glideInstanceRef.current.destroy();
  //     }
  //     glideInstanceRef.current = new Glide(sliderRef.current, {
  //       type: 'slider',
  //       startAt: 0,
  //       perView: 1,
  //       autoplay: true,
  //       hoverpause: true,
  //     }).mount();
  //   }

  //   return () => {
  //     if (glideInstanceRef.current) {
  //       glideInstanceRef.current.destroy();
  //     }
  //   };
  // }, [data]);

  // console.log(data);

  if (isLoading)
    return (
      <div className="homepage-banner-one">
        <div className="container position-relative">
          <Skeleton className="w-full h-[223px] md:h-[336px]" />
        </div>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="homepage-banner-one">
      <div className="container position-relative">
        <div className="banner-hero glide">
          {/* <div className="banner-hero glide" ref={sliderRef}> */}
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {data && (
                <li className="glide__slide">
                  <Link href={data.data.link}>
                    <Image
                      width={500}
                      height={500}
                      src={data.data.image_url}
                      alt={data.data.name}
                      quality={75}
                      priority
                    />
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* <div className="glide__bullets" data-glide-el="controls[nav]">
            {Array.isArray(data) &&
              data.map((_, index) => (
                <button
                  key={index}
                  className="glide__bullet"
                  data-glide-dir={`=${index}`}
                />
              ))}
          </div> */}
        </div>
        <FloatCard />
      </div>
    </div>
  );
};
