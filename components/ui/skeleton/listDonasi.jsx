import React from "react";
import Skeleton from "./skeleton";

export default function ListDonasi() {
  return (
    <div className="donatur-row">
      <div className="donatur-box">
        <Skeleton className="image-wrap" />

        <Skeleton className="text-wrap" height="50px" />
        <Skeleton className="text-nominal" height="50px" />
      </div>
    </div>
  );
}
