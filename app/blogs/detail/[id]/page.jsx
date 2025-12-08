'use client';

import React from 'react';
import { FaClock, FaTag, FaUser } from 'react-icons/fa';

// component
import { Navbar } from '@/components/ui/navbar';
import { KataKunci } from './kataKunci';
// import { ArtikelTerkait } from "./artikelTerkait";
// import { Komen } from "./komen";
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { getBlogsByLink } from '@/service/FetchData';
import { fullDayFormatter } from '@/lib/formater';
import Image from 'next/image';
import Skeleton from '@/components/ui/skeleton/skeleton';
// import Image from 'next/image';

const BlogDetail = ({ params }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['blogId', params.id],
    queryFn: () => getBlogsByLink(params.id),
    enabled: !!params.id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
  if (isLoading) return;
  <>
    <Header />
    <div className="content-wrapper bg-grey">
      <div className="container">
        <div className="box-content"></div>
        <div className="content-body">
          <Skeleton className="blog-title" />
          <Skeleton className="blog-desc" />
          <Skeleton className="blog-image" />
          <Skeleton className="blog-content" />
        </div>
      </div>
    </div>
  </>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const detailBlog = data?.data;

  return (
    <>
      <Header />
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="box-content">
            <div className="content-body">
              <div className="blog-title">{detailBlog.title}</div>
              <div className="blog-desc">
                <div className="blog-author">
                  <p
                    className="flex gap-2 items-center mb-0"
                    style={{
                      fontSize: '14px',
                      color: '#29a399',
                      fontWeight: ' 600',
                    }}
                  >
                    <FaUser /> {detailBlog.creator}
                  </p>
                  <div className="date flex gap-2 items-center">
                    <FaClock /> {fullDayFormatter(detailBlog.created_at)}
                  </div>
                </div>
                <a
                  href="blogs.html"
                  className="blog-category flex gap-2 items-center"
                >
                  <FaTag />
                  {detailBlog?.category?.name ?? 'Umum'}
                </a>
              </div>
              <Image
                width={500}
                height={500}
                className="blog-image"
                src={detailBlog.image_url}
                alt="detail-blog"
              />
              <div className="blog-content">
                <p>
                  <strong>{detailBlog.title}</strong>
                </p>
              </div>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: detailBlog.content }}
              ></div>
            </div>
            <KataKunci tags={detailBlog?.tags} />
            {/* <ArtikelTerkait /> */}
            {/* <div className="content-body border-top">
              <p className="text-18 text-strong">Tulis Komentar</p>
              <form className="blog-comment">
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    type="email"
                    className="form-control"
                    placeholder="Komentar (maksimal 500 kata)"
                    defaultValue={""}
                  />
                </div>
                <div className="mb-2">
                  <button className="btn button-cyan w-100">
                    Kirim Komentar
                  </button>
                </div>
              </form>
              <Komen />
            </div> */}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default BlogDetail;
