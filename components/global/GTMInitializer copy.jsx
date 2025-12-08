"use client"; // Mark this file as a Client Component

import { useEffect, useState } from "react";
import axios from "axios";
import TagManager from "react-gtm-module";

const initializedGtmIds = new Set(); // Track initialized GTM IDs

export default function GTMInitializer() {
  const [gtmIds, setGtmIds] = useState([]);

  // Fetch GTM IDs on the client side
  useEffect(() => {
    async function fetchGtm() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/gtm/ids`
        );
        setGtmIds(response.data.data || []);
      } catch (error) {
        console.error("Error fetching GTM IDs:", error);
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

  return null; // No UI rendering, only initializes GTM
}
