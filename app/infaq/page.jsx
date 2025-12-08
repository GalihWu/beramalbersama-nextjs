import React from 'react';

// Component
import { Navbar } from '@/components/ui/navbar';
import { ImgSlide } from '@/components/infaq/imgSlide';
import { Pembayaran } from '@/components/infaq/pembayaran';
import { Fitur } from '@/components/infaq/fitur';
import { Footer } from '@/components/ui/footer';
import Header from '@/components/ui/header';

const Infaq = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <ImgSlide />
        <Pembayaran />
        <Fitur />
        <Footer />
        <Navbar activeItem="/infaq" />
      </div>
    </>
  );
};

export default Infaq;
