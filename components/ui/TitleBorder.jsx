import React from 'react';

export const TitleBorder = ({ title, amount }) => {
  return (
    <div className="flex gap-2 items-baseline	">
      <div className=" border-2 bg-primary-100 border-primary-500  text-base md:text-lg font-semibold px-2 py-1 md:px-3 md:py-2 rounded-2xl text-primary-500">
        {title}
      </div>
      {amount >= 1 && (
        <div className=" md:py-1 px-2 rounded-full bg-gray-300 text-white">
          {amount}
        </div>
      )}
    </div>
  );
};
