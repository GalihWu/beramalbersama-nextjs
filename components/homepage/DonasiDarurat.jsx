import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { getProgramShowOn } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { currencyFormatter } from '@/lib/formater';
import CampaignColumn from '../ui/skeleton/campaignColumn';
import Skeleton from '../ui/skeleton/skeleton';

export const DonasiDarurat = () => {
  const sliderRef = useRef(null);
  const glideInstanceRef = useRef(null);
  // Updated queryKey to be an array
  const { data, isLoading, error } = useQuery({
    queryKey: ['programDarurat'],
    queryFn: () => getProgramShowOn('darurat'),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    const getPerView = () =>
      window.matchMedia('(max-width: 480px)').matches ? 1.2 : 2.3;

    // let glideInstance;
    if (sliderRef.current) {
      glideInstanceRef.current = new Glide(sliderRef.current, {
        type: 'carousel',
        startAt: 0,
        perView: getPerView(),
        hoverpause: true,
      });
      glideInstanceRef.current.mount();
    }

    return () => {
      if (glideInstanceRef.current) {
        glideInstanceRef.current.destroy();
      }
    };
  }, [sliderRef, data]);

  if (isLoading)
    return (
      <div className="homepage-xs-main-content bg-lime pb-1">
        <div className="homepage-editor-choice border-0 mb-0">
          <div className="homepage-editor-choice-header">
            <div className="homepage-editor-choice-title w-100">
              <Skeleton height={30} width={200} />
              <p className="mb-0">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
              </p>
            </div>
          </div>
          <CampaignColumn />
        </div>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div className="homepage-xs-main-content bg-lime pb-1">
      <div className="homepage-editor-choice border-0 mb-0">
        <div className="homepage-editor-choice-header">
          <div className="w-100 homepage-editor-choice-title">
            <h4 className="m-0 font-bold">Donasi Mendesak</h4>
            <p className="m-0 text-lg">
              Mereka Membutuhkan Kita, Sekarang Juga!
            </p>
          </div>
        </div>
        <div className="recommend-slider-one glide" ref={sliderRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {data.data.map((campaign, index) => (
                <li
                  className="glide__slide"
                  key={index}
                  id="card-donasi-mendesak"
                >
                  <Link
                    className="card-campaign-column"
                    href={`/donasi/detail/${campaign.link}`}
                  >
                    <div
                      className="card-campaign-image"
                      style={{ backgroundImage: `url("${campaign.image}")` }}
                    />
                    <div
                      className="card-campaign-text"
                      style={{ width: '100%' }}
                    >
                      <div className="card-campaign-title">
                        {campaign.title}
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${campaign.progress_achieved}%` }}
                          aria-valuenow={campaign.progress_achieved}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <div className="card-campaign-nominal">
                        <div className="text-left">
                          <p>Terkumpul</p>
                          <h5>
                            {currencyFormatter(campaign.nominal_achieved)}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
