import { getProgramLinkFundraisers } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

// components
import { EmptyData } from '@/components/ui/emptyData';
import ListDonasi from '@/components/ui/skeleton/listDonasi';
import { TitleBorder } from '@/components/ui/TitleBorder';
import { currencyFormatter, initialName } from '@/lib/formater';

export const Fundraiser = ({ programId }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    if (token) {
      setIsLogin(true);
    }
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      'donasiIdFundraiser',
      programId,
      { limit: 0, mode: 'pagination', page: 1 },
    ],
    queryFn: () =>
      getProgramLinkFundraisers(programId, {
        limit: 0,
        mode: 'pagination',
        page: 1,
      }),
    enabled: !!programId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const fundraiser = data?.data.data;

  if (isLoading)
    return (
      <div className="donate-body-wrapper" id="donateUser">
        <div className="black-card">
          <TitleBorder title={'Fundraiser'} amount={'...'} />
          <div className="donate-body-content pb-0">
            <ListDonasi />
            <ListDonasi />
            <ListDonasi />
            <ListDonasi />
            <ListDonasi />
          </div>
        </div>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  const renderDonorCard = (donor, index) => (
    <div className="donatur-row" key={index}>
      <div className="donatur-box justify-content-start">
        <div className="image-wrap">
          {donor.img ? (
            <Image width={500} height={500} src={donor.img} alt={donor.name} />
          ) : (
            <div className="image-box">
              <p>{initialName(donor.name)}</p>
            </div>
          )}
        </div>
        <div className="text-wrap">
          <h4>{donor.name}</h4>
          <p>
            Mengajak <strong>{donor.total_donatur} orang</strong> berdonasi
          </p>
          <h6>{currencyFormatter(donor.total_donasi)}</h6>
        </div>
      </div>
    </div>
  );

  const loadMore = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 4;
      return newCount > fundraiser.length ? fundraiser.length : newCount;
    });
  };

  return (
    <>
      <div className="donate-body-wrapper border-top" id="fundraiserBox">
        <TitleBorder title={'Fundraiser'} amount={fundraiser.length} />

        <div className="donate-body-content pb-0">
          {fundraiser.length > 0 ? (
            fundraiser
              .slice(0, visibleCount)
              .map((donor, index) => renderDonorCard(donor, index))
          ) : (
            <EmptyData
              title="Belum ada Fundraiser"
              desc="Ayo jadi bagian dari #JembatanKebaikan"
            />
          )}
        </div>
        {visibleCount < fundraiser.length && (
          <div className="d-flex justify-content-center ">
            <div className="btn button-link color-cyan" onClick={loadMore}>
              Lihat lebih banyak
            </div>
          </div>
        )}
        {!isLogin && (
          <div className="fundraiser-join">
            {/* <p>
            Jadi <span>#JembatanKebaikan</span> sebagai fundraiser program ini.
          </p> */}

            <p className="w-[70%] mx-auto text-center">
              Ayo ikut berkontribusi pada penggalangan dana ini dengan menjadi
              &nbsp;
              <span className="font-semibold text-green">fundraiser</span>
              Daftarkan diri dan undang teman anda untuk menjadi Fundraiser
            </p>
            <div className="button-wrapper">
              <a href="/login" className="btn button-border-cyan w-[30%]">
                Jadi Fundraiser
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
