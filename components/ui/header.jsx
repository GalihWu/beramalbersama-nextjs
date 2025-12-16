'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PiList,
  PiMagnifyingGlass,
  PiArrowLeft,
  PiShareNetworkFill,
  PiX,
} from 'react-icons/pi';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import Button from './button';
import { FaSearch } from 'react-icons/fa';
import { ModalShare } from '../modal/ModalShare';

import { useAuth } from '@/context/AuthContext';
import { FaChevronRight } from 'react-icons/fa';

const navItems = [
  { href: '/tentang', label: 'Tentang' },
  { href: '/blogs', label: 'Blog' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/hitung-zakat', label: 'Zakat' },
  { href: '/bio', label: 'Bio Aksiberbagi.com' },
];

function HeaderDefault() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const inputRef = useRef(null);
  const searchButtonRef = useRef(null);

  const { isAuthenticated } = useAuth();

  const toggleBtnNav = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsSearch(false);
  };

  const searching = () => {
    setIsSearch(!isSearch);
    if (!isSearch) setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Searching for:', query);
      // router.push(`/donasi?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target)
      ) {
        setIsSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-primary-600 to-teal-600 shadow-lg backdrop-blur-sm'
          : 'bg-gradient-to-r from-primary-500 to-teal-500'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[65px]">
          {/* Logo */}
          <Link
            className="flex-shrink-0 w-28 md:w-36 transition-transform duration-300 hover:scale-105"
            href="/"
          >
            <Image
              alt="brand_logo"
              className="w-full h-auto object-contain"
              src="/img/icons/bb-putih.png"
              width={300}
              height={300}
            />
          </Link>

          {/* Search Bar - Desktop & Mobile */}
          <div className="flex-1 mx-2 md:mx-6 max-w-2xl">
            {isSearch ? (
              <div
                ref={inputRef}
                className="relative animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    className="w-full h-10 md:h-11 pl-4 pr-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all duration-300"
                    placeholder="Cari program kebaikan..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  >
                    <FaSearch className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </form>
              </div>
            ) : (
              <button
                ref={searchButtonRef}
                onClick={searching}
                className=" w-full h-10 md:h-11 px-4 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center gap-3 group"
              >
                <FaSearch className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors" />
                <TypeAnimation
                  className="text-sm md:text-base text-white"
                  sequence={[
                    'Cari Program Kebaikan...',
                    1000,
                    'Bangun Masjid...',
                    2000,
                    'Pondok Quran...',
                    2000,
                    'Pendidikan Qur,an...',
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </button>
            )}
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={toggleBtnNav}
            className="flex-shrink-0 w-10 h-10 md:w-11 md:max-w-11 md:h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:scale-105 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <PiX className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <PiList className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out  ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-primary-500 backdrop-blur-lg border-t border-white/10 shadow-lg">
          <div className="mx-auto px-4 py-2 max-w-[640px]">
            {/* Menu */}
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-white transition-all duration-200 ${
                      item.isActive
                        ? 'bg-white/20 font-semibold'
                        : 'hover:bg-white/10'
                    } `}
                  >
                    <span>{item.label}</span>
                    <FaChevronRight className="text-sm opacity-70" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Login Button */}
            {!isAuthenticated && (
              <div>
                {/* Divider */}
                <div className="my-2 h-px bg-white/20" />
                <a
                  href="/login"
                  className="block w-full text-center bg-white text-primary-500 font-semibold py-3 mb-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Masuk
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderTitle({ text, id, link }) {
  const [shareUrl, setShareUrl] = useState('');
  const [showModalShare, setShowModalShare] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const reff_code = localStorage.getItem('save_reff_code');
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href + '?reff_code=' + reff_code);
    }
  }, []);

  const handleBackClick = () => {
    if (link) {
      router.push(link);
    } else {
      router.back();
    }
  };

  return (
    <>
      <header className="header-fixed header-cyan-xs !bg-primary-500">
        <div className="header-wrapper container">
          <Button
            id={id}
            size="icon"
            variant="transparent"
            onClick={handleBackClick} // Use the new handler
          >
            <PiArrowLeft size={24} className="font-bold" />
          </Button>
          <h2 className="text-[16px] leading-[19px] my-0 font-semibold text-white w-[calc(100%-80px)] overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {text}
          </h2>
          <Button
            size="icon"
            variant="transparent"
            onClick={() => setShowModalShare(true)} // Wrap in a function to avoid immediate invocation
          >
            <PiShareNetworkFill size={24} />
          </Button>
        </div>
      </header>

      {/* Share Modal */}
      {showModalShare && (
        <ModalShare
          closeModalShare={() => setShowModalShare(false)}
          show={showModalShare}
          shareUrl={shareUrl}
          whatsappMessage={shareUrl}
        />
      )}
    </>
  );
}

function HeaderNotShare({ text }) {
  const router = useRouter();
  const isLoginPage = text === 'Login';
  return (
    <>
      <header className="header-fixed header-cyan-xs !bg-primary-500">
        <div className="header-wrapper container !justify-start !gap-2">
          <Button
            size="icon"
            variant="transparent"
            onClick={() => (isLoginPage ? router.push('/') : router.back())}
          >
            <PiArrowLeft size={24} className="font-bold" />
          </Button>
          <h2 className="text-[16px] leading-[19px] my-0 font-semibold text-white w-[calc(100%-80px)] overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {text}
          </h2>
        </div>
      </header>
    </>
  );
}
function HeaderOnlyText({ text }) {
  return (
    <>
      <header className="header-fixed header-cyan-xs !bg-primary-500">
        <div className="header-wrapper container">
          <h2 className="text-[16px] leading-[19px] my-0 font-semibold text-white w-[calc(100%-80px)] overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {text}
          </h2>
        </div>
      </header>
    </>
  );
}

function HeaderSearch({ text }) {
  const router = useRouter();
  const [query, setQuery] = useState(text);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/donasi?q=${encodeURIComponent(query)}`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      handleSearch(e);
    }
  };
  return (
    <header className="header-fixed header-cyan-xs !bg-primary-500">
      <div className="header-wrapper container">
        <Button size="icon" variant="transparent" onClick={() => router.back()}>
          <PiArrowLeft size={24} />
        </Button>
        <div className="!w-[calc(100%-40px)] search-header-xs ml-0 lg:mr-0 md:mr-0 sm:mr-6">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control bg-white !rounded-[6px]"
              placeholder="Cari Program"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button
              type="submit"
              size="icon"
              variant="color-tosca"
              className="absolute top-1/2 -translate-y-1/2 right-[5px] z-[3]"
            >
              <PiMagnifyingGlass size={24} />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default function Header({
  type = 'default',
  text = '',
  id = '',
  link = '',
}) {
  function RenderHeader() {
    if (type === 'title') {
      return <HeaderTitle text={text} id={id} link={link} />;
    } else if (type === 'search') {
      return <HeaderSearch text={text} />;
    } else if (type === 'onlytext') {
      return <HeaderOnlyText text={text} />;
    } else if (type === 'notshare') {
      return <HeaderNotShare text={text} />;
    } else {
      return <HeaderDefault />;
    }
  }

  return (
    <>
      <RenderHeader />
    </>
  );
}
