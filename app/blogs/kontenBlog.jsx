import React from 'react';
import { FaTag, FaUser } from 'react-icons/fa';
import { dateFormatter, dayFormatter } from '@/lib/formater';
import Link from 'next/link';
import { Loading } from '@/components/ui/Loading';

export const KontenBlog = ({
  data,
  blogs,
  visibleCount,
  loadMore,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };
  return (
    <div className="container">
      <div className="box-content">
        <div className="content-body">
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, visibleCount).map((post, index) => (
              <div key={index}>
                <div className="blog-date">
                  <p>{dateFormatter(post.created_at)}</p>
                  <h6>{dayFormatter(post.created_at)}</h6>
                </div>
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
                    <div className="post-bottom">
                      <h1 className="post-title">{post.title}</h1>
                      <p className="post-headline">
                        {truncateDescription(post.description, 10)}
                      </p>
                      <div className="post-author flex gap-2">
                        <FaUser /> {post.creator}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No campaigns available</p>
          )}
          {visibleCount < (data?.pages[0]?.data?.total || 0) && hasNextPage && (
            <div className="d-flex justify-content-center mb-5">
              <button
                className="btn button-link color-cyan"
                onClick={loadMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? <Loading /> : 'Lihat lebih banyak'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
