import Image from 'next/image';
import React from 'react';

export const ModalKategori = () => {
  return (
    <div
      className="modal modal-category size-xs fade"
      id="modalCategory"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="staticBackdropLabel">
              Pilih Kategori Program
            </h4>
            <button
              type="button"
              className="btn button-icon button-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="modal-body">
            <div className="homepage-category">
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-kemanusiaan.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Kemanusiaan</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-medis.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">
                  Bantuan Medis &amp; Kesehatan
                </div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-pendidikan.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Bantuan Pendidikan</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-bencana.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Bencana</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-lingkungan.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Linkungan</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-balita.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Balita &amp; Anak Sakit</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-kategori-kegiatansosial.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Kegiatan Sosial</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-infrastruktur.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Infrastuktur Umum</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-art.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">
                  Karya Kreatif &amp; Modal Usaha
                </div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-hewan.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Menolong Hewan</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-masjid.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Rumah Ibadah</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-difabel.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Difabel</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-zakat.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Zakat</div>
              </a>
              <a className="button-category" href="#">
                <div className="category-box">
                  <Image
                    width={16}
                    height={16}
                    src="/img/svg/icon-panti_asuhan.png"
                    alt="kemanusian"
                  />
                </div>
                <div className="category-text">Panti Asuhan</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
