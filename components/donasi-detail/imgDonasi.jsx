import React, { useEffect, useRef, useState } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCaretDown,
  FaCaretUp,
  FaUser,
} from 'react-icons/fa';
import { capitalizeFirstLetter, currencyFormatter } from '@/lib/formater';

export const ImgDonasi = ({ detailDonasi, handleChange, active }) => {
  const [type, setType] = useState('');
  const sliderRef = useRef(null);
  const [detail, setDetail] = useState(false);

  const handleDetail = () => {
    setDetail((prevDetail) => !prevDetail);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const glideInstance = new Glide(sliderRef.current, {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        autoplay: false,
        hoverpause: true,
      });
      glideInstance.mount();
    }
  }, [detailDonasi]);

  useEffect(() => {
    setType(capitalizeFirstLetter(detailDonasi?.type));
  }, [detailDonasi?.type]);

  return (
    <div className="homepage-xs-banner bg-white">
      {detailDonasi?.video ? (
        <div className="banner-images glide" ref={sliderRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {/* Conditional rendering for main image */}
              <li className="glide__slide" key="1">
                <a href="#">
                  <Image
                    alt={detailDonasi?.title || 'Image'}
                    // priority={true}
                    src={detailDonasi?.image}
                    placeholder="empty"
                    width={500}
                    height={500}
                    priority
                    loading="eager"
                    quality={75}
                    className="!w-full !h-auto !max-h-[500px]"
                  />
                </a>
              </li>

              <li className="glide__slide">
                <iframe
                  width="100%"
                  height="auto"
                  style={{
                    maxHeight: '360px',
                  }}
                  src={detailDonasi?.video || ''}
                  title={detailDonasi?.title || 'Video'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </li>
            </ul>
          </div>

          {detailDonasi?.video && (
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
          )}
          <div
            className="glide__bullets"
            data-glide-el="controls[nav]"
            id="banner-images-bullets"
          ></div>
        </div>
      ) : (
        <div className="banner-images">
          {detailDonasi?.image && (
            <a href="#">
              <Image
                alt={detailDonasi?.title || 'Image'}
                // priority={true}
                src={detailDonasi?.image}
                width={500}
                height={500}
                loading="eager"
                priority
                quality={75}
                className="!w-full !h-auto !max-h-[500px]"
              />
            </a>
          )}
        </div>
      )}

      {/* bottom */}
      <div className="donate-header-text">
        <div className="donate-header-upper">
          <div className="text-xl font-semibold md:text-2xl mb-3">
            {detailDonasi?.title}
          </div>

          <div className="donate-nominal-text flex justify-between">
            <h4 className="flex flex-col gap-2">
              <span>Saldo {type} </span>
              {currencyFormatter(
                detailDonasi?.nominal_achieved - detailDonasi?.nominal_used || 0
              )}
              {/* rumus manual saldo donasi */}
            </h4>

            {/* <h4 className="flex flex-col gap-2 text-end">
              <span>Target {type} </span>
              {currencyFormatter(detailDonasi?.nominal_target || 0)}
            </h4> */}
            <div
              id="lihat-semua"
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleDetail}
            >
              {detail ? (
                <>
                  Tutup <FaCaretUp />
                </>
              ) : (
                <>
                  Lihat Semua <FaCaretDown />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${detailDonasi?.progress_achieved}%` }}
            aria-valuenow={detailDonasi?.progress_achieved}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="donate-header-nominal">
          <div className="text-left">
            <h5 className="flex gap-2 items-center">
              <FaUser />
              {detailDonasi?.total_donors || 0} <span>Donatur</span>
            </h5>
          </div>
          <div className="text-right">
            <h5>
              {detailDonasi?.remaining_days || 0} <span>hari Lagi</span>
            </h5>
          </div>
        </div>

        {/* detail */}
        <div
          className={`donate-header-info mb-2 ${!detail ? 'd-none' : ''}`}
          id="donateInfoDiv"
        >
          <h4 className="text-green">Informasi Lainnya</h4>
          <div className="flex justify-between">
            <div>
              <div className="info-row">
                <p>Target {type}</p>
                <h4>{currencyFormatter(detailDonasi?.nominal_target || 0)}</h4>
              </div>
              <div className="info-row">
                <p>{type} Terkumpul</p>
                <h4>
                  {currencyFormatter(detailDonasi?.nominal_achieved || 0)}
                </h4>
              </div>
            </div>

            <div>
              <div className="info-row">
                <p>{type} Tersalur</p>
                <h4>
                  {currencyFormatter(
                    Math.max(
                      detailDonasi?.nominal_used || 0,
                      detailDonasi?.nominal_by_news || 0
                    )
                  )}
                </h4>
              </div>
              <div className="info-row">
                <p>Penerima Manfaat</p>
                <h4>
                  {Math.max(
                    detailDonasi?.total_beneficiery || 0,
                    detailDonasi?.beneficiery_by_news || 0
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
        {active ? (
          <button
            id="btn-donasi-detail"
            className="btn button-orange w-full !font-medium"
            onClick={() => handleChange(detailDonasi.id, detailDonasi?.link)}
          >
            DONASI SEKARANG
          </button>
        ) : (
          <button
            id="btn-donasi-detail"
            className="btn button-orange w-100"
            disabled
          >
            {type} Belum Dibuka
          </button>
        )}
      </div>
    </div>
  );
};

{
  /* <button
            id="btn-donasi-detail"
            className="btn button-orange w-100"
            onClick={() => handleChange(detailDonasi.id, detailDonasi?.link)}
          >
            {detailDonasi.title.includes('Qurban')
              ? 'Qurban Sekarang'
              : capitalizeFirstLetter(type) + 'Sekarang!'}
          </button> */
}
