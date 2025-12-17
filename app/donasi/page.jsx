'use client';
import React, { Suspense, useMemo, useState } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FaAngleRight, FaFilter, FaTimes } from 'react-icons/fa';

import Header from '@/components/ui/header';
import { Navbar } from '@/components/ui/navbar';
import { Loading } from '@/components/ui/Loading';
import CampaignRow from '@/components/ui/skeleton/campaignRow';
import { Donasi } from './donasi';

import { getAllProgram, getProgramCategory } from '@/service/FetchData';

const ProgramDonasi = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState(false);

  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const searchQuery = useMemo(
    () => searchParams?.get('q') || null,
    [searchParams]
  );

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['allProgram', selectedCategory, searchQuery],
      queryFn: ({ pageParam = 1 }) =>
        getAllProgram({
          limit: 5,
          mode: 'pagination',
          page: pageParam,
          category: selectedCategory,
          search: searchQuery,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.data.next_page_url
          ? lastPage.data.current_page + 1
          : undefined,
      staleTime: 5 * 60 * 1000,
    });

  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['donasiCategory'],
    queryFn: getProgramCategory,
    staleTime: 5 * 60 * 1000,
  });

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    setActiveFilter(false);
    queryClient.removeQueries({ queryKey: ['allProgram'] });
  };

  const handleResetCategory = () => {
    setSelectedCategory(null);
    queryClient.removeQueries({ queryKey: ['allProgram'] });
  };

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory || !categoryData) return null;
    return categoryData.data.find((cat) => cat.id === selectedCategory)?.name;
  }, [selectedCategory, categoryData]);

  return (
    <>
      <Header type="search" text={searchQuery} />

      <div className="content-wrapper bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container">
          {/* ENHANCED FILTER SECTION */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveFilter(!activeFilter)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-sm
                    ${
                      activeFilter
                        ? 'bg-primary-500 text-white scale-105 shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300 hover:shadow-md'
                    }
                  `}
                >
                  {activeFilter ? (
                    <FaTimes className="w-4 h-4" />
                  ) : (
                    <FaFilter className="w-4 h-4" />
                  )}
                  <span>Kategori</span>
                </button>

                {selectedCategoryName && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-primary-50 text-primary-700 rounded-xl border border-primary-200 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-sm font-medium">
                      {selectedCategoryName}
                    </span>
                    <button
                      onClick={handleResetCategory}
                      className="ml-1 p-1 hover:bg-primary-100 rounded-full transition-colors"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {selectedCategory && (
                <button
                  onClick={handleResetCategory}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* SLIDING CATEGORY PANEL */}
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              activeFilter ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-white shadow-lg border-b border-gray-100">
              <div className="px-4 py-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary-500 rounded-full"></div>
                  Pilih Kategori
                </h3>

                {isCategoryLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-14 bg-gray-100 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {categoryData?.data.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryClick(item.id)}
                        className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-top-2
                          ${
                            selectedCategory === item.id
                              ? 'bg-primary-500 text-white shadow-md scale-[1.02]'
                              : 'bg-gray-50 hover:bg-primary-50 hover:shadow-sm'
                          }
                        `}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`min-w-10 min-h-10 rounded-lg overflow-hidden border-2 transition-colors ${
                              selectedCategory === item.id
                                ? 'border-white'
                                : 'border-gray-200 group-hover:border-primary-300'
                            }`}
                          >
                            <Image
                              src={item.image_url}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span
                            className={`text-sm font-medium transition-colors ${
                              selectedCategory === item.id
                                ? 'text-white'
                                : 'text-gray-700 group-hover:text-primary-700'
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        <FaAngleRight
                          className={`transition-all duration-300 ${
                            selectedCategory === item.id
                              ? 'text-white translate-x-1'
                              : 'text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1'
                          }`}
                          size={16}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTENT WITH FADE IN */}
          <div className="py-4">
            {isLoading ? (
              <CampaignRow />
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Donasi
                  campaigns={data.pages.flatMap((p) => p.data.data)}
                  loadMore={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Navbar activeItem="/donasi" />
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProgramDonasi />
    </Suspense>
  );
}
