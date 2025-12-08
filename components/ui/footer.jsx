// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';

export const Footer = () => {
  return (
    <div
      className="homepage-content-wrapper size-xs"
      style={{
        transform: 'translateY(-40px)',
      }}
    >
      <div className="container">
        <div className="footer-xs bg-white">
          <div className="m-0 font-semibold text-center text-lg md:text-xl mb-3">
            Donasi Tanpa Batas, Kebaikan Tanpa Akhir.
          </div>
          {/* <div className="my-2 sm:my-3 text-base md:text-lg text-center font-medium">
            Hidupkan semangat berbagi, <br />
            unduh aplikasi Aksiberbagi untuk kenyamanan berdonasi
          </div>
          <div className="download-wrapper">
            <Link href="#" id="btn-google-play">
              <Image
                alt="google-play"
                src="/img/btn-google-play.png"
                width={500}
                height={500}
                className="w-full"
              />
            </Link>
            <Link href="#" className="hidden">
              <Image
                alt="app-store"
                src="/img/btn-app-store.png"
                width={500}
                height={500}
                className="w-full"
              />
            </Link>
          </div> */}
          <div className="w-[90%] mx-auto text-center mb-3">
            <span className="font-semibold text-green">Aksiberbagi.com</span>
            &nbsp; merupakan paltform berbagi online, menghadirkan kenyamanan
            berbagi dengan mudah yang diberdayakan oleh Yayasan Aksi Berbagi.
          </div>
          {/* <Link href="#">
            <Image
              src="/img/thumbnail/kebaikan-berkelanjutan1.webp"
              alt=""
              width={1000}
              height={1000}
              className="rounded-md w-full mb-4"
            />
          </Link> */}
          <div className="footer-menu-xs">
            <a href="/tentang">Tentang Kami</a>
            <a href="/syarat-ketentuan">Syarat &amp; Ketentuan</a>
            {/* <a href="#">Pusat Bantuan</a> */}
          </div>

          <div className="footer-social-media size-xs flex gap-4">
            <Link
              className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
              style={{ backgroundColor: '#4eb6ae' }}
              href="https://www.facebook.com/aksiberbagidotcom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} className="text-white " />
            </Link>
            <Link
              className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
              style={{ backgroundColor: '#4eb6ae' }}
              href="https://www.instagram.com/aksiberbagicom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} className="text-white " />
            </Link>
            <Link
              className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
              style={{ backgroundColor: '#4eb6ae' }}
              href="https://www.tiktok.com/@aksiberbagicom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok size={20} className="text-white " />
            </Link>
            <Link
              className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
              style={{ backgroundColor: '#4eb6ae' }}
              href="https://x.com/aksiberbagicom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} className="text-white " />
            </Link>
            <Link
              className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
              style={{ backgroundColor: '#4eb6ae' }}
              href="https://www.youtube.com/@AksiberbagiIndonesia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} className="text-white " />
            </Link>
            <Link
              className="w-[30px] h-[30px] items-center flex justify-center rounded-full items-cente"
              style={{ backgroundColor: '#4eb6ae' }}
              href="https://api.whatsapp.com/send?phone=6281912344745&text=Assalamu%27alaikum"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} className="text-white " />
            </Link>
          </div>
          <div
            className="footer-copyright size-xs"
            style={{ marginBottom: '0' }}
          >
            <p className="font-bold">© 2025 Yayasan Aksi Berbagi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
