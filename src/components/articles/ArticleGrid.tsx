"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IArticle } from '@/lib/models/Article';

// Opsi sort
const sortOptions = [
  { id: "date-desc", name: "Terbaru" },
  { id: "date-asc", name: "Terlama" },
  { id: "title-asc", name: "Judul (A-Z)" },
  { id: "read-time-asc", name: "Waktu Baca (Terendah)" },
];

export default function ArticleGrid() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/articles');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch articles');
        }
        const data = await res.json();
        if (data.success) {
          setArticles(data.data);
        } else {
          throw new Error(data.error || 'API returned success:false');
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter artikel berdasarkan pencarian
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort artikel
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "date-asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "read-time-asc") {
      const aTime = parseInt(a.readTime || "0");
      const bTime = parseInt(b.readTime || "0");
      return aTime - bTime;
    }
    return 0;
  });

  // Format date helper
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        <h3 className="font-semibold">Error loading articles</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari artikel..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Urut berdasarkan:</span>
          <select
            className="border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Menampilkan {sortedArticles.length} dari {articles.length} artikel
        </p>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedArticles.map((article) => (
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-gray-600">
                        {article.author
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-gray-700">{article.author}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">{formatDate(article.date)}</span>
                    {article.readTime && (
                      <>
                        <span>•</span>
                        <span className="ml-2">{article.readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedArticles.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {searchTerm ? "Tidak Ditemukan" : "Belum Ada Artikel"}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? `Maaf, tidak ada artikel yang sesuai dengan pencarian "${searchTerm}". Coba kata kunci lain atau reset filter.`
              : "Saat ini belum ada artikel yang tersedia. Silakan tambahkan artikel melalui panel admin."
            }
          </p>
        </div>
      )}

      {/* Simple Pagination Placeholder */}
      {sortedArticles.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center">
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2 disabled:opacity-50"
              disabled
            >
              <svg
                className="h-5 w-5 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sebelumnya
            </button>

            <span className="inline-flex items-center px-4 py-2 border border-primary-500 rounded-md text-sm font-medium text-primary-700 bg-primary-50">
              1
            </span>

            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ml-2 disabled:opacity-50"
              disabled
            >
              Berikutnya
              <svg
                className="h-5 w-5 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}