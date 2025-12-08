'use client'; // Mark this file as a Client Component

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TagManager from 'react-gtm-module';
import { usePathname, useSearchParams } from 'next/navigation';

const initializedGtmIds = new Set(); // Track initialized GTM IDs

export default function GTMInitializer() {
  const [gtmIds, setGtmIds] = useState([]);
  const pathname = usePathname(); // Dynamically fetch current path
  const searchParams = useSearchParams(); // Dynamically fetch search params
  const previousUrlRef = useRef('');

  // Fetch GTM IDs on the client side
  useEffect(() => {
    async function fetchGtm() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/gtm/ids`,
          {
            params: {
              web: 'aksiberbagi.com',
            },
          }
        );
        setGtmIds(response.data.data || []);
      } catch (error) {
        console.error('Error fetching GTM IDs:', error);
      }
    }

    fetchGtm();
  }, []);

  // Initialize GTM for IDs that haven't been initialized yet
  useEffect(() => {
    gtmIds.forEach((gtmId) => {
      if (gtmId.script_id && !initializedGtmIds.has(gtmId.script_id)) {
        TagManager.initialize({ gtmId: gtmId.script_id });
        initializedGtmIds.add(gtmId.script_id); // Mark as initialized
      }
    });
  }, [gtmIds]);

  // Update GTM page view data when route changes
  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure we're on the client side

    const currentUrl = `${window.location.origin}${pathname}${
      searchParams ? `?${searchParams.toString()}` : ''
    }`;

    // Use the previous URL stored in the ref
    const previousUrl = previousUrlRef.current;

    // Push the new data to the `dataLayer`
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page: `${pathname}${searchParams ? `?${searchParams}` : ''}`,
      fullUrl: currentUrl,
      pageTitle: document.title,
      previousUrl: previousUrl,
    });

    // Update the ref to store the current URL
    previousUrlRef.current = currentUrl;
  }, [pathname, searchParams]);

  return null; // No UI rendering, only initializes GTM
}
