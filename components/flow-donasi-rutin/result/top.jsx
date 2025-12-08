import Image from 'next/image';
import React from 'react';

// const campaign = {
//   title: 'Lorem ipsum dolor sit amet, when you can',
//   client: 'Mas Fullan',
//   image: '/img/image-potrait-one.webp',
//   amountCollected: 'Rp. 9.999.999.999',
//   daysRemaining: 999,
//   progress: 25,
//   link: '/donasi-detail',
// };

export default function DonasiRutinSuksesTop({ type, campaign }) {
  let title, message, imageSrc;

  // console.log(campaign);

  switch (type) {
    case 'sukses':
      title = 'Pembayaran Donasi Rutin Sukses';
      message = (
        <div className="text-base md:text-lg">
          Pembayaran dan penjadwalan donasi rutin untuk program &nbsp;
          <span className="font-bold">{campaign}</span>
          <span className="text-primary-500 font-semibold">
            &nbsp;Berhasil Dilakukan
          </span>
        </div>
      );
      imageSrc = '/img/ilustrasi/sukses.webp';
      break;

    case 'pending':
      title = 'Pembayaran Donasi Rutin Sedang Menunggu Pembayaran';
      message = (
        <div className="text-base md:text-lg">
          Pembayaran dan penjadwalan donasi rutin untuk program &nbsp;
          <span className="font-bold">{campaign}</span>
          <span className="text-yellow-500 font-semibold">
            &nbsp;Sedang Diproses
          </span>
        </div>
      );
      imageSrc = '/img/ilustrasi/pending.webp';
      break;

    case 'gagal':
      title = 'Pembayaran Donasi Rutin Gagal';
      message = (
        <div className="text-base md:text-lg">
          Pembayaran dan penjadwalan donasi rutin untuk program &nbsp;
          <span className="font-bold">{campaign}</span>
          <span className="text-red-500 font-semibold">
            &nbsp;Gagal dilakukan
          </span>{' '}
        </div>
      );
      imageSrc = '/img/ilustrasi/gagal.webp';
      break;

    case 'berhenti':
      title = 'Pembayaran Donasi Rutin Berhenti';
      message = (
        <div className="text-base md:text-lg">
          Penjadwalan donasi rutin untuk program &nbsp;
          <span className="font-bold">{campaign}</span>
          <span className="text-red-500 font-semibold">
            &nbsp;Sudah Dihentikan
          </span>{' '}
        </div>
      );
      imageSrc = '/img/ilustrasi/gagal.webp';
      break;

    default:
      return null;
  }

  return (
    <div className="bg-white w-full py-[20px] px-[15px] lg:px-[20px] max-w-[640px] mx-auto">
      <p className="text-base md:text-lg leading-[18px] my-0 font-semibold text-center">
        {title}
      </p>
      <p className=" leading-[15px] text-[#4D4D4D] mt-3 mb-[10px] text-center sm:w-[80%] w-full mx-auto">
        {message} <br />
      </p>
      <div className="w-full flex justify-center items-center">
        <Image
          src={imageSrc}
          width={300}
          height={300}
          alt=""
          className="w-[20rem]"
        />
      </div>
      {/* <div className="block"> */}
      {/* <div className="hidden">
        <a className="card-campaign-row pb-0" href={campaign.link}>
          <figure
            className="card-campaign-image"
            style={{ backgroundImage: `url("${campaign.image}")` }}
          />
          <div className="card-campaign-text">
            <div className="card-campaign-title">{campaign.title}</div>
            <div className="card-campaign-client">
              {campaign.client}{' '}
              <Image
                width={300}
                height={300}
                src="/img/svg/icon__verified-user.svg"
                alt="icon"
                className="w-[12px]"
              />
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${campaign.progress}%` }}
                aria-valuenow={campaign.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="card-campaign-nominal">
              <div className="text-left">
                <p>Terkumpul</p>
                <h5>{campaign.amountCollected}</h5>
              </div>
              <div className="text-right">
                <p>Sisa Hari</p>
                <h5>{campaign.daysRemaining}</h5>
              </div>
            </div>
          </div>
        </a>
      </div> */}
    </div>
  );
}
