'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Herbapedia Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-primary-700">Herbapedia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Beranda
            </Link>
            <Link href="/katalog" className="text-gray-700 hover:text-primary-600 font-medium">
              Katalog
            </Link>
            <Link href="/artikel" className="text-gray-700 hover:text-primary-600 font-medium">
              Artikel
            </Link>
            <Link href="/tentang" className="text-gray-700 hover:text-primary-600 font-medium">
              Tentang Kami
            </Link>
            <Link href="/kontak" className="text-gray-700 hover:text-primary-600 font-medium">
              Kontak
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              href="/katalog" 
              className="block px-3 py-2 rounded text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Katalog
            </Link>
            <Link 
              href="/artikel" 
              className="block px-3 py-2 rounded text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Artikel
            </Link>
            <Link 
              href="/tentang" 
              className="block px-3 py-2 rounded text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link 
              href="/kontak" 
              className="block px-3 py-2 rounded text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}