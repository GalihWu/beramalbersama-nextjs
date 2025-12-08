'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useFormStore from '@/stores/FormStore';
import { sendPageViewEvent } from '@/lib/pixels';
import { PiShareNetworkFill } from 'react-icons/pi';
// import { capitalizeFirstLetter } from '@/lib/formater';

// component
import Header from '@/components/ui/header';
import { ImgDonasi } from './imgDonasi';
import { ProfilDonasi } from '@/components/donasi-detail/profilDonasi';
import { Cerita } from '@/components/donasi-detail/cerita';
import { Donatur } from '@/components/donasi-detail/donatur';
import { Fundraiser } from '@/components/donasi-detail/fundraiser';
import { Salur } from '@/components/donasi-detail/salur';
import { ModalShare } from '@/components/modal/ModalShare';

const DonasiDetail = ({ program, salur, donatur, fundraiser }) => {
  const router = useRouter();
  const [sticky, setSticky] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [active, setActive] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showModalShare, setShowModalShare] = useState(false);
  const searchParams = useSearchParams();
  const reffCode = searchParams.get('reff_code');
  const leads = searchParams.get('leads');

  const { updateFormData, clearFormData } = useFormStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reff_code = localStorage.getItem('save_reff_code');
      setShareUrl(window.location.href + '?reff_code=' + reff_code);
    }
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (reffCode) {
      localStorage.setItem('reffCode', reffCode);
    }
    if (leads) {
      localStorage.setItem('leads', leads);
    }

    clearFormData();
    sendPageViewEvent();
  }, [reffCode, leads, clearFormData]);

  const handleChange = useCallback(
    (id, link) => {
      updateFormData({
        type: 'donation',
        program_type: 'infaq',
        items: [id],
      });

      router.push(`/donasi/detail/${link}/form2?id=${id}`);
    },
    [updateFormData, router]
  );

  const detailDonasi = useMemo(() => program?.data, [program]);

  useEffect(() => {
    if (detailDonasi) {
      setActive(detailDonasi.status === 'PUBLISH');
    }
  }, [detailDonasi]);

  return (
    <>
      <Header type="title" text={detailDonasi?.title} link="/" />
      <div className="content-wrapper bg-grey">
        <div className="container mb-24">
          {sticky && (
            <div className="sticky-download">
              <p>
                Untuk pengalaman user yang lebih baik silahkan buka lewat
                <a href="#"> Aplikasi Aksi Berbagi</a>
              </p>
              <button
                className="btn button-icon button-menu"
                onClick={() => setSticky(false)}
              >
                <FaTimes />
              </button>
            </div>
          )}

          <ImgDonasi
            active={active}
            detailDonasi={detailDonasi}
            handleChange={handleChange}
          />

          <ProfilDonasi
            programLink={detailDonasi.link}
            detailMitra={detailDonasi.mitra}
            projekSalur={detailDonasi.last_two_projects}
          />

          <Cerita story={detailDonasi.content} date={detailDonasi.updated_at} />

          {(salur?.data[0] || salur?.news[0]) && (
            <Salur salur={salur} programLink={detailDonasi.link} />
          )}
          <Donatur
            donatur={donatur}
            programLink={detailDonasi.link}
            // totalDonors={detailDonasi.total_donors}
          />

          <Fundraiser
            fundraiser={fundraiser}
            programLink={detailDonasi.link}
            // totalFr={detailDonasi.total_donors}
          />
        </div>

        <div
          className={`donate-sticky animate-fade-up ${
            showStickyButton ? '' : 'hidden'
          }`}
        >
          <div className="container">
            <div className="donate-sticky-content shadow-sm flex gap-3">
              {detailDonasi.is_rutin && active ? (
                <Link
                  id="btn-rutin-dp"
                  href={`/donasi-rutin/program/${detailDonasi.link}`}
                  className="btn button-border-cyan"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: '50%',
                  }}
                >
                  <FaCalendarAlt /> Donasi Rutin
                </Link>
              ) : (
                <div
                  id="btn-share-dp"
                  className="btn button-border-cyan"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    width: '50%',
                  }}
                  onClick={() => setShowModalShare(true)}
                >
                  <PiShareNetworkFill size={22} /> Bagikan
                </div>
              )}
              <button
                id="btn-donasi-sekarang"
                className="btn button-orange cursor-pointer !font-medium"
                onClick={() =>
                  active && handleChange(detailDonasi.id, detailDonasi.link)
                }
                disabled={!active}
              >
                {active ? 'DONASI SEKARANG' : 'Belum Dibuka'}
                {/* {active
                ? `${capitalizeFirstLetter(detailDonasi.type)} Sekarang!`
                : 'Belum Dibuka'} */}
              </button>
            </div>
          </div>
        </div>

        {showModalShare && (
          <ModalShare
            closeModalShare={() => setShowModalShare(false)}
            show={showModalShare}
            shareUrl={shareUrl}
            whatsappMessage=""
          />
        )}
      </div>
    </>
  );
};

export default DonasiDetail;
