import { notFound } from 'next/navigation';
import React from 'react';
import Bio from './Bio';

async function getProgramShow(type) {
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
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log('Error fetchin Program Rekomendation', error);
    return null;
  }
}

export default async function BioPage() {
  const programShow = await getProgramShow('darurat');
  if (!programShow) {
    return notFound();
  }

  return <Bio programShow={programShow} />;
}
