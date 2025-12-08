import { notFound } from 'next/navigation';
import DonasiDetail from './DonasiDetail';
export async function generateMetadata({ params }) {
  const { id } = params;
  if (!id) {
    return {
      title: 'Error',
      description: 'Invalid ID.',
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program-minimum/link/${id}`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch metadata for ID: ${id}`);
    }

    const { data } = await res.json();

    return {
      title: 'Aksiberbagi',
      description: data?.title || 'Program information',
      openGraph: {
        title: 'Aksiberbagi',
        description: data?.title || 'Program information',
        images: [
          {
            url:
              data?.image ||
              'https://aksiberbagi.com/storage/image/mwZuPbNeod3s42X5ESxhvAcvj6Y5dT0GLZfJQos7.png',
            alt: data?.title || 'Aksiberbagi',
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);

    return {
      title: 'Error',
      description: 'An error occurred while fetching metadata.',
    };
  }
}

// ✅ Fetch program data for rendering the page
async function getProgramData(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/link/${id}`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
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

// Data Salur
async function getReport(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/report?program_id=${id}&limit=1`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch report data for ID: ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching report with id ${id}:`, error);
    return null;
  }
}

// Data Donatur
async function getDonorsById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/link/${id}/donors?limit=3&mode=pagination&page=1`,

      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch donatur data for ID: ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching donatur with id ${id}:`, error);
    return null;
  }
}

// data fundraiser
async function getFundraisersById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/link/${id}/fundraisers?limit=3&mode=pagination&page=1`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch donatur data for ID: ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching donatur with id ${id}:`, error);
    return null;
  }
}

// ✅ Main Page Component
export default async function DonasiPage({ params }) {
  const program = await getProgramData(params.id);
  const donatur = await getDonorsById(params.id);
  const fundraiser = await getFundraisersById(params.id);

  if (!program) {
    return notFound();
  }

  const salur = await getReport(program?.data.id);
  return (
    <DonasiDetail
      program={program}
      salur={salur}
      donatur={donatur?.data}
      fundraiser={fundraiser?.data}
    />
  );
}

// Generate static paths
// export async function generateStaticParams() {
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/program`
//   );
//   const programs = response.data.data;

//   return programs.map((program) => ({
//     id: program.link,
//   }));
// }
