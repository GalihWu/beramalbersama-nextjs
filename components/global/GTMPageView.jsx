'use client'; // Marks this as a Client Component

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import TagManager from 'react-gtm-module';

export default function GTMPageView({ purchase = null, uuid = null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to send a PageView event
    const sendPageView = () => {
      const fullUrl = `${pathname}${searchParams ? `?${searchParams}` : ''}`;
      TagManager.dataLayer({
        dataLayer: {
          event: 'PageView',
          url: fullUrl,
          pagePath: fullUrl,
          pageTitle: document.title,
          purchase: purchase,
          uuid: uuid,
        },
      });
      //   console.log(`GTM PageView sent: ${fullUrl}`);
    };

    sendPageView(); // Send PageView on initial load

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]); // Dependencies trigger effect on change

  return null; // No UI rendering
}
