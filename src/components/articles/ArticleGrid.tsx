'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Data artikel (dummy)
const articles = [
  {
    id: 1,
    title: 'Cara Menanam Jahe di Rumah dengan Mudah',
    excerpt: 'Panduan lengkap untuk menanam dan merawat tanaman jahe di pekarangan rumah Anda, mulai dari persiapan media tanam hingga pemanenan.',
    image: '/articles/jahe-tanam.jpg',
    author: 'Dr. Rina Herbal',
    date: '15 Mar 2025',
    slug: 'cara-menanam-jahe-di-rumah',
    category: 'Panduan Menanam',
    readTime: '8 menit',
  },
  {
    id: 2,
    title: 'Manfaat Kunyit untuk Sistem Pencernaan',
    excerpt: 'Temukan berbagai manfaat kunyit untuk kesehatan sistem pencernaan dan bagaimana cara konsumsi yang tepat untuk hasil maksimal.',
    image: '/articles/kunyit-gastro.jpg',
    author: 'Prof. Budi Santoso',
    date: '28 Feb 2025',
    slug: 'manfaat-kunyit-untuk-pencernaan',
    category: 'Manfaat Kesehatan',
    readTime: '6 menit',
  },
  {
    id: 3,
    title: 'Pelestarian Tanaman Obat Langka di Indonesia',
    excerpt: 'Upaya konservasi untuk menyelamatkan tanaman obat langka yang terancam punah di berbagai wilayah Indonesia.',
    image: '/articles/konservasi.jpg',
    author: 'Dewi Lestari',
    date: '10 Feb 2025',
    slug: 'pelestarian-tanaman-obat-langka',
    category: 'Konservasi',
    readTime: '10 menit',
  },
  {
    id: 4,
    title: 'Peran Tanaman Obat dalam Upacara Adat Jawa',
    excerpt: 'Mengenal berbagai jenis tanaman obat yang digunakan dalam upacara adat dan ritual tradisional masyarakat Jawa.',
    image: '/articles/ritual-jawa.jpg',
    author: 'Prof. Slamet Raharjo',
    date: '5 Feb 2025',
    slug: 'tanaman-obat-upacara-adat-jawa',
    category: 'Budaya Tradisional',
    readTime: '12 menit',
  },
  {
    id: 5,
    title: 'Mengenal Jamu: Warisan Obat Tradisional Indonesia',
    excerpt: 'Sejarah panjang jamu sebagai minuman kesehatan tradisional Indonesia dan ragam manfaatnya yang telah terbukti secara turun-temurun.',
    image: '/articles/jamu.jpg',
    author: 'Dr. Maya Wijaya',
    date: '28 Jan 2025',
    slug: 'mengenal-jamu-warisan-obat-tradisional',
    category: 'Budaya Tradisional',
    readTime: '9 menit',
  },
  {
    id: 6,
    title: '5 Tips Merawat Tanaman Obat di Musim Kemarau',
    excerpt: 'Panduan praktis untuk menjaga tanaman obat Anda tetap sehat dan subur selama musim kemarau panjang.',
    image: '/articles/dry-season.jpg',
    author: 'Hendra Tani',
    date: '15 Jan 2025',
    slug: 'tips-merawat-tanaman-obat-musim-kemarau',
    category: 'Tips dan Trik',
    readTime: '5 menit',
  },
  {
    id: 7,
    title: 'Studi Terbaru: Ekstrak Temulawak Efektif Meningkatkan Imunitas',
    excerpt: 'Penelitian terbaru menunjukkan bahwa ekstrak temulawak memiliki potensi untuk meningkatkan sistem kekebalan tubuh manusia.',
    image: '/articles/research.jpg',
    author: 'Dr. Aditya Nugraha, Ph.D',
    date: '5 Jan 2025',
    slug: 'studi-temulawak-meningkatkan-imunitas',
    category: 'Penelitian & Inovasi',
    readTime: '7 menit',
  },
  {
    id: 8,
    title: 'Membuat Kebun Vertikal Tanaman Obat di Lahan Terbatas',
    excerpt: 'Solusi cerdas untuk menanam berbagai tanaman obat di rumah dengan lahan terbatas menggunakan sistem kebun vertikal.',
    image: '/articles/vertical-garden.jpg',
    author: 'Indra Permana',
    date: '28 Dec 2024',
    slug: 'kebun-vertikal-tanaman-obat-lahan-terbatas',
    category: 'Panduan Menanam',
    readTime: '8 menit',
  },
];

// Opsi sort
const sortOptions = [
  { id: 'date-desc', name: 'Terbaru' },
  { id: 'date-asc', name: 'Terlama' },
  { id: 'title-asc', name: 'Judul (A-Z)' },
  { id: 'read-time-asc', name: 'Waktu Baca (Terendah)' },
];

export default function ArticleGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  
  // Filter artikel berdasarkan pencarian
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort artikel
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'read-time-asc') {
      return parseInt(a.readTime) - parseInt(b.readTime);
    }
    return 0;
  });

  return (
    <div>
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
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
          Menampilkan {sortedArticles.length} artikel
        </p>
      </div>
      
      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedArticles.map((article) => (
          <Link key={article.id} href={`/artikel/${article.slug}`}>
            <article className="card h-full hover:translate-y-[-5px] transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-gray-600">
                        {article.author.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                    <span className="text-gray-700">{article.author}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">{article.date}</span>
                    <span>•</span>
                    <span className="ml-2">{article.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {sortedArticles.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak Ditemukan</h3>
          <p className="text-gray-600">
            Maaf, tidak ada artikel yang sesuai dengan pencarian "{searchTerm}". Coba kata kunci lain atau reset filter.
          </p>
        </div>
      )}
      
      {/* Pagination */}
      {sortedArticles.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2">
              <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sebelumnya
            </button>
            
            <div className="hidden md:flex">
              <a href="#" className="inline-flex items-center px-4 py-2 border border-primary-500 rounded-md text-sm font-medium text-primary-700 bg-primary-50">1</a>
              <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">2</a>
              <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">...</span>
              <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">8</a>
            </div>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ml-2">
              Berikutnya
              <svg className="h-5 w-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}