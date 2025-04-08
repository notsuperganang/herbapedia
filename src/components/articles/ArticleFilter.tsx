'use client';

import { useState } from 'react';

// Filter data
const categories = [
  { id: 'panduan-menanam', name: 'Panduan Menanam' },
  { id: 'manfaat-kesehatan', name: 'Manfaat Kesehatan' },
  { id: 'konservasi', name: 'Konservasi' },
  { id: 'budaya-tradisional', name: 'Budaya Tradisional' },
  { id: 'tips-dan-trik', name: 'Tips dan Trik' },
  { id: 'penelitian', name: 'Penelitian & Inovasi' },
];

export default function ArticleFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, id]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== id));
    }
  };
  
  const handleClearFilters = () => {
    setSelectedCategories([]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          Hapus Filter
        </button>
      </div>
      
      {/* Kategori */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-base font-medium text-gray-900 mb-4">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                id={`category-${category.id}`}
                name={`category-${category.id}`}
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              />
              <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tanggal */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-base font-medium text-gray-900 mb-4">Tanggal</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="date-all"
              name="date-filter"
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              defaultChecked
            />
            <label htmlFor="date-all" className="ml-3 text-sm text-gray-600">
              Semua Waktu
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="date-week"
              name="date-filter"
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label htmlFor="date-week" className="ml-3 text-sm text-gray-600">
              Minggu Ini
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="date-month"
              name="date-filter"
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label htmlFor="date-month" className="ml-3 text-sm text-gray-600">
              Bulan Ini
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="date-year"
              name="date-filter"
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label htmlFor="date-year" className="ml-3 text-sm text-gray-600">
              Tahun Ini
            </label>
          </div>
        </div>
      </div>
      
      {/* Penulis */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-base font-medium text-gray-900 mb-4">Penulis</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="author-all"
              name="author-filter"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="author-all" className="ml-3 text-sm text-gray-600">
              Semua Penulis
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="author-verified"
              name="author-filter"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="author-verified" className="ml-3 text-sm text-gray-600">
              Penulis Terverifikasi
            </label>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-2">
        <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}