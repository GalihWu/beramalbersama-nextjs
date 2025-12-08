'use client'; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FbPixelInitializer() {
  const [pixels, setPixels] = useState([]);

  // Fetch Facebook Pixel IDs on the client side
  useEffect(() => {
    async function fetchFbPixels() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/facebook/pixels`,
          {
            params: {
              web: 'aksiberbagi.com',
            },
          }
        );
        setPixels(response.data.data || []);
      } catch (error) {
        console.error('Error fetching Facebook Pixel IDs:', error);
      }
    }

    fetchFbPixels();
  }, []);

  // Initialize Facebook Pixel when IDs are fetched
  useEffect(() => {
    if (pixels.length > 0) {
      // Load Facebook Pixel script dynamically
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          if (n.callMethod) {
            n.callMethod.apply(n, arguments);
          } else {
            n.queue.push(arguments);
          }
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      // Initialize each Facebook Pixel ID
      pixels.forEach((pixel) => {
        if (pixel.script_id) {
          window.fbq('init', pixel.script_id);
          window.fbq('track', 'PageView');
        }
      });
    }
  }, [pixels]);

  return null; // No UI rendering, only initializes Facebook Pixels
}
