'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import BannerDonasiRutin from '@/components/flow-donasi-rutin/banner';
import ListDonasiRutin from '@/components/flow-donasi-rutin/list';
import { getIsTokenValid } from '@/service/FetchData';

import Cookies from 'js-cookie';

export default function DonasiRutinPage() {
  const [authToken, setAuthToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    setAuthToken(token);

    if (token) {
      // Validate the token
      const validateToken = async () => {
        try {
          await getIsTokenValid();
          setIsTokenValid(true);
        } catch {
          setIsTokenValid(false);
        } finally {
          setIsCheckingToken(false);
        }
      };

      validateToken();
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <BannerDonasiRutin authToken={authToken} isTokenValid={isTokenValid} />
        <ListDonasiRutin
          authToken={authToken}
          isTokenValid={isTokenValid}
          isCheckingToken={isCheckingToken}
        />
      </div>
      <Navbar activeItem={'/donasi-rutin'} />
    </>
  );
}
