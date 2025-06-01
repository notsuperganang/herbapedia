"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPlant } from '@/lib/models/Plant';

export default function FeaturedPlants() {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPlants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/plants');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch plants');
        }
        const data = await res.json();
        if (data.success) {
          // Take only first 4 plants for featured section
          setPlants(data.data.slice(0, 4));
        } else {
          throw new Error(data.error || 'API returned success:false');
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching featured plants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPlants();
  }, []);

  if (loading) {
    return (
      <section id="featured" className="section bg-gray-50 pt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tanaman Obat Unggulan</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Berikut adalah beberapa tanaman obat yang banyak digunakan dalam pengobatan tradisional Indonesia dan memiliki khasiat yang telah terbukti secara ilmiah.
            </p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card h-full animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="featured" className="section bg-gray-50 pt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tanaman Obat Unggulan</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Berikut adalah beberapa tanaman obat yang banyak digunakan dalam pengobatan tradisional Indonesia dan memiliki khasiat yang telah terbukti secara ilmiah.
            </p>
          </div>
          
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Plants</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="section bg-gray-50 pt-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tanaman Obat Unggulan</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Berikut adalah beberapa tanaman obat yang banyak digunakan dalam pengobatan tradisional Indonesia dan memiliki khasiat yang telah terbukti secara ilmiah.
          </p>
        </div>
        
        {plants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <Link key={plant._id as string} href={`/tanaman/${plant.slug}`}>
                <div className="card h-full hover:translate-y-[-5px] transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={plant.image || 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=No+Image'}
                      alt={plant.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400/EBF4FF/7F9CF5?text=Img+Error';
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800">{plant.name}</h3>
                    <p className="text-sm italic text-gray-500 mb-2">{plant.latinName}</p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>
                    
                    {/* Show first 2 benefits */}
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
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Asal: {plant.region}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Tanaman</h3>
            <p className="text-gray-600">Tanaman akan muncul di sini setelah ditambahkan melalui panel admin.</p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/katalog" className="btn btn-primary">
            Lihat Semua Tanaman
          </Link>
        </div>
      </div>
    </section>
  );
}