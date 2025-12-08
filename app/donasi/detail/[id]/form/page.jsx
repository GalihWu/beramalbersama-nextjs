import { notFound } from 'next/navigation';
import DonasiForm from './DonasiForm';

async function getPaymentNominalOption(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/nominal-option?program_link=${id}`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch program data for ID: ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching program with Link ${id}:`, error);
    return null;
  }
}

export default async function DonasiPage({ params }) {
  const data = await getPaymentNominalOption(params.id);

  if (!data) {
    return notFound();
  }

  return <DonasiForm dataNominal={data.data} params={params} />;
}
