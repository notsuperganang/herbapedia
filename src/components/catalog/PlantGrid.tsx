// src/components/catalog/PlantGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IPlant } from '@/lib/models/Plant'; // Asumsi IPlant ada di sini

// Opsi sort bisa tetap ada
const sortOptions = [
  { id: 'name-asc', name: 'Nama (A-Z)' },
  { id: 'name-desc', name: 'Nama (Z-A)' },
  { id: 'region', name: 'Daerah Asal (A-Z)' }, // Disesuaikan
];

export default function PlantGrid() {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/plants'); // Mengambil data dari API
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch plants from API');
        }
        const data = await res.json();
        if (data.success) {
          setPlants(data.data);
        } else {
          throw new Error(data.error || 'API returned success:false');
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error in PlantGrid fetchPlants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  // Filter plants berdasarkan pencarian
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plant.latinName && plant.latinName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort plants
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortBy === 'region') {
      // Pastikan field 'region' ada dan bisa dibandingkan
      return (a.region || '').localeCompare(b.region || '');
    }
    return 0;
  });

  if (loading) {
    return <div className="text-center py-10">Loading plants catalog...</div>;
  }

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded-md">Error loading plants: {error}</div>;
  }

  return (
    <div>
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 p-4 bg-white rounded-lg shadow">
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
            className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
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
      
      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Menampilkan {sortedPlants.length} dari {plants.length} tanaman.
        </p>
      </div>
      
      {/* Plant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlants.map((plant) => (
          <Link key={plant._id as string} href={`/tanaman/${plant.slug}`} className="block group">
            <div className="card h-full group-hover:shadow-xl group-hover:translate-y-[-5px] transition-all duration-300 flex flex-col">
            <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
              <Image
                src={plant.image || 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=No+Image'} // Fallback jika image kosong
                alt={plant.name}
                fill // Menggunakan fill untuk object-fit
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                    // Ganti dengan placeholder jika gambar gagal dimuat
                    e.currentTarget.srcset = 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=Img+Error';
                    e.currentTarget.src = 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=Img+Error';
                }}
              />
            </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{plant.name}</h3>
                <p className="text-sm italic text-gray-500 mb-2">{plant.latinName}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{plant.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {plant.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                      {benefit}
                    </span>
                  ))}
                  {plant.benefits.length > 2 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                      +{plant.benefits.length - 2} lainnya
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm mt-auto pt-3 border-t border-gray-100">
                  <span className="text-gray-500">{plant.region}</span>
                  <span className="text-primary-600 font-medium group-hover:underline">
                    Lihat Detail
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {sortedPlants.length === 0 && searchTerm && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center col-span-full mt-6">
          <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak Ditemukan</h3>
          <p className="text-gray-600">
            Maaf, tidak ada tanaman yang sesuai dengan pencarian "{searchTerm}". Coba kata kunci lain.
          </p>
        </div>
      )}
       {plants.length === 0 && !loading && !error && (
         <div className="bg-white rounded-lg shadow-sm p-8 text-center col-span-full mt-6">
            <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m0 0h16M4 7L12 3l8 4M4 7l8 4m8-4l-8 4m0 0v10m0-10L4 7m8 4l8-4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Tanaman</h3>
            <p className="text-gray-600">
                Saat ini belum ada data tanaman di katalog. Silakan tambahkan melalui panel admin.
            </p>
        </div>
      )}
    </div>
  );
}
