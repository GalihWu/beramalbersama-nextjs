import { notFound } from 'next/navigation';
import PaymentMethod from './PaymentMetod';

async function getPaymentMethod(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/payment-method?program_link=${id}`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch payment method data for ID: ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching payment method with Link ${id}:`, error);
    return null;
  }
}

export default async function PaymentMethodPage({ params }) {
  const paymentMethod = await getPaymentMethod(params.id);

  if (!paymentMethod) {
    return notFound();
  }

  return <PaymentMethod id={params.id} paymentMethod={paymentMethod} />;
}
