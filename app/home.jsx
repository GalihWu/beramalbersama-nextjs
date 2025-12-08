'use client';

import { useData } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';

import { sendPageViewEvent } from '@/lib/pixels';
import { currencyFormatter } from '@/lib/formater';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// components
import { BigBanner } from '@/components/home/BigBanner';
import { FloatCard } from '@/components/home/FloatCard';
import { DonaturNotif } from '@/components/ui/donaturNotif';
import { Modal } from '@/components/home/Modal';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { CampaignCardList } from '@/components/ui/campaignCardList';
import { ModalStart } from '@/components/home/ModalStart';

// Constants
const CATEGORIES = [
  {
    href: '/donasi-rutin',
    src: '/img/icons/menu/6. Donasi rutin.webp',
    alt: 'Donasi Rutin Icon',
    label: 'Rutin',
    id: 'btn-rutin',
    new: true,
  },
  {
    href: '/donasi',
    src: '/img/icons/menu/1. Donasi.webp',
    alt: 'Donasi Icon',
    label: 'Donasi',
    id: 'btn-donasi',
  },
  {
    href: '/infaq',
    src: '/img/icons/menu/2. Infaq.webp',
    alt: 'Infaq Icon',
    label: 'Infaq',
    id: 'btn-infaq',
  },
  {
    href: '/hitung-zakat',
    src: '/img/icons/menu/3. Zakat.webp',
    alt: 'Zakat Icon',
    label: 'Zakat',
    id: 'btn-zakat',
  },
];

// Subcomponents
const CategoryMenu = ({ categories }) => (
  <div className="grid grid-cols-4 gap-4 py-8 md:py-12">
    {categories.map((category) => (
      <Link
        id={category.id}
        className="group flex flex-col items-center justify-center text-center transition-transform hover:scale-105"
        href={category.href}
        key={category.id}
      >
        <div className="relative mb-3">
          {category.new && (
            <span className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
              NEW
            </span>
          )}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:from-emerald-100 group-hover:to-teal-100">
            <Image
              width={80}
              height={80}
              alt={category.alt}
              className="w-full h-full object-contain"
              src={category.src}
            />
          </div>
        </div>
        <p className="text-gray-700 text-xs md:text-sm font-medium group-hover:text-emerald-600 transition-colors">
          {category.label}
        </p>
      </Link>
    ))}
  </div>
);

const CampaignCard = ({ campaign, href }) => (
  <Link className="card-campaign-column card-transition-column" href={href}>
    <div
      className="card-campaign-image"
      style={{ backgroundImage: `url("${campaign.image}")` }}
    />
    <div className="card-campaign-text" style={{ width: '100%' }}>
      <div className="card-campaign-title">{campaign.title}</div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${campaign.progress_achieved}%` }}
          aria-valuenow={campaign.progress_achieved}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="card-campaign-nominal">
        <div className="text-left">
          <p>Terkumpul</p>
          <h5>{currencyFormatter(campaign.nominal_achieved)}</h5>
        </div>
      </div>
    </div>
  </Link>
);

const CampaignSlider = ({ campaigns, title, subtitle, id }) => (
  <div>
    <div
      className={`homepage-editor-choice mb-0 p-4 ${
        id === 'darurat' ? 'bg-[#fefae9]' : ' bg-white'
      }`}
    >
      <div className="homepage-editor-choice-header">
        <div className="w-100 homepage-editor-choice-title">
          <div className="m-0 text-semibold md:font-bold text-lg md:text-xl">
            {title}
          </div>
          {subtitle && <p className="m-0 text-base md:text-lg">{subtitle}</p>}
        </div>
      </div>
      <div className="recommend-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 2.3,
            },
          }}
          navigation={false}
          // pagination={{ clickable: true }}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true,
          // }}
          loop={true}
          className="campaign-swiper"
        >
          {campaigns?.map((campaign, index) => (
            <SwiperSlide key={index} id={`card-donasi-${id}`}>
              <CampaignCard
                campaign={campaign}
                href={`/donasi/detail/${campaign.link}`}
                id={`card-donasi-${id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
);

const CategorySection = ({ categories, onCategoryClick, onShowMore }) => (
  <div className="homepage-xs-main-content">
    <div className="homepage-main-header text-start mb-1 mt-4">
      <div className="m-0 text-semibold md:font-bold text-lg md:text-xl">
        Pilih Kategori Donasi Favoritmu
      </div>
    </div>
    <div
      className="homepage-category two-column border-0 my-0 size-xs"
      style={{ padding: '0px' }}
    >
      {categories.slice(0, 4).map((category) => (
        <div
          key={category.id}
          className="button-category"
          onClick={() => onCategoryClick(category.name)}
        >
          <div className="category-rounded">
            <Image
              src={category.image_url}
              alt={category.name}
              width={500}
              height={500}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="category-text">{category.name}</div>
        </div>
      ))}
      <div className="button-category" onClick={onShowMore} type="button">
        <div className="category-rounded">
          <Image
            src="/img/icons/kategori/11. Lainnya.png"
            alt="Lainnya"
            width={500}
            height={500}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="category-text">Kategori Lainnya</div>
      </div>
    </div>
  </div>
);

// Main component
const Home = () => {
  const {
    bannerData,
    donors,
    programDarurat,
    programRekomendasi,
    programCategory,
    programVertical,
  } = useData();

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('Semua');
  const [campaigns, setCampaigns] = useState([]);

  const donations = programVertical?.data || [];

  // Filter campaigns based on selected category
  useEffect(() => {
    if (donations.length > 0) {
      const filtered =
        category === 'Semua'
          ? donations
          : donations.filter((item) => item.category.name === category);
      setCampaigns(filtered);
    }
  }, [category, donations]);

  // Send page view event
  useEffect(() => {
    sendPageViewEvent();
  }, []);

  const handleCategory = useCallback((categoryName) => {
    setCategory(categoryName);
  }, []);

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="content-wrapper pt-[65px]">
      <Header />

      {/* Banner section */}
      <div className="homepage-banner-one">
        <div className="container position-relative !relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={{
              clickable: true,
              el: '.banner-pagination',
              bulletClass: 'swiper-pagination-bullet custom-bullet',
              bulletActiveClass:
                'swiper-pagination-bullet-active custom-bullet-active',
            }}
            className="w-full"
          >
            <SwiperSlide>
              <Link href={'#'} className="block w-full" id="banner-link">
                <Image
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  src={bannerData.data.image_url}
                  alt={bannerData.data.name}
                  priority={false}
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={'#'} className="block w-full" id="banner-link">
                <Image
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  src={bannerData.data.image_url}
                  alt={bannerData.data.name}
                  priority={false}
                />
              </Link>
            </SwiperSlide>
          </Swiper>
          {/* Pagination Container */}
          <div
            className=" banner-pagination  absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 z-10 
                       flex items-center gap-2"
          ></div>
          <FloatCard />
        </div>
      </div>

      {/* Homepage Content */}
      <div className="animate-fade-in-up">
        <div
          className="homepage-content-wrapper size-xs"
          style={{ paddingBottom: '2rem' }}
        >
          <div className="container">
            {/* Menu Donasi */}
            <div className="homepage-xs-main-content pb-1 !pt-20">
              <CategoryMenu categories={CATEGORIES} />
            </div>

            {/* Campaign Sliders */}
            <CampaignSlider
              campaigns={programDarurat?.data}
              title="Siap Jadi Pahlawan Kebaikan Hari Ini?"
              subtitle="Kebaikanmu Jadi Alasan Mereka Untuk Tetap Tersenyum"
              id="darurat"
            />

            <CampaignSlider
              campaigns={programRekomendasi?.data}
              title="Satu Langkah Kebaikan, Tumbuhkan Harapan untuk Saling Menguatkan"
              id="rekomendasi"
            />

            <div className="homepage-xs-main-content">
              <BigBanner />

              {/* Category Selection */}
              <CategorySection
                categories={programCategory.data}
                onCategoryClick={handleCategory}
                onShowMore={handleShowModal}
              />

              {/* Campaign List */}
              <div className="homepage-list-xs mt-2">
                {campaigns.map((campaign, index) => (
                  <CampaignCardList
                    key={campaign.link || index}
                    category={campaign.category.name}
                    image={campaign.image}
                    link={campaign.link}
                    mitra={campaign.mitra.name}
                    nominal_achieved={campaign.nominal_achieved}
                    progress_achieved={campaign.progress_achieved}
                    remaining_days={campaign.remaining_days}
                    title={campaign.title}
                  />
                ))}
              </div>

              <div className="flex justify-center pb-12">
                <Link className="btn button-orange" href="/donasi">
                  Lihat Program Lainnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal handleCategory={handleCategory} closeModal={handleCloseModal} />
      )}

      {/* Donatur Notification */}
      <div className="fixed z-50 md:bottom-6 bottom-[80px] md:left-6 inset-x-0 left-1/2 md:translate-x-0 -translate-x-1/2">
        <DonaturNotif donatur={donors?.data.data} formatHome={true} />
      </div>

      <ModalStart />
      <Footer />
      <Navbar activeItem="/" />
    </div>
  );
};

export default Home;
