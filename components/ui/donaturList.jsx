// components/DonaturList.js
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { currencyFormatter, donationTime, initialName } from '@/lib/formater';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { postLike } from '@/service/PostData';

export const DonaturList = ({ donor, programLink }) => {
  const [optimisticLike, setOptimisticLike] = useState({
    count: donor.liked || 0,
    hasLiked: false,
  });

  const mutation = useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      console.log('Like recorded successfully');
    },
    onError: (error) => {
      console.log('like error', error);
      setOptimisticLike((prev) => ({
        count: Math.max(0, prev.count - 1),
        hasLiked: false,
      }));
    },
  });

  const handleAamiin = (id) => {
    // Optimistic update - immediately show the like
    setOptimisticLike((prev) => ({
      count: prev.count + 1,
      hasLiked: true,
    }));

    // Disable the button temporarily to prevent multiple clicks
    const button = document.getElementById(`hati-${donor.id}`);
    if (button) {
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, 1000);
    }

    mutation.mutate(id);
  };

  return (
    <div className="donatur-row" key={donor.id}>
      <div className="donatur-box">
        <div className="image-wrap">
          <h4 className="!text-white text-lg">{initialName(donor.name)}</h4>
        </div>
        <div className="text-wrap">
          <div className="flex gap-3 items-center">
            <h4>{donor.name}</h4>
            {donor.source === 'RUTIN' && (
              <Link
                className="w-8 h-8 overflow-hidden cursor-pointer"
                href={`/donasi-rutin/program/${programLink}`}
              >
                <Image
                  src={'/img/icons/menu/6. Donasi rutin.webp'}
                  width={50}
                  height={50}
                  alt="Donasi Rutin"
                  className="w-full h-full object-contain"
                  data-tooltip-id="rutin-icon-tooltip"
                  data-tooltip-content="Donasi Rutin"
                  data-tooltip-place="right"
                />
                <Tooltip id="rutin-icon-tooltip" className="!text-sm py-2" />
              </Link>
            )}
          </div>
          <p>
            {donationTime(donor.time, donor.date)} Via {donor.bank_name}
          </p>
        </div>
        <div className="text-nominal">
          <p>{currencyFormatter(donor.nominal_donasi)}</p>
        </div>
      </div>

      {donor.doa && (
        <div className="donatur-comment !w-[90%]">
          <p>{donor.doa}</p>
          <div className="flex justify-between items-center mt-3 border-t pt-3">
            <div id={`amin-${donor.id}`} className="text-sm md:text-base">
              {optimisticLike.count === 0 ? (
                'Yuk aminkan doa saudara kita'
              ) : (
                <span>
                  {optimisticLike.count} <strong>orang </strong> mengaminkan doa
                  ini
                </span>
              )}
            </div>
            <button
              className={`btn !flex !text-base !gap-1 !min-w-[85px] items-center transition-all ${
                optimisticLike.hasLiked
                  ? 'button-cyan !text-white'
                  : 'button-border-cyan'
              }`}
              id={`hati-${donor.id}`}
              onClick={() => handleAamiin(donor.id)}
              disabled={optimisticLike.hasLiked}
            >
              <FaHeart
                size={16}
                className={optimisticLike.hasLiked ? 'text-white' : ''}
              />
              Aamiin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
