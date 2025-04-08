import Image from 'next/image';
import Link from 'next/link';

// Data artikel
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
  },
];

export default function ArticlePreview() {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Artikel Edukasi Terbaru</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Pelajari berbagai informasi dan tips tentang pemanfaatan dan pelestarian tanaman obat tradisional Indonesia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{article.date}</span>
                    <span className="text-primary-600 font-medium">Baca selengkapnya</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/artikel" className="btn btn-primary">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}