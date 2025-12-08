import React from 'react';
import dynamic from 'next/dynamic';
import { DataProvider } from '@/context/DataContext';

// Lazy load components correctly
// ssr false
const Home = dynamic(
  () => import('@/app/home').then((mod) => mod.default || mod.Home),
  { ssr: false }
);

async function getHomeBanner() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/image/home-banner`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.error('Error fetching home banner:', error);
    return null;
  }
}

async function getProgramShowOn(type) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program-show/${type}`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.error(`Error fetching program with Type ${type}:`, error);
    return null;
  }
}

async function getBerandaBanner() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/beranda/banner`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.error('Error fetching beranda banner:', error);
    return null;
  }
}

async function getProgramCategory() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program-category`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.error('Error fetching program category:', error);
    return null;
  }
}

async function getProgramVertical() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/beranda/program-vertical`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.error('Error fetching program vertical:', error);
    return null;
  }
}

async function getDonors() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/donors/list?limit=5`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.error('Error fetching program vertical:', error);
    return null;
  }
}

const HomePage = async () => {
  const bannerData = await getHomeBanner();
  const programDarurat = await getProgramShowOn('darurat');
  const programRekomendasi = await getProgramShowOn('rekomendasi');
  const berandaBanner = await getBerandaBanner();
  const programCategory = await getProgramCategory();
  const programVertical = await getProgramVertical();
  const donors = await getDonors();

  const data = {
    bannerData,
    programDarurat,
    programRekomendasi,
    berandaBanner,
    programCategory,
    programVertical,
    donors,
  };

  if (
    !bannerData ||
    !programDarurat ||
    !programRekomendasi ||
    !berandaBanner ||
    !programCategory ||
    !programVertical
  ) {
    return <div>Failed to load data.</div>;
  }

  return (
    <DataProvider data={data}>
      <Home />
    </DataProvider>
  );
};

export default HomePage;
