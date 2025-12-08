import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import Image from 'next/image';
import { FaEllipsisH, FaHeart } from 'react-icons/fa';

export const Review = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    new Glide(sliderRef.current, {
      type: 'carousel',
      startAt: 0,
      perView: 1.5,
      hoverpause: true,
    }).mount();
  }, []);

  // Array of review data
  const reviews = [
    {
      userName: 'Andri Irawan',
      campaignTitle: 'Buku untuk anak pal..',
      doaText:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. consectetur adipisicing.',
      amins: 999,
      imageUrl: '/img/user.jpg',
    },
    {
      userName: 'Andri Irawan',
      campaignTitle: 'Nama campaignnya nanti dir..',
      doaText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      amins: 10,
      imageUrl: '/img/user.jpg',
    },
    {
      userName: 'Andri Irawan',
      campaignTitle: 'Nama campaignnya nanti dir..',
      doaText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      amins: 10,
      imageUrl: '/img/user.jpg',
    },
    {
      userName: 'Andri Irawan',
      campaignTitle: 'Nama campaignnya nanti dir..',
      doaText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      amins: 10,
      imageUrl: '/img/user.jpg',
    },
  ];

  return (
    <div
      className="homepage-xs-main-content bg-lime border-b-5 position-relative"
      style={{ padding: '3rem 1rem' }}
    >
      <Image
        src="https://assets.kitabisa.cc/images/illustrations/illustration_tawasul_amiin.png"
        className="img-slider-absolute show"
        alt=""
        width={100}
        height={100}
      />
      <div className="homepage-editor-choice border-0 mb-0 pb-0">
        <div className="homepage-editor-choice-header">
          <div className="homepage-editor-choice-title">
            <h4>Doa-doa Orang Baik</h4>
          </div>
          <a href="donasi-two.html">Lihat Semua</a>
        </div>
        <div className="recommend-slider-half glide" ref={sliderRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {reviews.map((review, index) => (
                <li className="glide__slide" key={index}>
                  <div className="card-campaign-column bg-white">
                    <div className="card-doa-top">
                      <div className="img-rounded">
                        <Image
                          src={review.imageUrl}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="text">
                        <div className="nama">{review.userName}</div>
                        <a className="campaign" href="/donasi-detail.html">
                          {review.campaignTitle}
                        </a>
                      </div>
                      <button className="button-report">
                        <FaEllipsisH />
                      </button>
                    </div>
                    <div className="card-doa-text">
                      <div className="doa">{review.doaText}</div>
                      <span>
                        <strong>Anda &amp; {review.amins} Orang</strong>{' '}
                        mengaminkan doa ini
                      </span>
                    </div>
                    <button className="flex text-gray-400 hover:text-black justify-center gap-5 items-center py-3 w-full px-5">
                      <FaHeart /> <span>Aamiin</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
