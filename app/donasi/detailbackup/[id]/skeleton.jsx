import Header from "@/components/ui/header";
import React from "react";
import Skeleton from "@/components/ui/skeleton/skeleton";
const DonasiDetailSkeleton = () => {
  return (
    <div className="content-wrapper bg-grey">
      <div className="container">
        <Header type="title" text="" />
        <Skeleton width="100%" height="361px" />
        <Skeleton width="50%" height="10px" className="mt-3 mb-3" />
        <Skeleton
          width="30%"
          height="10px"
          className="mt-3 mb-3 inline-block"
        />
        <Skeleton
          width="30%"
          height="10px"
          className="mt-3 mb-3 float-right inline-block"
        />
        <Skeleton width="100%" height="50px" className="mt-3 mb-3" />
        <Skeleton width="100%" height="10px" className="mt-3 mb-3" />
        <Skeleton width="100%" height="10px" className="mt-3 mb-3" />
        <Skeleton width="100%" height="50px" className="mt-3 mb-3" />
        <br />
        <Skeleton width="100%" height="100px" className="mt-3 mb-3" />
        <Skeleton width="100%" height="500px" className="mt-3 mb-3" />
      </div>
    </div>
  );
};

export default DonasiDetailSkeleton;
