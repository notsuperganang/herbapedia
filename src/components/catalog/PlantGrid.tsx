'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Data tanaman (dummy)
const plants = [
  {
    id: 1,
    name: 'Jahe',
    latinName: 'Zingiber officinale',
    description: 'Tanaman rimpang yang dikenal dengan aroma khasnya, biasa digunakan untuk menghangatkan tubuh dan meredakan masalah pencernaan.',
    benefits: ['Meredakan mual', 'Menghangatkan tubuh', 'Anti-inflamasi'],
    region: 'Asia Tenggara',
    parts: ['Rimpang'],
    image: '/plants/jahe.jpg',
    slug: 'jahe',
  },
  {
    id: 2,
    name: 'Kunyit',
    latinName: 'Curcuma longa',
    description: 'Rimpang berwarna oranye kekuningan dengan rasa pahit, sering digunakan sebagai bumbu dan memiliki sifat antioksidan tinggi.',
    benefits: ['Antioksidan', 'Anti-inflamasi', 'Meningkatkan pencernaan'],
    region: 'Asia Selatan',
    parts: ['Rimpang'],
    image: '/plants/kunyit.jpg',
    slug: 'kunyit',
  },
  {
    id: 3,
    name: 'Temulawak',
    latinName: 'Curcuma zanthorrhiza',
    description: 'Rimpang kuning kecokelatan dengan rasa pahit, secara tradisional digunakan untuk menjaga kesehatan hati dan meningkatkan nafsu makan.',
    benefits: ['Kesehatan hati', 'Nafsu makan', 'Daya tahan tubuh'],
    region: 'Indonesia',
    parts: ['Rimpang'],
    image: '/plants/temulawak.jpg',
    slug: 'temulawak',
  },
  {
    id: 4,
    name: 'Kencur',
    latinName: 'Kaempferia galanga',
    description: 'Rimpang aromatik yang memiliki rasa pahit dan pedas, digunakan untuk mengatasi masuk angin dan meredakan batuk.',
    benefits: ['Meredakan batuk', 'Mengatasi masuk angin', 'Anti radang'],
    region: 'Indonesia',
    parts: ['Rimpang'],
    image: '/plants/kencur.jpg',
    slug: 'kencur',
  },
  {
    id: 5,
    name: 'Daun Sirih',
    latinName: 'Piper betle',
    description: 'Daun hijau dengan permukaan mengkilap, memiliki sifat antiseptik dan digunakan untuk mengatasi berbagai masalah kesehatan.',
    benefits: ['Antiseptik', 'Menyembuhkan luka', 'Mengurangi bau mulut'],
    region: 'Asia Tenggara',
    parts: ['Daun'],
    image: '/plants/sirih.jpg',
    slug: 'daun-sirih',
  },
  {
    id: 6,
    name: 'Lidah Buaya',
    latinName: 'Aloe vera',
    description: 'Tanaman berdaging dengan getah bening di dalamnya, berguna untuk perawatan kulit dan rambut serta memiliki sifat anti-inflamasi.',
    benefits: ['Melembabkan kulit', 'Menyembuhkan luka bakar', 'Anti-inflamasi'],
    region: 'Afrika Utara',
    parts: ['Daun', 'Gel'],
    image: '/plants/lidah-buaya.jpg',
    slug: 'lidah-buaya',
  },
  {
    id: 7,
    name: 'Kumis Kucing',
    latinName: 'Orthosiphon aristatus',
    description: 'Tanaman dengan bunga menyerupai kumis kucing, secara tradisional digunakan untuk mengatasi masalah ginjal dan saluran kemih.',
    benefits: ['Kesehatan ginjal', 'Diuretik', 'Anti radang'],
    region: 'Asia Tenggara',
    parts: ['Daun', 'Batang'],
    image: '/plants/kumis-kucing.jpg',
    slug: 'kumis-kucing',
  },
  {
    id: 8,
    name: 'Sambiloto',
    latinName: 'Andrographis paniculata',
    description: 'Tanaman dengan rasa sangat pahit, dikenal sebagai "raja pahit" dan digunakan untuk meningkatkan kekebalan tubuh dan mengatasi demam.',
    benefits: ['Menurunkan demam', 'Meningkatkan imunitas', 'Anti virus'],
    region: 'India dan Asia Tenggara',
    parts: ['Daun', 'Batang'],
    image: '/plants/sambiloto.jpg',
    slug: 'sambiloto',
  },
];

// Opsi sort
const sortOptions = [
  { id: 'name-asc', name: 'Nama (A-Z)' },
  { id: 'name-desc', name: 'Nama (Z-A)' },
  { id: 'region', name: 'Daerah Asal' },
];

export default function PlantGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Filter plants berdasarkan pencarian
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.latinName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort plants
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortBy === 'region') {
      return a.region.localeCompare(b.region);
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
            placeholder="Cari nama tanaman..."
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
          Menampilkan {sortedPlants.length} tanaman
        </p>
      </div>
      
      {/* Plant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlants.map((plant) => (
          <Link key={plant.id} href={`/tanaman/${plant.slug}`} className="block">
            <div className="card h-full hover:translate-y-[-5px] transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{plant.name}</h3>
                <p className="text-sm italic text-gray-500 mb-2">{plant.latinName}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {plant.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                      {benefit}
                    </span>
                  ))}
                  {plant.benefits.length > 2 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      +{plant.benefits.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{plant.region}</span>
                  <span className="text-primary-600 font-medium">Detail</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {sortedPlants.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak Ditemukan</h3>
          <p className="text-gray-600">
            Maaf, tidak ada tanaman yang sesuai dengan pencarian "{searchTerm}". Coba kata kunci lain atau reset filter.
          </p>
        </div>
      )}
    </div>
  );
}