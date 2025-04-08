import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/globe.svg"
                  alt="Herbapedia Logo"
                  fill
                  className="object-contain invert"
                />
              </div>
              <span className="text-xl font-bold">Herbapedia</span>
            </div>
            <p className="text-primary-100 mb-4">
              Portal informasi tanaman obat tradisional Indonesia untuk melestarikan pengetahuan lokal dan menjaga lingkungan hijau.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-100 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="text-primary-100 hover:text-white transition-colors">
                  Katalog Tanaman
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="text-primary-100 hover:text-white transition-colors">
                  Artikel Edukasi
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-primary-100 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-primary-100 hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/katalog?kategori=daun" className="text-primary-100 hover:text-white transition-colors">
                  Tanaman Daun
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=akar" className="text-primary-100 hover:text-white transition-colors">
                  Tanaman Akar
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=buah" className="text-primary-100 hover:text-white transition-colors">
                  Tanaman Buah
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=bunga" className="text-primary-100 hover:text-white transition-colors">
                  Tanaman Bunga
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=rempah" className="text-primary-100 hover:text-white transition-colors">
                  Rempah-rempah
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-primary-300 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-primary-100">info@herbapedia.id</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-primary-300 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-primary-100">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-primary-300 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-primary-100">
                  Jl. Tanaman Obat No. 123, Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-200">
          <p>© {new Date().getFullYear()} Herbapedia. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}