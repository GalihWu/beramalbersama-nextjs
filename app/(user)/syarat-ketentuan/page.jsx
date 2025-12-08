'use client';
import React from 'react';

import { Navbar } from '@/components/ui/navbar';
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/service/FetchData';

const Tentang = () => {
  // getSettings

  const { data, isLoading, error } = useQuery({
    queryKey: ['getSettings'],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <div className="homepage-list-xs mt-2"></div>;
  }

  if (error) {
    return (
      <div>An error occurred: {error?.message || 'Something went wrong.'}</div>
    );
  }
  const settings = data?.data ?? [];
  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <div
          className="banner-title"
          style={{ backgroundImage: 'url("/img/waves-cyan.svg")' }}
        >
          <div className="container">
            <p>Syarat & Ketentuan</p>
            <h1>{settings.company_name}</h1>
          </div>
        </div>
        <div className="container">
          <div className="box-content relative-top">
            <div className="content-body text-justify">
              <h4 className="font bold">Syarat & Ketentuan</h4>
              <p className="text-justify">
                <span className="font-bold">AksiBerbagi.com </span> Merupakan
                website dana atau aplikasi Donasi dan Penggalangan Dana secara
                Online. Melalui AksiBerbagi.com siapapun dapat berperan untuk
                mewujudkan kebaikan Bersama-sama.
              </p>
              <p className="text-justify">
                Sebagai bentuk menjaga orisinalitas, kebenaran / validitas
                konten dan juga kemanan dari setiap kampanye yang diajukan oleh
                Inisiator Kebaikan, maka Management AksiBerbagi.com mengeluarkan
                Ketentuan Umum dan Khusus terkait dengan Program yang dibuat
                oleh pihak Inisiator Kebaikan untuk di Release di website
                AksiBerbagi.com.
              </p>
              <br />
              <h6 className="font-bold">
                A. Syarat & Ketentuan Umum Inisiator Kebaikan AksiBerbagi.com
              </h6>

              <ol className="list-decimal pl-5 space-y-2 ">
                <li>
                  Inisiator Kebaikan menjamin dan menyatakan bahwa semua konten
                  baik tulisan, foto dan video yang dimasukkan ke situs
                  AksiBerbagi.com sesuai dengan fakta dan kebenaran yang dapat
                  dipertanggung jawabkan;
                </li>
                <li>
                  Jika program berbentuk karya/ide, maka Inisiator Kebaikan
                  menyatakan bahwa ide atau karya tersebut merupakan karya yang
                  orisinil atau dengan izin tertentu jika bersumber dari karya
                  pihak lain sebagaimana yang diatur dalam peraturan
                  perundang-undangan tentang Hak Kekayaan Intelektual yang
                  berlaku;
                </li>
                <li>
                  Donasi yang diperoleh Inisiator Kebaikan melalui Situs
                  dan/atau bentuk penggalangan dana lain yang dilakukan
                  Pengelola AksiBerbagi.com akan dipotong oleh pengelola sebesar
                  0-5% (lima persen) sesuai kesepakatan sebagai infak
                  pengembangan sistem dari total dana yang terhimpun.
                </li>
                <li>
                  Inisiator kebaikan melalui tim QC yang telah ditunjuk, wajib
                  melakukan Kontrol dan Monitoring secara rutin terkait dengan
                  Progress ajuan yang sudah dikirimkan melalui halaman Dashboard
                  Inisiator Kebaikan di website AksiBerbagi.com;
                </li>
                <li>
                  Inisiator Kebaikan berkewajiban untuk menyalurkan dana yang
                  telah tergalang di website AksiBerbagi.com setelah dana
                  diserahkan kepada Inisiator Kebaikan;
                </li>
                <li>
                  Inisiator Kebaikan berhak untuk bekerja sama dengan Mitra
                  Penyalur program yang telah terdaftar untuk menyalurkan
                  Melalui Proyek Kebaikan sesuai dengan pint 6 (enam);
                </li>
                <li>
                  Inisiator Kebaikan dan mitra penyalur program berkewajiban
                  untuk memberikan laporan terkini terkait pelaksanaan Proyek
                  Kebaikan secara transparan dan kredibel di website/aplikasi
                  AksiBerbagi.com;
                </li>
                <li>
                  Inisiator Kebaikan dan mitra penyalur program wajib memberikan
                  support kepada AksiBerbagi.com jika ada donatur yang meminta
                  laporan khusus seputar impelementasi Proyek Kebaikan program
                </li>
                <li>
                  Inisiator Kebaikan wajib menyertakan logo AksiBerbagi.com pada
                  saat implementasi program.
                </li>
                <li>
                  Apabila ada perjanjian kerjasama khusus antara Inisiator
                  Kebaikan dengan Pengelola AksiBerbagi.com, maka Inisiator
                  program Program wajib menjalankan kewajibannya sebagaimana
                  yang telah tertera pada perjanjian kerjasama tersebut;
                </li>
              </ol>
              <br />
              <h6 className="font-bold">
                B. Syarat & Ketentuan Khusus Inisiator Kebaikan AksiBerbagi.com
              </h6>
              <ol className="list-decimal pl-5 space-y-2 ">
                <li>
                  Apabila ada perjanjian kerjasama khusus antara Inisiator
                  Kebaikan dengan Pengelola AksiBerbagi.com, maka Pengelola
                  AksiBerbagi.com akan bertindak sebagaimana yang telah
                  diperjanjikan dalam perjanjian tersebut;
                </li>
                <li>
                  Tim AksiBerbagi.com berhak menolak/menunda verifikasi akun dan
                  pencairan donasi jika belum mendapatkan data-data yang cukup;
                </li>
                <li>
                  Pengelola AksiBerbagi.com hanya melakukan pencairan dana
                  kepada pihak Inisiator Kebaikan melalui Transfer ke rekening
                  yang sesuai dengan ketentuan pihak AksiBerbagi.com
                </li>
                <li>
                  Inisiator Kebaikan bertanggung jawab sepenuhnya terhadap
                  pelaksanaan program, penggunaan dana donasi, dan hal-hal lain
                  yang terkait dengan kampanye miliknya. Oleh karena itu
                  Inisiator Kebaikan menyatakan dan bersedia mengganti segala
                  kerugian yang dialami oleh Pengelola AksiBerbagi.com ,
                  termasuk membebaskan Pengelola AksiBerbagi.com dari setiap
                  tuntutan hukum yang timbul dikemudian hari atas hal-hal
                  berikut, namun tidak terbatas pada :
                </li>
                <ol
                  style={{ listStyleType: 'upper-roman' }}
                  className="space-y-2"
                >
                  <li>
                    Pelaksanaan kampanye yang tidak selesai, atau selesai tetapi
                    tidak sesuai dengan apa yang telah disampaikan kepada
                    Pengelola maupun yang telah disampaikan melalui Situs;
                  </li>
                  <li>
                    Penggelapan dana dan/atau penyalahgunaan donasi yang sudah
                    ditransfer oleh Pengelola Situs kepada pemilik program;
                  </li>
                  <li>
                    Segala perbuatan melanggar hukum lainnya yang terjadi baik
                    pada saat proses penggalangan dana dan/atau ketika
                    implementasi program;
                  </li>
                </ol>
              </ol>
              <br />

              <h6 className="font-bold">
                DISCLAIMER INISIATOR KEBAIKAN AKSIBERBAGI.COM
              </h6>
              <p>
                <ol className="list-decimal pl-5 space-y-2 ">
                  <li>
                    Menjamin dan menyatakan bahwa semua konten baik tulisan,
                    foto dan video yang dimasukkan ke AksiBerbagi.com sesuai
                    dengan fakta dan kebenaran yang dapat dipertanggung jawabkan
                  </li>
                  <li>
                    Bertanggung jawab sepenuhnya terhadap kampanye program yang
                    diajukan dan menjamin pengelolaan dana hingga tahap
                    implementasi kampanye program kepada penerima manfaat.
                  </li>
                  <li>
                    Siap melakukan kontrol dan monitoring terhadap program yang
                    telah diajukan
                  </li>
                  <li>
                    Siap memberikan laporan terkini terkait pelaksanaan kampanye
                    program secara transparan dan kredibel di website
                    AksiBerbagi.com
                  </li>
                  <li>
                    Siap memberikan keterangan atau laporan melalui
                    website/aplikasi apabila pelaksanaan kampanye program tidak
                    sesuai dengan rencana
                  </li>
                  <li>
                    Siap mengikuti segala syarat & ketentuan serta kebijakan
                    yang telah dibuat oleh pengelola situs AksiBerbagi.com
                  </li>
                  <li>
                    Siap bertanggung jawab jika terjadi penyalahgunaan dana
                    program yang telah diterima dan atau terjadi perbuatan
                    melanggar hukum lainnya, dan siap menerima tuntutan hukum
                    jika hal itu terjadi.
                  </li>
                  <li>
                    Siap membebaskan Pihak Pengelola AksiBerbagi.com dari setiap
                    tuntutan hukum yang timbul dikemudian hari akibat kelalaian
                    dalam mengelola kampanye yang telah diajukan.
                  </li>
                </ol>
              </p>
            </div>
            <div className="content-body border-top text-justify">
              <h5>Kebijakan Privasi</h5>
              <p>
                Ketentuan-ketentuan yang ada dalam halaman ini mengatur hal-hal
                menyangkut data-data para Pengguna Situs yang diberikan oleh
                para Pengguna Situs kepada Pengelola Situs dalam rangka
                pemanfaatan fasilitas, fitur, jasa, dan/atau layanan yang
                ditawarkan oleh Pengelola Situs melalui Situs AksiBerbagi.com.
                Ketentuan-ketentuan menyangkut data mengikat seluruh Pengguna
                Situs tanpa terkecuali untuk tunduk dan patuh atas
                ketentuan-ketentuan yang telah ditetapkan Pengelola Situs.
              </p>
              <br />
              <p>Berikut ini ketentuan-ketentuan menyangkut data tersebut:</p>
              <ol className="list-decimal pl-5 space-y-2 ">
                <li>
                  Atas data-data yang diberikan oleh para Pengguna Situs kepada
                  Pengelola Situs sebagai pemenuhan syarat atas pemanfaatan
                  fasilitas, fitur, jasa, dan/atau layanan yang ditawarkan oleh
                  Pengelola Situs, maka Pengelola Situs berkewajiban untuk:
                </li>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Menjaga kerahasiaan data-data para Pengguna yang tidak dapat
                    ditampilkan dalam Situs dan/atau diberikan kepada
                    pihak-pihak tertentu atas penggunaan jasa atau layanan Situs
                    selama tidak ada perjanjian tertulis terlebih dahulu kepada
                    Pengguna;
                  </li>
                  <li>
                    Kerahasiaan data Pengguna yang wajib dijaga oleh Pengelola
                    Situs menjadi tidak berlaku apabila Pengelola Situs dipaksa
                    oleh ketentuan hukum yang berlaku, perintah pengadilan,
                    dan/atau perintah dari aparat/instansi yang berwenang, untuk
                    membuka data-data milik Pengguna tersebut;
                  </li>
                </ul>
                <li>
                  Pengelola Situs hanya bertanggung jawab atas data yang
                  diberikan Pengguna Situs kepada Pengelola Situs sebagaimana
                  yang telah ditentukan pada ketentuan sebelumnya;
                </li>
                <li>
                  Pengelola Situs tidak bertanggung jawab atas pemberian atau
                  pertukaran data yang dilakukan sendiri antar Pengguna Situs;
                </li>
                <li>
                  Pengelola berhak untuk mengubah ketentuan menyangkut data-data
                  para Pengguna Situs tanpa pemberitahuan terlebih dahulu dengan
                  tanpa mengabaikan hak para Pengguna Situs untuk dijaga
                  kerahasiaan datanya sebagaimana yang telah ditentukan dalam
                  butir (1).
                </li>
              </ol>
            </div>
          </div>
        </div>
        <Navbar activeItem={'/'} />
      </div>
    </>
  );
};

export default Tentang;
