import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { useQuery } from '@tanstack/react-query';
import { getProgramShowOn } from '@/service/FetchData';
import Link from 'next/link';
import { currencyFormatter } from '@/lib/formater';
import CampaignColumn from '../ui/skeleton/campaignColumn';
import Skeleton from '../ui/skeleton/skeleton';

// const campaigns = [
//   {
//     image: "/img/card-image-one.webp",
//     title: "Sedekah Jariyah 10.000 Quran ke Penjuru Negeri",
//     collected: "Rp. 9.999.999.999",
//     progress: 25,
//   },
//   {
//     image: "/img/card-image-two.webp",
//     title: "#Sedekah Bantu Makan Santri Yatim Dhuafa",
//     collected: "Rp. 9.999.999.999",
//     progress: 25,
//   },
// ];

export const ProgramTerbaru = () => {
  const sliderRef = useRef(null);
  const glideInstanceRef = useRef(null);
  // Updated queryKey to be an array
  const { data, isLoading, error } = useQuery({
    queryKey: ['programRekomendasi'],
    queryFn: () => getProgramShowOn('rekomendasi'),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // const campaigns = data && Array.isArray(data) && data.length > 0 ? data : [];

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
      <div className="homepage-xs-main-content pb-1">
        <div className="homepage-editor-choice mb-0">
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
  // console.log(data);
  return (
    <div className="homepage-xs-main-content pb-1">
      <div className="homepage-editor-choice mb-0">
        <div className="homepage-editor-choice-header">
          <div className="w-100 homepage-editor-choice-title ">
            <h4 className="m-0 font-bold">Program Pilihan</h4>
            <p className="m-0 text-lg">Program Baru, Harapan Baru!</p>
          </div>
        </div>
        <div className="recommend-slider-two glide" ref={sliderRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {data.data.map((campaign, index) => (
                <li
                  className="glide__slide"
                  key={index}
                  id="card-donasi-pilihan"
                >
                  <Link
                    className="card-campaign-column"
                    href={`/donasi/detail/${campaign.link}`}
                  >
                    <figure
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
              {/* <li className="glide__slide">
                <a className="card-campaign-column" href="donasi-detail.html">
                  <figure
                    className="card-campaign-image"
                    style={{
                      backgroundImage: 'url("/img/card-image-one.webp")',
                    }}
                  />
                  <div className="card-campaign-text">
                    <div className="card-campaign-title">
                      Sedekah Jariyah 10.000 Quran ke Penjuru Negeri
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: '25%' }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="card-campaign-nominal">
                      <div className="text-left">
                        <p>Terkumpul</p>
                        <h5>Rp. 9.999.999.999</h5>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li className="glide__slide">
                <a className="card-campaign-column" href="donasi-detail.html">
                  <figure
                    className="card-campaign-image"
                    style={{
                      backgroundImage: 'url("/img/card-image-two.webp")',
                    }}
                  />
                  <div className="card-campaign-text">
                    <div className="card-campaign-title">
                      #Sedekah Bantu Makan Santri Yatim Dhuafa
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: '25%' }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="card-campaign-nominal">
                      <div className="text-left">
                        <p>Terkumpul</p>
                        <h5>Rp. 9.999.999.999</h5>
                      </div>
                    </div>
                  </div>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
