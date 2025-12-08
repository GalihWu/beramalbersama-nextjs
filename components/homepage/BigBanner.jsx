import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { getBerandaBanner } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../ui/skeleton/skeleton';

export const BigBanner = () => {
  const sliderRef = useRef(null);
  const glideInstanceRef = useRef(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ['berandaBanner'],
    queryFn: getBerandaBanner,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    // Hanya buat instance Glide jika sliderRef.current sudah tersedia
    if (sliderRef.current) {
      glideInstanceRef.current = new Glide(sliderRef.current, {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        autoplay: 4000,
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
      <div className="homepage-xs-banner">
        <Skeleton width="100%" height="361px" />
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="homepage-xs-banner">
      <div className="banner-images glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides" id="banner-images-items">
            {data &&
              data.data.map((slide) => (
                <li key={slide.id} className="glide__slide" id="banner-link">
                  <a
                    href={slide?.link}
                    className="!w-full flex justify-center h-fit"
                  >
                    <Image
                      width={500}
                      height={500}
                      className="object-fill w-full h-auto"
                      src={slide.image_url}
                      alt={slide.image}
                    />
                  </a>
                </li>
              ))}
            {/* <li className="glide__slide">
              <a href="#">
                <Image
                  width={500}
                  height={500}
                  src="/img/big-banner-home.webp"
                  alt=""
                />
              </a>
            </li> */}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left btn button-icon icon-slider-round"
            data-glide-dir="<"
            style={{ display: 'flex' }}
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            className="glide__arrow glide__arrow--right btn button-icon icon-slider-round"
            data-glide-dir=">"
            style={{ display: 'flex' }}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
        <div
          className="glide__bullets"
          data-glide-el="controls[nav]"
          id="banner-images-bullets"
        ></div>
      </div>
    </div>
  );
};
