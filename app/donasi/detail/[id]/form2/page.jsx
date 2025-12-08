import axios from 'axios';
import Form2 from './Form2';

// Fungsi untuk mendapatkan metode pembayaran
async function getPaymentMethod({ link }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/payment-method`,
      {
        params: {
          program_link: link,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return null;
  }
}

// Fungsi untuk mendapatkan opsi nominal pembayaran
async function getNominalOptions({ program_link }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/nominal-option`,
      {
        params: {
          program_link: program_link,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching nominal options:', error);
    return null;
  }
}

export default async function FormPage({ params, searchParams }) {
  const programLink = params.id;
  const programId = searchParams.id;

  const paymentMethods = await getPaymentMethod({ link: programLink });
  const nominalOptions = await getNominalOptions({ program_link: programLink });

  return (
    <>
      <Form2
        paymentMethods={paymentMethods}
        nominalOptions={nominalOptions}
        programId={programId}
        programLink={programLink}
      />
    </>
  );
}
