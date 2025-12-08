'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getHomeBanner } from '@/service/FetchData';
import Skeleton from '../ui/skeleton/skeleton';

export const ImgSlide = () => {
  const sliderRef = useRef(null);
  const glideInstanceRef = useRef(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ['infaqBanner'],
    queryFn: getHomeBanner,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    // Hanya buat instance Glide jika sliderRef.current sudah tersedia
    if (sliderRef.current) {
      glideInstanceRef.current = new Glide(sliderRef.current, {
        type: 'slider',
        startAt: 0,
        perView: 1,
        autoplay: true,
        hoverpause: true,
      }).mount();
    }

    return () => {
      if (glideInstanceRef.current) {
        glideInstanceRef.current.destroy();
      }
    };
  }, [sliderRef, data]);

  if (isLoading)
    return (
      <div
        className="homepage-hero-xs"
        style={{ backgroundImage: 'url("/img/waves-cyan.svg")' }}
      >
        <div className="container">
          <Skeleton className="w-full h-[16rem] sm:h-[24rem] rounded-md" />
        </div>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div
      className="homepage-hero-xs"
      style={{ backgroundImage: 'url("/img/waves-cyan.svg")' }}
    >
      <div className="container">
        <div className="banner-hero glide" ref={sliderRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {data && (
                <li className="glide__slide">
                  <a href="#">
                    <Image
                      width={500}
                      height={500}
                      src={data.data.image_url}
                      alt={data.data.name}
                    />
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="glide__arrows hidden" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left btn button-icon icon-slider-round"
              data-glide-dir="<"
            >
              <FaArrowLeft />
            </button>
            <button
              className="glide__arrow glide__arrow--right btn button-icon icon-slider-round"
              data-glide-dir=">"
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {Array.isArray(data) &&
              data.map((_, index) => (
                <button
                  key={index}
                  className="glide__bullet"
                  data-glide-dir={`=${index}`}
                />
              ))}
          </div>
        </div>
        <div className="text-hero-wraper hidden">
          <div className="row">
            <div className="col-6">
              <div className="text-hero-item">
                <h1>Rp 9.000.000</h1>
                <p>Dana Infaq Terkumpul</p>
              </div>
            </div>
            <div className="col-6">
              <div className="text-hero-item">
                <h1>999+</h1>
                <p>Orang Baik</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
