'use client';

import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
const navItems = [
  { href: '/tentang', label: 'Tentang' },
  { href: '/blogs', label: 'Blog' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/hitung-zakat', label: 'Zakat' },
  { href: '/bio', label: 'Bio Aksiberbagi.com' },
];

export const BtnNav = () => {
  const { isAuthenticated } = useAuth();

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
        {!isAuthenticated ?? (
          <a href="/login" className="btn button-white btn-block">
            Masuk
          </a>
        )}
      </div>
    </div>
  );
};
