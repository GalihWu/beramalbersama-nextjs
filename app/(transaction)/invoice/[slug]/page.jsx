import { notFound } from 'next/navigation';
import Invoice from './Invoice';

async function getInvoice(inv) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/invoice/${inv}`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch invoice data for ID: ${inv}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching invoice with Link ${inv}:`, error);
    return null;
  }
}

export default async function InvoicePage({ params }) {
  const invoice = await getInvoice(params.slug);

  if (!invoice) {
    return notFound();
  }

  return <Invoice invoice={invoice} slug={params.slug} />;
}
