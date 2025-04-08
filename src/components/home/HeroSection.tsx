import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-20 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ensiklopedia Tanaman Obat Indonesia
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Jelajahi kekayaan tanaman obat tradisional Indonesia, manfaatnya
              untuk kesehatan, dan peran pentingnya dalam menjaga lingkungan
              hijau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/katalog"
                className="btn bg-white text-primary-700 hover:bg-gray-100"
              >
                Lihat Katalog
              </Link>
              <Link
                href="#featured"
                className="btn bg-transparent border border-white text-white hover:bg-primary-600"
              >
                Tanaman Unggulan
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative h-[500px] w-full">
              {/* Lingkaran di belakang daun */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-white/10 rounded-full z-0"></div>

              {/* Gambar daun */}
              <div className="absolute inset-0 z-10">
                <Image
                  src="/leaf2.png"
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
