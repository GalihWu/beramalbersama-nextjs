import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useData } from '@/context/DataContext';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const BigBanner = () => {
  const { berandaBanner } = useData();

  const banners = berandaBanner?.data || [];

  // Don't render if no banners
  if (!banners.length) return null;

  return (
    <div className="w-full py-4 md:py-6">
      <div className="relative w-full overflow-hidden rounded-lg md:rounded-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: '.banner-arrow-left',
            nextEl: '.banner-arrow-right',
          }}
          pagination={{
            el: '.banner-pagination',
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={banners.length > 1}
          className="w-full"
        >
          {banners.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link
                href={slide.link || '#'}
                className="block w-full"
                id="banner-link"
              >
                <Image
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  src={slide.image_url}
                  alt={slide.name || 'Banner'}
                  priority={false}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              className="banner-arrow-left absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-10 
                         flex items-center justify-center w-8 h-8 md:w-10 md:h-10 
                         bg-white/90 hover:bg-white rounded-full shadow-lg 
                         transition-all duration-300 hover:scale-110
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Previous slide"
            >
              <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
            <button
              className="banner-arrow-right absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-10 
                         flex items-center justify-center w-8 h-8 md:w-10 md:h-10 
                         bg-white/90 hover:bg-white rounded-full shadow-lg 
                         transition-all duration-300 hover:scale-110
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Next slide"
            >
              <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Pagination Bullets */}
        {banners.length > 1 && (
          <div
            className="banner-pagination absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-10 
                       flex items-center gap-2"
            id="banner-images-bullets"
          />
        )}
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .banner-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .banner-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: white;
          border-radius: 4px;
        }

        @media (min-width: 768px) {
          .banner-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }

          .banner-pagination .swiper-pagination-bullet-active {
            width: 32px;
          }
        }
      `}</style>
    </div>
  );
};
