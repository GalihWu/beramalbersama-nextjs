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
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/aksiberbagidotcom',
      label: 'Facebook',
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/aksiberbagicom',
      label: 'Instagram',
    },
    {
      icon: FaTiktok,
      href: 'https://www.tiktok.com/@aksiberbagicom',
      label: 'TikTok',
    },
    { icon: FaTwitter, href: 'https://x.com/aksiberbagicom', label: 'Twitter' },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@AksiberbagiIndonesia',
      label: 'YouTube',
    },
    {
      icon: FaWhatsapp,
      href: 'https://api.whatsapp.com/send?phone=6281912344745&text=Assalamu%27alaikum',
      label: 'WhatsApp',
    },
  ];

  return (
    <div className="w-full bg-gray-100 pb-[85px]">
      <div className="max-w-[640px] mx-auto">
        <div className="bg-white">
          <div className="pb-8 md:pb-12">
            {/* Main heading with gradient */}
            <div className="mb-8 bg-secondary-100 px-8 py-8">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-slate-700">
                Donasi Tanpa Batas, Kebaikan Tanpa Akhir.
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-center text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
                Aksiberbagi.com merupakan platform berbagi online, menghadirkan
                kenyamanan berbagi dengan mudah yang diberdayakan oleh Yayasan
                Aksi Berbagi.
              </p>
            </div>
            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10">
              <a
                href="/tentang"
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group"
              >
                Tentang Kami
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="/syarat-ketentuan"
                className="text-slate-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group"
              >
                Syarat &amp; Ketentuan
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-10">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300 hover:from-primary-600 hover:to-primary-600"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6"></div>

            {/* Copyright */}
            <p className="text-slate-600 font-semibold text-center text-sm md:text-base">
              © 2025 Yayasan Aksi Berbagi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
