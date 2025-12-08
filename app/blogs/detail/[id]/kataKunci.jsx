import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export const KataKunci = ({ tags }) => {
  const route = useRouter();
  return (
    <div className="content-body border-top">
      {tags && tags.length > 0 && (
        <div className="blog-keyword">
          <p className="text-18 text-strong">Kata kunci pencarian:</p>
          <p>
            {tags.map((tag, index) => (
              <span key={index}>#{tag.nama}</span>
            ))}
          </p>
        </div>
      )}
      <div className="blog-share">
        <p className="text-18 text-strong">Bagikan Artikel:</p>
        <div className="d-flex">
          <button className="badge-share flex gap-3 blue">
            <FaFacebookF />
            Share
          </button>
          <button className="badge-share flex gap-3 green">
            <FaWhatsapp />
            Share
          </button>
          <button className="badge-share flex gap-3 cyan">
            <FaTwitter />
            Tweet
          </button>
        </div>
      </div>

      <Image
        src={'/img/banner/Thumbnail-payment-1.webp'}
        width={300}
        height={300}
        alt=""
        className="w-full my-3 rounded"
        onClick={() => route.push('/donasi')}
      />
    </div>
  );
};
