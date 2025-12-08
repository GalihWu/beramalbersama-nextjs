import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const MODAL_STORAGE_KEY = 'lastModalShown';
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export const ModalStart = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkAndShowModal = () => {
      const lastShown = localStorage.getItem(MODAL_STORAGE_KEY);
      const now = Date.now();

      if (!lastShown || now - parseInt(lastShown) >= ONE_HOUR) {
        // Delay 2 detik sebelum modal muncul
        const timer = setTimeout(() => {
          setShowModal(true);
          setIsAnimating(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    };

    checkAndShowModal();
  }, []);

  const handleCloseModal = () => {
    setIsAnimating(false);

    // Tunggu animasi selesai sebelum hide modal
    setTimeout(() => {
      setShowModal(false);
      // Simpan timestamp sekarang
      localStorage.setItem(MODAL_STORAGE_KEY, Date.now().toString());
    }, 300);
  };

  const handleContinueWebsite = () => {
    handleCloseModal();
  };

  if (!showModal) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-300
                   ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleCloseModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto
                     transform transition-all duration-300 ease-out
                     ${
                       isAnimating
                         ? 'scale-100 opacity-100'
                         : 'scale-95 opacity-0'
                     }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 
                       transition-colors duration-200 group"
            aria-label="Close modal"
          >
            <IoClose className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>

          {/* Modal Content */}
          <div className="p-6 md:p-8 text-center">
            {/* Image */}
            <div className="mb-6 flex justify-center">
              <div className="relative w-full h-auto">
                <Image
                  width={560}
                  height={560}
                  src="/img/sample/image-4-3.png"
                  alt="Beramal Bersama"
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              Gajimu berkah saat menjadi Amal Jariyah
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              Dukung Pembangunan Pondok Pesanteren Yatim & Dhuafa dengan donasi
              rutin
            </p>

            {/* Continue Button */}
            <button
              type="button"
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 
                       hover:from-orange-600 hover:to-orange-700 text-white font-semibold 
                       rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              onClick={handleContinueWebsite}
            >
              Tetap donasi di website
            </button>

            {/* Small Text */}
            <p className="text-xs text-gray-500 mt-4 hidden">
              Pop-up ini akan muncul kembali dalam 1 jam
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalStart;
