import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
          <path fill="#FFF" d="M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
        </svg>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-20 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ensiklopedia Tanaman Obat Indonesia
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Jelajahi kekayaan tanaman obat tradisional Indonesia, manfaatnya untuk kesehatan, dan peran pentingnya dalam menjaga lingkungan hijau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/katalog" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Lihat Katalog
              </Link>
              <Link href="#featured" className="btn bg-transparent border border-white text-white hover:bg-primary-600">
                Tanaman Unggulan
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative h-96 w-full">
              <div className="absolute top-0 right-0 h-80 w-80 bg-white/10 rounded-full -mr-10"></div>
              <div className="absolute h-full w-full">
                <Image
                  src="/hero-plant.png"
                  alt="Koleksi tanaman obat Indonesia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="container-custom relative z-10 -mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto transform translate-y-1/2">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari tanaman obat..."
                className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cari
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}