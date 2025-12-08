import Image from 'next/image';
import React from 'react';

export const Loading = () => {
  return (
    <div className="loading-button">
      <Image
        width={200}
        height={200}
        src="/img/ajax-loader.gif"
        alt="Loading..."
        className="w-11 h-11"
      />
    </div>
  );
};
