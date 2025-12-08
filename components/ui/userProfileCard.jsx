import React from 'react';
import { initialName } from '@/lib/formater';

import { MdPhone } from 'react-icons/md';

export const UserProfileCard = ({ name, phone }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 my-2 w-full">
      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-200">
        <span className="text-white font-semibold text-lg md:text-xl">
          {initialName(name)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-base md:text-lg truncate">
          {name}
        </h3>
        <p className="flex gap-2 items-center text-gray-600 text-sm md:text-base mt-1">
          <MdPhone size={14} /> {phone}
        </p>
      </div>

      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
    </div>
  );
};
