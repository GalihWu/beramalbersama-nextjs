import Skeleton from '@/components/ui/skeleton/skeleton';
import { dateFormatter } from '@/lib/formater';
import { getBlogs } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { FaClock, FaTag, FaUser } from 'react-icons/fa';

export const Blogs = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({
        limit: 10,
        mode: 'limit',
        page: pageParam,
      }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (error) return <div>An error occurred: {error.message}</div>;
  //   const blogs = data.pages.flatMap((page) => page.data.data);
  const blogs = data?.data || [];

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };
  //   .filter((blog) => blog.category.name === 'Release')

  return (
    <div className="container !py-8">
      <h2 className="text-base md:text-lg font-semibold">PUBLIKASI MEDIA</h2>
      <div className="">
        {isLoading ? (
          <div>
            <Skeleton className="post-box" />
            <Skeleton className="post-box" />
          </div>
        ) : blogs && blogs.length > 0 ? (
          blogs
            ?.filter((blog) => blog.category.name === 'Release')
            .map((post, index) => (
              <div key={index}>
                <Link
                  className="post-box"
                  href={`/blogs/detail/${post.link}`}
                  key={post.id}
                >
                  <figure
                    className="post-image"
                    style={{
                      backgroundImage: `url(${post.image_url})`,
                    }}
                  />
                  <div className="post-text">
                    <div className="d-flex w-100 justify-content-end">
                      <div
                        className={`post-category ${post.category.name} flex items-center gap-2`}
                      >
                        <FaTag />
                        {post.category.name}
                      </div>
                    </div>
                    <div className="post-bottom w-full">
                      <h1 className="post-title">{post.title}</h1>
                      <p className="post-headline">
                        {truncateDescription(post.description, 10)}
                      </p>
                      <div className="flex justify-between items-center w-full">
                        <div className="post-author flex gap-2">
                          <FaUser /> {post.creator}
                        </div>
                        <div className="text-white flex gap-2 text-sm md:text-base items-center">
                          <FaClock />
                          {dateFormatter(post.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
        ) : (
          <p>No campaigns available</p>
        )}
        {/* <Link
          href={'/blogs'}
          className="text-end text-neutral-500 text-sm md:text-base w-full hover:underline hover:text-primary-500 cursor-pointer"
        >
          Lihat Selengkapnya
        </Link> */}
      </div>
    </div>
  );
};
