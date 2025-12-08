'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PiList,
  PiXCircle,
  PiMagnifyingGlass,
  PiArrowLeft,
  PiShareNetworkFill,
} from 'react-icons/pi';
// import { SlOptionsVertical } from 'react-icons/sl';

import { BtnNav } from './btnNav';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import Button from './button';
import { FaSearch } from 'react-icons/fa';
import { ModalShare } from '../modal/ModalShare';
// import { useMutation } from '@tanstack/react-query';
// import { postDonateGrup, postExitGrup } from '@/service/PostData';
// import { useConfirmationModal } from '@/context/ConfirmationModalContext';

function HeaderDefault() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const [query, setQuery] = useState('');

  const toggleBtnNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const searching = () => {
    setIsSearch(!isSearch);
  };
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (query.trim()) {
      router.push(`/donasi?q=${encodeURIComponent(query)}`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      handleSearch(e);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="header-fixed header-cyan-xs !bg-primary-500">
      <div className="header-wrapper container">
        <Link className="logo-header-xs" href="/">
          <Image
            alt="brand_logo"
            className="h-full px-2"
            src="/img/icons/akber-new-putih.webp"
            width={300}
            height={300}
          />
        </Link>
        {/* <div ref={inputRef}> */}
        {isSearch ? (
          <div
            className="search-header-xs"
            style={{ width: 'calc(100% - 115px)' }}
          >
            <form onSubmit={handleSearch} ref={inputRef}>
              <input
                type="text"
                className="form-control search-typing !bg-primary-600 text-white shadow-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="q"
                placeholder=""
                autoFocus
                onKeyDown={handleKeyPress}
              />
              <button
                type="submit"
                className="btn button-search "
                style={{
                  height: '36px',
                  position: 'absolute',
                  right: 0,
                  minHeight: 'inherit',
                }}
              >
                <FaSearch />
              </button>
            </form>
          </div>
        ) : (
          <div
            className="search-typing !bg-primary-600 text-white shadow-none"
            onClick={searching}
          >
            <div className="animate-typing !text-base !inline-block">
              <TypeAnimation
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
            </div>
            <div className="btn btn-non-border p-0 text-white !flex">
              <FaSearch />
              {/* <PiMagnifyingGlass size={20} /> */}
            </div>
          </div>
        )}
        {/* </div> */}
        <div
          onClick={toggleBtnNav}
          className="btn button-icon button-menu menu-nav !h-10 !w-10 p-0 transition-all duration-200 ease-in-out !flex"
        >
          {isMenuOpen ? <PiXCircle size={28} /> : <PiList size={28} />}
        </div>
      </div>
      <div
        className={`navigation-wrapper animate-fade-in-down bg-second ${
          isMenuOpen ? '' : 'hidden'
        }`}
      >
        <BtnNav />
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
