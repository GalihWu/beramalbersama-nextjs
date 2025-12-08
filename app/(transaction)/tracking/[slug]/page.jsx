import { notFound } from 'next/navigation';
import TrackingDonation from './TrackingDonation';

async function getDataInvoice(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/invoice/${id}`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch program data for id ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching program with id ${id}:`, error);
    return null;
  }
}

export default async function TrackingPage(params) {
  const dataInvoice = await getDataInvoice(params.params.slug);

  if (!dataInvoice) {
    return notFound();
  }

  return <TrackingDonation dataInvoice={dataInvoice?.data}></TrackingDonation>;
}
