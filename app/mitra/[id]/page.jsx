import { notFound } from 'next/navigation';
import React from 'react';
import Mitra from './Mitra';

async function getMitraById(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mitra/${id}`,
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
    console.log('Error fetchin detail mitra', error);
    return null;
  }
}

export default async function MitraPage({ params }) {
  const idMitra = params.id;

  const detailMitra = await getMitraById(idMitra);
  if (!detailMitra) {
    return notFound();
  }

  return <Mitra detailMitra={detailMitra?.data} idMitra={idMitra} />;
}
