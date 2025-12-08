import { notFound } from 'next/navigation';
import EventDetail from './EventDetail';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  if (!slug) {
    return {
      title: 'Error',
      description: 'Invalid Slug.',
    };
  }
  try {
    const eventData = await getEventData(slug);
    const data = eventData?.data;

    return {
      title: 'Aksiberbagi.com',
      description: data?.title || 'Event information',
      openGraph: {
        title: 'Aksiberbagi.com',
        description: data?.title || 'Event information',
        images: [
          {
            url: data?.image || '',
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

async function getEventData(link: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/link/${link}`,
      {
        next: { revalidate: 600 },
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch program data for Link: ${link}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching program with Link ${link}:`, error);
    return null;
  }
}

// ✅ Main Page Component
export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const eventData = await getEventData(params.slug);

  if (!eventData) {
    return notFound();
  }

  return <EventDetail eventData={eventData?.data} link={params.slug} />;
}
