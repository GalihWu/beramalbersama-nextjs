import React from "react";
import Skeleton from "./skeleton";

export default function CampaignColumn() {
  return (
    <div className="d-flex" style={{ gap: "10px" }}>
      <Skeleton width="260px" height="274px" className="card-campaign-column" />
      <Skeleton width="260px" height="274px" className="card-campaign-column" />
      <Skeleton width="60px" height="274px" className="card-campaign-column" />
    </div>
  );
}
