import React, { useState } from 'react';

// Component
import { KategoriDonasi } from '@/components/homepage/KategoriDonasi';
import { DonasiDarurat } from '@/components/homepage/DonasiDarurat';
import { ProgramTerbaru } from '@/components/homepage/ProgramTerbaru';
import { BigBanner } from '@/components/homepage/BigBanner';
import { TipeDonasi } from '@/components/homepage/TipeDonasi';
import { DonasiList } from '@/components/homepage/DonasiList';
import { Modal } from '@/components/homepage/Modal';
// import { ModalStart } from "@/components/homepage/ModalStart";
// import { Review } from '@/components/homepage/Review';

// import { useQuery } from "@tanstack/react-query";
// import { getProgramCategory } from "@tanstack/react-query";
// import { getProgramCategory } from "@/service/FetchData";

export const HomePageContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('Semua');

  const handleCategory = (category) => {
    setCategory(category);
  };

  return (
    <div
      className="homepage-content-wrapper size-xs"
      style={{ paddingBottom: '2rem' }}
    >
      <div className="container">
        <KategoriDonasi />
        <DonasiDarurat />
        <ProgramTerbaru />
        <div className="homepage-xs-main-content">
          <BigBanner />
          <TipeDonasi
            toggleModal={() => setShowModal(true)}
            handleCategory={handleCategory}
          />
          <DonasiList category={category} />
        </div>
        {/* <Review /> */}
      </div>
      {/* Modal */}
      {showModal && (
        <Modal
          handleCategory={handleCategory}
          closeModal={() => setShowModal(false)}
        />
      )}
      {/* <ModalStart /> */}
    </div>
  );
};
