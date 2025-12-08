'use client';
import React, { useEffect, useState } from 'react';

import { Navbar } from '@/components/ui/navbar';
import { KontenBlog } from './kontenBlog';
import Header from '@/components/ui/header';
import { useInfiniteQuery } from '@tanstack/react-query';
import Skeleton from '@/components/ui/skeleton/skeleton';
import { getBlogs } from '@/service/FetchData';

const Blogs = () => {
  const [visibleCount, setVisibleCount] = useState(5); // Start with 6 visible donors
  const loadMore = () => {
    fetchNextPage();
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['allBlogs'],
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({
        limit: 5,
        mode: 'pagination',
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.next_page_url ? lastPage.data.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
  useEffect(() => {
    setVisibleCount(5); // Reset visible count to initial value
    refetch(); // Refetch data with new category
  }, [refetch]);

  if ((isLoading || isFetching) && !isFetchingNextPage)
    return (
      <>
        <Header />
        <div className="content-wrapper bg-grey">
          <div
            className="banner-title"
            style={{ backgroundImage: 'url("/img/waves-cyan.svg")' }}
          >
            <div className="container">
              <p>Kabar Terkini</p>
              <h1>Blog</h1>
            </div>
          </div>
          <div className="container">
            <div className=" mt-4 gap-3 flex flex-col">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-full h-[350px]" />
            </div>
            <div className=" mt-4 gap-3 flex flex-col">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-full h-[350px]" />
            </div>
            <div className=" mt-4 gap-3 flex flex-col">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-full h-[350px]" />
            </div>
          </div>
        </div>
      </>
    );
  if (error) return <div>An error occurred: {error.message}</div>;
  const blogs = data.pages.flatMap((page) => page.data.data);

  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <div
          className="banner-title"
          style={{ backgroundImage: 'url("/img/waves-cyan.svg")' }}
        >
          <div className="container">
            <p>Kabar Terkini</p>
            <h1>Blog</h1>
          </div>
        </div>
        <KontenBlog
          data={data}
          blogs={blogs}
          visibleCount={visibleCount}
          loadMore={loadMore}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        <Navbar activeItem="/" />
      </div>
    </>
  );
};

export default Blogs;
