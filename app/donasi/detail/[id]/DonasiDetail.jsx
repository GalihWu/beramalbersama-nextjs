'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useFormStore from '@/stores/FormStore';
import { sendPageViewEvent } from '@/lib/pixels';
import { PiShareNetworkFill } from 'react-icons/pi';

// Components
import Header from '@/components/ui/header';
import { ImgDonasi } from './imgDonasi';
import { ProfilDonasi } from './profilDonasi';
import { Cerita } from '@/components/donasi-detail/cerita';
import { Donatur } from '@/components/donasi-detail/donatur';
import { Fundraiser } from '@/components/donasi-detail/fundraiser';
import { Salur } from '@/components/donasi-detail/salur';
import { ProjectShow } from '@/components/donasi-detail/projectShow';

import { ModalShare } from '@/components/modal/ModalShare';

const DonasiDetail = ({ program, salur, donatur, fundraiser, project }) => {
  const router = useRouter();
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [active, setActive] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showModalShare, setShowModalShare] = useState(false);
  const [activeTab, setActiveTab] = useState('cerita'); // State untuk tab aktif
  const searchParams = useSearchParams();
  const reffCode = searchParams.get('reff_code');
  const leads = searchParams.get('leads');

  // console.log(project);

  const { updateFormData, clearFormData } = useFormStore();

  // Daftar tab yang tersedia
  const tabs = [
    { id: 'cerita', label: 'Cerita' },
    {
      id: 'salur',
      label: 'Salur',
      condition: salur?.data[0] || salur?.news[0],
    },
    { id: 'donatur', label: 'Donatur' },
    { id: 'fundraiser', label: 'Fundraiser' },
  ];

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

      router.push(`/donasi/detail/${link}/form?id=${id}`);
    },
    [updateFormData, router]
  );

  const detailDonasi = useMemo(() => program?.data, [program]);

  useEffect(() => {
    if (detailDonasi) {
      setActive(detailDonasi.status === 'PUBLISH');
    }
  }, [detailDonasi]);

  // Fungsi untuk render konten berdasarkan tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case 'cerita':
        return (
          <Cerita story={detailDonasi.content} date={detailDonasi.updated_at} />
        );
      case 'salur':
        return (
          <div>
            <Salur salur={salur} programLink={detailDonasi.link} />
            <ProjectShow project={project} programLink={detailDonasi.link} />
          </div>
        );
      case 'donatur':
        return <Donatur donatur={donatur} programLink={detailDonasi.link} />;
      case 'fundraiser':
        return (
          <Fundraiser fundraiser={fundraiser} programLink={detailDonasi.link} />
        );
      default:
        return (
          <Cerita story={detailDonasi.content} date={detailDonasi.updated_at} />
        );
    }
  };

  return (
    <>
      <Header type="title" text={detailDonasi?.title} link="/" />
      <div className="content-wrapper bg-grey animate-fade-in">
        <div className="container mb-24">
          <ImgDonasi
            active={active}
            detailDonasi={detailDonasi}
            handleChange={handleChange}
            donatur={donatur}
          />

          <ProfilDonasi
            programLink={detailDonasi.link}
            salur={salur?.data[0] || salur?.news[0] ? true : false}
            projekSalur={detailDonasi.last_two_projects}
          />

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 mt-1 gap-2 px-2">
            {tabs.map((tab) => {
              if (tab.condition === false) return null;
              return (
                <button
                  key={tab.id}
                  className={`min-h-[38px] w-full text-base md:text-lg font-medium rounded-md transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Konten Tab */}
          <div className="mt-4 transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>

        {/* Sticky Button */}
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
                {active ? 'DONASI SEKARANG' : 'BELUM DIBUKA'}
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
