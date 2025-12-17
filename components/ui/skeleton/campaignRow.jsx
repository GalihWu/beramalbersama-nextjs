import React from 'react';
import Skeleton from './skeleton';

export default function CampaignRow() {
  return (
    <>
      <div className="card-campaign-row">
        <Skeleton
          width="250px"
          height="184px"
          className="card-campaign-image"
        />
        <div className="card-campaign-text">
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <div className="card-campaign-nominal" style={{ height: '10px' }}>
            <Skeleton className="text-left" />
            <Skeleton className="text-right" />
          </div>
          <Skeleton className="progress" />
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <Skeleton className="progress" />
        </div>
      </div>
      <div className="card-campaign-row">
        <Skeleton
          width="250px"
          height="184px"
          className="card-campaign-image"
        />
        <div className="card-campaign-text">
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <div className="card-campaign-nominal" style={{ height: '10px' }}>
            <Skeleton className="text-left" />
            <Skeleton className="text-right" />
          </div>
          <Skeleton className="progress" />
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <Skeleton className="progress" />
        </div>
      </div>
      <div className="card-campaign-row">
        <Skeleton
          width="250px"
          height="184px"
          className="card-campaign-image"
        />
        <div className="card-campaign-text">
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <div className="card-campaign-nominal" style={{ height: '10px' }}>
            <Skeleton className="text-left" />
            <Skeleton className="text-right" />
          </div>
          <Skeleton className="progress" />
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <Skeleton className="progress" />
        </div>
      </div>
      <div className="card-campaign-row">
        <Skeleton
          width="250px"
          height="184px"
          className="card-campaign-image"
        />
        <div className="card-campaign-text">
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <div className="card-campaign-nominal" style={{ height: '10px' }}>
            <Skeleton className="text-left" />
            <Skeleton className="text-right" />
          </div>
          <Skeleton className="progress" />
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <Skeleton className="progress" />
        </div>
      </div>
      <div className="card-campaign-row">
        <Skeleton
          width="250px"
          height="184px"
          className="card-campaign-image"
        />
        <div className="card-campaign-text">
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <div className="card-campaign-nominal" style={{ height: '10px' }}>
            <Skeleton className="text-left" />
            <Skeleton className="text-right" />
          </div>
          <Skeleton className="progress" />
          <Skeleton className="card-campaign-title" />
          <Skeleton className="progress" />
          <Skeleton className="progress" />
        </div>
      </div>
    </>
  );
}
