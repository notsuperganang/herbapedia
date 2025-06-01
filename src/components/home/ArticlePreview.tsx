"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IArticle } from '@/lib/models/Article';

export default function ArticlePreview() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            // Take only first 3 articles for preview
            setArticles(data.data.slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Error fetching articles for preview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Artikel Edukasi Terbaru
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Pelajari berbagai informasi dan tips tentang pemanfaatan dan
              pelestarian tanaman obat tradisional Indonesia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-full animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Artikel Edukasi Terbaru
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Pelajari berbagai informasi dan tips tentang pemanfaatan dan
            pelestarian tanaman obat tradisional Indonesia.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article._id as string} href={`/artikel/${article.slug}`}>
                <article className="card h-full hover:translate-y-[-5px] transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={article.image || 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=No+Image'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=Img+Error';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{formatDate(article.date)}</span>
                      <span className="text-primary-600 font-medium">
                        Baca selengkapnya
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Artikel</h3>
            <p className="text-gray-600">Artikel akan muncul di sini setelah ditambahkan melalui panel admin.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/artikel" className="btn btn-primary">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}