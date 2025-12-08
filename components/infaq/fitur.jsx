import React from 'react';
import { FaCalculator, FaEnvelopeOpen, FaMobileAlt } from 'react-icons/fa';

export const Fitur = () => {
  return (
    <div className="homepage-feature-wrapper size-xs">
      <div className="container">
        <div className="homepage-feature-content size-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="">
              <div className="homepage-feature-card transparent !p-0">
                <p>FITUR INFAK AKSI BERBAGI</p>
                <h1 className="!text-2xl md:!text-3xl">
                  Berinfak dengan Aksi Berbagi : Mudah, Fleksibel, dan Penuh
                  Berkah
                </h1>
                <a href="#" className="btn button-orange !mt-3">
                  Coba Sekarang
                </a>
              </div>
            </div>
            <div className="homepage-feature-card">
              <div className="feature-icon">
                <FaCalculator />
              </div>
              <h5>Mudah berinfak kapan saja & dimana saja</h5>
              <p>
                Cukup dengan beberapa ketukan di layar smartphone, Anda bisa
                menyalurkan infak dengan mudah. Tidak perlu lagi repot membawa
                uang tunai atau mencari kotak amal.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="feature-icon">
                <FaEnvelopeOpen />
              </div>
              <h5>Bisa Infak Mulai Rp 1.000</h5>
              <p>
                Anda dapat berinfak sesuai kemampuan, mulai dari jumlah yang
                kecil hingga besar. Tidak ada batasan minimal atau maksimal.
              </p>
            </div>
            <div className="homepage-feature-card">
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <h5>Transaksi Dijamin Aman</h5>
              <p>
                Sistem pembayaran yang terintegrasi dengan berbagai metode
                pembayaran populer menjamin keamanan setiap transaksi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
