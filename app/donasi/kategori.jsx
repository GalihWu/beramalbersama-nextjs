'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaAngleRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getProgramCategory } from '@/service/FetchData';

export const Kategori = ({ onCategorySelect }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName === activeFilter ? null : filterName);
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
    setActiveFilter(null);
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['donasiCategory'],
    queryFn: getProgramCategory,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (error) return <div>An error occurred: {error.message}</div>;
  const category = data?.data;
  return (
    <div id="categoryAccordion" className="category-filters accordion">
      <div className="nav-filter shadow-sm my-0">
        <button
          style={{ fontWeight: 'bold' }}
          className={`flex gap-2 ml-6 !font-medium p-0 text-gray text-base collapsed${
            activeFilter === 'Kategori' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleFilterClick('Kategori')}
          aria-expanded={activeFilter === 'Kategori'}
          aria-controls="collapseOne"
        >
          <Image
            src="/img/icons/Setting.png"
            className="h-6 w-auto"
            alt="kategori"
            width={50}
            height={50}
          />{' '}
          Kategori
        </button>
        {/* <button
          style={{ fontWeight: "bold" }}
          className={`btn btn-link collapsed font-bold ${
            activeFilter === "Urutkan" ? "active" : ""
          }`}
          type="button"
          onClick={() => handleFilterClick("Urutkan")}
          aria-expanded={activeFilter === "Urutkan"}
          aria-controls="collapseTwo"
        >
          <Image
            src="/img/svg/icon_sort.svg"
            className="mr-1"
            alt="urutkan"
            width={25}
            height={30}
          />{" "}
          Urutkan
        </button> */}
      </div>
      <div className="filter __content">
        <div
          id="collapseOne"
          className={`accordion-collapse ${
            activeFilter === 'Kategori'
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0'
          } transition-all duration-300 overflow-hidden`}
        >
          <div className="p-2 bg-white border border-gray-300 my-1 rounded-md shadow-sm">
            <ul className="filter-links">
              {!isLoading &&
                category.map((item, index) => (
                  <li key={index}>
                    <a href="#" onClick={() => handleCategoryClick(item.id)}>
                      <div className="flex gap-2 w-[70%] max-h-[12rem]">
                        <Image
                          src={item.image_url}
                          alt={item.image}
                          width={20}
                          height={20}
                        />
                        <span>{item.name}</span>
                      </div>
                      <FaAngleRight size={16} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div
          id="collapseTwo"
          className={`accordion-collapse ${
            activeFilter === 'Urutkan' ? 'show' : 'collapse'
          }`}
          aria-labelledby="headingTwo"
          data-bs-parent="#categoryAccordion"
        >
          <div className="p-2 bg-white border border-gray-300 my-1 rounded-md shadow-sm">
            <ul className="filter-links">
              <li>
                <a href="#">
                  <span>Paling Mendesak</span>
                  <FaAngleRight size={16} />
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Paling Sesuai</span>
                  <FaAngleRight size={16} />
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Terbaru</span>
                  <FaAngleRight size={16} />
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Terkumpul Dana Paling Sedikit</span>
                  <FaAngleRight size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
