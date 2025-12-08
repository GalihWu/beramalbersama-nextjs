import React from 'react';

import Header from '@/components/ui/header';
import Image from 'next/image';

const DonasiDetailAktivitas = () => {
  return (
    <>
      <Header type="title" text="Aktivitas" />
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="copyToast"
      >
        <div className="d-flex">
          <div className="toast-body">Disalin ke Clipboard</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="donate-body-wrapper shadow-sm">
            <div className="donate-body-title">
              <h5>Aktivitas Terbaru</h5>
            </div>
            <div className="donate-body-content pb-0">
              <ul className="activity-timeline">
                <li>
                  <div className="donatur-row">
                    <div className="donatur-box justify-content-start">
                      <div className="image-wrap">
                        <Image
                          width={500}
                          height={500}
                          src="/img/donatur.jpeg"
                          alt="donatur"
                        />
                      </div>
                      <div className="text-wrap">
                        <h4>Nama Profil</h4>
                        <p>10 Hari Lalu</p>
                      </div>
                    </div>
                  </div>
                  <Image
                    width={500}
                    height={500}
                    src="/img/donate-one.jpeg"
                    className="img-fluid"
                    alt="update penyaluran program renovasi masjid pelosok"
                  />
                  <h6>Update Penyaluran Program Renovasi Masjid Pelosok</h6>
                  <p>
                    Berikut laporan detail masjid-masjid yang sudah tim
                    aksiberbagi salurkan baik renovasi maupun pembangunan masjid
                    di daerah pelosok.
                  </p>
                </li>
                <li className="bg-cyan">
                  <div className="donatur-row">
                    <div className="donatur-box justify-content-start">
                      <div className="image-wrap">
                        <Image
                          width={500}
                          height={500}
                          src="/img/donatur.jpeg"
                          alt="donatur"
                        />
                      </div>
                      <div className="text-wrap">
                        <h4>Nama Profil</h4>
                        <p>10 Hari Lalu</p>
                      </div>
                    </div>
                  </div>
                  <h6>
                    Pencairan Dana Rp 44.089.815 ke rekening BRI *** **** ****
                    **** 6535 a/n SAEFUL HIDAYAT
                  </h6>
                  <p>
                    Rencana Penggunaan Dana Pencairan : Bismillahirrahmanirrahim
                    dana ini langsung di salurkan ke rekening bendahara mesjid
                    yaitu bpk ustadz Saepul Hidayat, dan Dana ini akan langsung
                    di alokasikan untuk membeli bahan-bahan bangunan yang di
                    butuhkan untuk pembangunan mesjid di kampung kami.ucapan
                    terimakasih kepada semua orang-orang baik dan para ibu-ibu
                    dan bapak-bapak juga teman-teman atas DONASI yang sudah di
                    DONASIKAN untuk pembangunan mesjid di kampung kami semoga
                    menjadi amal ibadah kita di dunia dan akhirat amin,Dan tak
                    lupa terimakasih kami kepada seluruh orang-orang baik yang
                    bekerja di aplikasi kitabisa.com karena berkat aplikasi ini
                    masyarakat kami disini bisa membangun sarana tempat ibadah.
                  </p>
                </li>
                <li>
                  <div className="donatur-row">
                    <div className="donatur-box justify-content-start">
                      <div className="image-wrap">
                        <Image
                          width={500}
                          height={500}
                          src="/img/donatur.jpeg"
                          alt="donatur"
                        />
                      </div>
                      <div className="text-wrap">
                        <h4>Nama Profil</h4>
                        <p>10 Hari Lalu</p>
                      </div>
                    </div>
                  </div>
                  <h6>Box dengan Click To Action</h6>
                  <p>
                    Berikut laporan detail masjid-masjid yang sudah tim
                    aksiberbagi salurkan baik renovasi maupun pembangunan masjid
                    di daerah pelosok.
                  </p>
                  <a className="btn button-cyan">CLICK TO ACTION</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonasiDetailAktivitas;
