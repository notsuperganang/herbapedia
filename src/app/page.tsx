import Link from 'next/link';
import FeaturedPlants from '@/components/home/FeaturedPlants';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ArticlePreview from '@/components/home/ArticlePreview';

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Kenapa Tanaman Obat */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Kenapa Tanaman Obat?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Tanaman obat telah digunakan secara turun temurun oleh masyarakat Indonesia untuk menjaga kesehatan dan mengobati berbagai penyakit. Selain bermanfaat untuk kesehatan, pemanfaatan tanaman obat juga mendukung pelestarian lingkungan hijau.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Alami & Aman</h3>
              <p className="text-gray-600">
                Tanaman obat menawarkan solusi kesehatan yang alami dengan efek samping minimal dibandingkan obat kimia.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Berkelanjutan</h3>
              <p className="text-gray-600">
                Pemanfaatan tanaman obat mendorong pelestarian keanekaragaman hayati dan menjaga keberlanjutan ekosistem.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Warisan Budaya</h3>
              <p className="text-gray-600">
                Pengetahuan tentang tanaman obat merupakan warisan budaya yang perlu dilestarikan untuk generasi mendatang.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tanaman Unggulan */}
      <FeaturedPlants />
      
      {/* Kategori Tanaman */}
      <CategoriesSection />
      
      {/* Artikel Terbaru */}
      <ArticlePreview />
      
      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Jelajahi Kekayaan Tanaman Obat Indonesia</h2>
            <p className="mb-8 text-primary-100">
              Pelajari lebih dari 100+ jenis tanaman obat tradisional, manfaat, dan cara penggunaannya untuk kesehatan dan menjaga lingkungan hijau.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/katalog" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Lihat Katalog
              </Link>
              <Link href="/artikel" className="btn bg-primary-600 text-white border border-primary-500 hover:bg-primary-800">
                Baca Artikel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}