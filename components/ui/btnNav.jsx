'use client';

import { getIsTokenValid } from '@/service/FetchData';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import Cookies from 'js-cookie';

const navItems = [
  { href: '/tentang', label: 'Tentang' },
  { href: '/blogs', label: 'Blog' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/hitung-zakat', label: 'Zakat' },
  { href: '/bio', label: 'Bio Aksiberbagi.com' },
];

export const BtnNav = () => {
  const [authToken, setAuthToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
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
        }
      };

      validateToken();
    }
  }, []);

  return (
    <div className="container">
      <ul className="navbar-nav">
        {navItems.map((item, index) => (
          <li
            className={`nav-item ${item.isActive ? 'active' : ''}`}
            key={index}
          >
            <a className="nav-link" href={item.href}>
              <span>{item.label}</span>
              <FaChevronRight />
            </a>
          </li>
        ))}
      </ul>
      <div className="container">
        {!(authToken && isTokenValid) ? (
          <a href="/login" className="btn button-white btn-block">
            Masuk
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
