import Image from 'next/image';
import React, { useState } from 'react';
// Pastikan untuk mengimpor file CSS

export const ModalStart = () => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <Image
                  width={560}
                  height={560}
                  src="/img/sample/image-4-3.png"
                  alt="Sample"
                />
                <h3>Sudah siap #BeramalBersama?</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, iure, deleniti harum reprehenderit accusantium
                  dignissimos.
                </p>
                <div className="download-wrapper">
                  <a
                    href="#"
                    style={{
                      backgroundImage: 'url(/img/btn-google-play.png)',
                    }}
                    className="download-button"
                  ></a>
                  <a
                    href="#"
                    style={{
                      backgroundImage: 'url(/img/btn-app-store.png)',
                    }}
                    className="download-button"
                  ></a>
                </div>
                <button
                  type="button"
                  className="btn button-orange w-100"
                  onClick={handleCloseModal}
                >
                  Tetap donasi di website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
