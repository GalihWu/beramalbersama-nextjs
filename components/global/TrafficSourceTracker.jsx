"use client";

import { useEffect } from "react";

const TrafficSourceTracker = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const referrer = document.referrer;

    let source = "direct"; // Default if no referrer or UTM params

    if (utmSource) {
      source = utmSource; // UTM parameters take priority
    } else if (referrer.includes("google.com")) {
      source = "google_search";
    } else if (
      referrer.includes("facebook.com") ||
      referrer.includes("instagram.com")
    ) {
      source = "meta_ads";
    } else if (referrer.includes("t.co")) {
      source = "twitter";
    } else if (referrer.includes("bing.com")) {
      source = "bing_search";
    }

    console.log("User Source:", source);

    // Save to local storage or send to backend
    localStorage.setItem("user_source", source);

    // Optionally, send to an analytics service
    // fetch("/api/track-source", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ source }),
    // });
  }, []);

  return null; // This component only runs logic, so no UI needed
};

export default TrafficSourceTracker;
