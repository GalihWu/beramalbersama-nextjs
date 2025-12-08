import { notFound } from 'next/navigation';
import RutinProgram from './RutinProgram';
export async function generateMetadata({ params }) {
  const { link } = params;
  if (!link) {
    return {
      title: 'Error',
      description: 'Invalid Link.',
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program-minimum/link/${link}`,
      {
        next: { revalidate: 600 }, // Cache response for 10 minutes (ISR)
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate', // Efficient API caching
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch metadata for ID: ${link}`);
    }

    const { data } = await res.json();

    return {
      title: 'Aksiberbagi.com',
      description: data?.title || 'Program information',
      openGraph: {
        title: 'Aksiberbagi.com',
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
async function getProgramData(link) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/program/link/${link}`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch program data for link: ${link}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching program with Link ${link}:`, error);
    return null;
  }
}

// ✅ Main Page Component
export default async function DonasiPage({ params }) {
  const program = await getProgramData(params.link);

  if (!program) {
    return notFound();
  }

  return <RutinProgram detailProgram={program?.data} link={params.link} />;
}
