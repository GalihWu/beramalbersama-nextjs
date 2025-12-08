import React from 'react';

const Skeleton = ({ width, height, className }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
