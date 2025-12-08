import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Link from 'next/link';
export const DonasiTerbaru = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const getPerView = () => {
      return window.matchMedia('(max-width: 480px)').matches ? 1.6 : 2.3;
    };
    new Glide(sliderRef.current, {
      type: 'carousel',
      startAt: 0,
      perView: getPerView(),
      hoverpause: true,
    }).mount();
  }, []);

  return (
    <div className="homepage-editor-choice pb-0 mb-0">
      <div className="homepage-editor-choice-header">
        <div className="homepage-editor-choice-title">
          <h4>Terbaru di Aksi Berbagi</h4>
        </div>
        <Link href="/donasi">Selengkapnya</Link>
      </div>
      <div className="recommend-slider glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <Link className="card-campaign-column" href="/donasi-detail">
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
              </Link>
            </li>
            <li className="glide__slide">
              <Link className="card-campaign-column" href="/donasi-detail">
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
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
