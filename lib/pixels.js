"use client";

import { useEffect } from "react";
import axios from "axios";
// import { postFbEvent } from "@/service/PostData";
import { getFbTrackingIds } from "@/lib/utlis";

export const useFacebookPixels = () => {
  useEffect(() => {
    const fetchPixels = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/facebook/pixels`
        );
        const pixels = response.data;

        pixels.forEach((pixel) => {
          // Inject the script dynamically
          const script = document.createElement("script");
          script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${pixel.script_id}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error("Error fetching Facebook Pixels:", error);
      }
    };

    fetchPixels();
  }, []);
};
export const sendPageViewEvent = async () => {
  // const { fbc, fbp } = getFbTrackingIds();

  // const formData = {
  //   event_source_url: window.location.href,
  //   fbc: fbc || null, // Facebook Click ID (from cookies)
  //   fbp: fbp || null, // Facebook Browser ID (from cookies)
  // };

  try {
    // await postFbEvent("PageView", formData);
  } catch (error) {
    console.error("Error :", error);
  }
};
export const sendAddPaymentInfoEvent = async () => {
  // const { fbc, fbp } = getFbTrackingIds();

  // const formData = {
  //   event_source_url: window.location.href,
  //   fbc: fbc || null, // Facebook Click ID (from cookies)
  //   fbp: fbp || null, // Facebook Browser ID (from cookies)
  // };

  try {
    // await postFbEvent("AddPaymentInfo", formData);
  } catch (error) {
    console.error("Error :", error);
  }
};

export const sendAddToCartInfoEvent = async (
  phone,
  nominal,
  programs,
  invoice
) => {
  const { fbc, fbp } = getFbTrackingIds();

  const formData = {
    event_source_url: window.location.href,
    fbc: fbc || null,
    fbp: fbp || null, // Facebook Browser ID (from cookies)
    phone: phone,
    custom_data: {
      value: nominal,
      currency: "IDR",
      content_ids: programs,
      status: "Pending",
      order_id: invoice,
    },
  };
  console.log(formData)
  try {
    // await postFbEvent("AddToCart", formData);
  } catch (error) {
    console.error("Error :", error);
  }
  // 2. ✅ Kirim juga ke client (browser pixel tracking)
  if (typeof window.fbq === "function") {
    window.fbq("track", "Purchase", {
      value: nominal,
      currency: "IDR",
      content_ids: programs,
      // content_type: "product",
    });
  }
};
