import type { Metadata } from 'next';
import '@/css/main.css';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ReactQueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/context/ToastContext';
import TrafficSourceTracker from '@/components/global/TrafficSourceTracker';
import GTMInitializer from '@/components/global/GTMInitializer';
import FbPixelInitializer from '@/components/global/FbPixelLoader';
// import Head from 'next/head';
import { Suspense } from 'react';
import Script from 'next/script';
import SpinLoading from '@/components/ui/SpinLoading';
import { ConfirmationModalProvider } from '@/context/ConfirmationModalContext';

export const metadata: Metadata = {
  title: 'Beramalbersama.com',
  description:
    'Beramalbersama merupakan platform donasi online untuk mewujudkan kebaikan-kebaikan dengan cara yang mudah, cepat dan inovatif',
  icons: {
    icon: '/img/logo.ico',
    shortcut: '/img/logo.ico',
    apple: '/img/logo.ico',
  },
  authors: {
    name: 'Beramalbersama',
    url: 'Beramalbersama.com',
  },
  applicationName: 'Aksi Berbagi',
  keywords: [
    'Beramalbersama',
    'aksi berbagi',
    'yayasan aksi berbagi',
    'Beramalbersama.com',
    'aplikasi Beramalbersama',
    'donasi online',
    'Kebaikan Indonesia',
    'galang donasi',
    'zakat',
    'wakaf',
    'sedekah produktif',
    'sedekah online',
    'wakaf online',
    'zakat penghasilan',
    'zakat profesi',
    'hukum zakat online',
    'bantu sesama',
    'relawan',
    'CSR',
    'program pemberdayaan',
    'Beramalbersama',
    'klik donasi',
    'klik berbagi',
    'siaga bencana',
    'bantuan kemanusiaan',
    'palestina',
    'suriah',
    'indonesia',
    'wakaf alquran',
    'quraban online',
    'ramadhan 2018',
    'program berbagi',
    'donasi beasiswa',
    'tahfidz',
    'yatim piatu',
  ],
  robots: 'index,follow',
  openGraph: {
    title: 'Beramalbersama',
    description:
      'Beramalbersama merupakan platform donasi online untuk mewujudkan kebaikan-kebaikan dengan cara yang mudah, cepat dan inovatif',
    images: [
      {
        url: 'https://Beramalbersama.com/storage/image/mwZuPbNeod3s42X5ESxhvAcvj6Y5dT0GLZfJQos7.png',
        width: 480,
        height: 283,
        alt: 'Beramalbersama Logo',
        type: 'image/jpeg',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/img/logo.ico" as="image" />
        {process.env.NEXT_PUBLIC_API_URL && (
          <>
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
          </>
        )}
        <meta
          name="facebook-domain-verification"
          content="wzgx1zwbj6s4xuk9dyj8e315dbmbwm"
        />
        <meta name="theme-color" content="#19B697" />
        <meta name="msapplication-navbutton-color" content="#19B697" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Viewport meta tag - penting untuk responsive design */}
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        /> */}
      </head>

      <body>
        {/* Preload tracking but execute later */}
        <Suspense
          fallback={
            <div className="h-screen flex justify-center items-center">
              <SpinLoading />
            </div>
          }
        >
          <GTMInitializer />
          <TrafficSourceTracker />
          <FbPixelInitializer />
          <Script
            src="https://www.instagram.com/embed.js"
            strategy="lazyOnload"
          />
        </Suspense>

        <ToastProvider>
          <ConfirmationModalProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ConfirmationModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
