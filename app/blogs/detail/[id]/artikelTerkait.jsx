import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

export const ArtikelTerkait = () => {
  const articles = [
    {
      id: 1,
      title: 'Kenapa Kita Harus Menzakatkan Penghasilan?',
      imageUrl: '/img/post-image-2.png',
      link: 'blog-detail.html',
    },
    {
      id: 2,
      title: 'Kenapa Kita Harus Menzakatkan Penghasilan?',
      imageUrl: '/img/post-image-1.png',
      link: 'blog-detail.html',
    },
    {
      id: 3,
      title: 'Kenapa Kita Harus Menzakatkan Penghasilan?',
      imageUrl: '/img/post-image-2.png',
      link: 'blog-detail.html',
    },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    new Glide(sliderRef.current, {
      type: 'carousel',
      startAt: 0,
      perView: 1.2,
      autoplay: 2000,
      hoverpause: true,
    }).mount();
  }, []);
  return (
    <div className="content-body border-top">
      <p className="text-18 text-strong">Artikel Terkait</p>
      <div className="list-editor" id="blogList" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {articles.map((article) => (
              <li key={article.id} className="glide__slide">
                <a href={article.link} className="post-box">
                  <figure
                    className="post-image"
                    style={{
                      backgroundImage: `url(${article.imageUrl})`,
                    }}
                  />
                  <div className="post-text">
                    <div className="d-flex w-100 justify-content-end"></div>
                    <div className="post-bottom">
                      <h1 className="post-title">{article.title}</h1>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
