"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GTMPageView = dynamic(() => import("@/components/global/GTMPageView"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function GTMPageViewLoader({ purchase = null, uuid = null }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <GTMPageView purchase={purchase} uuid={uuid} />
      </Suspense>
    </>
  );
}
