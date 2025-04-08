'use client';

import { useState } from 'react';

// Filter data
const filters = {
  bagian: [
    { id: 'daun', name: 'Daun' },
    { id: 'akar', name: 'Akar' },
    { id: 'buah', name: 'Buah' },
    { id: 'bunga', name: 'Bunga' },
    { id: 'batang', name: 'Batang' },
    { id: 'biji', name: 'Biji' },
  ],
  khasiat: [
    { id: 'anti-radang', name: 'Anti Radang' },
    { id: 'penurun-panas', name: 'Penurun Panas' },
    { id: 'peredaran-darah', name: 'Peredaran Darah' },
    { id: 'pernapasan', name: 'Pernapasan' },
    { id: 'pencernaan', name: 'Pencernaan' },
    { id: 'kekebalan-tubuh', name: 'Kekebalan Tubuh' },
  ],
  daerah: [
    { id: 'jawa', name: 'Jawa' },
    { id: 'sumatera', name: 'Sumatera' },
    { id: 'kalimantan', name: 'Kalimantan' },
    { id: 'sulawesi', name: 'Sulawesi' },
    { id: 'papua', name: 'Papua' },
    { id: 'bali-nusatenggara', name: 'Bali & Nusa Tenggara' },
  ],
};

// Definisi tipe untuk selectedFilters
interface SelectedFilters {
  bagian: string[];
  khasiat: string[];
  daerah: string[];
}

export default function PlantFilter() {
  const [isOpenBagian, setIsOpenBagian] = useState(true);
  const [isOpenKhasiat, setIsOpenKhasiat] = useState(true);
  const [isOpenDaerah, setIsOpenDaerah] = useState(true);
  
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    bagian: [],
    khasiat: [],
    daerah: [],
  });
  
  const handleFilterChange = (category: string, id: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        if (category === 'bagian') {
          newFilters.bagian = [...newFilters.bagian, id];
        } else if (category === 'khasiat') {
          newFilters.khasiat = [...newFilters.khasiat, id];
        } else if (category === 'daerah') {
          newFilters.daerah = [...newFilters.daerah, id];
        }
      } else {
        if (category === 'bagian') {
          newFilters.bagian = newFilters.bagian.filter(item => item !== id);
        } else if (category === 'khasiat') {
          newFilters.khasiat = newFilters.khasiat.filter(item => item !== id);
        } else if (category === 'daerah') {
          newFilters.daerah = newFilters.daerah.filter(item => item !== id);
        }
      }
      return newFilters;
    });
  };
  
  const handleClearFilters = () => {
    setSelectedFilters({
      bagian: [],
      khasiat: [],
      daerah: [],
    });
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
      
      {/* Bagian Tanaman */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => setIsOpenBagian(!isOpenBagian)}
          className="flex justify-between items-center w-full text-left focus:outline-none"
        >
          <span className="text-base font-medium text-gray-900">Bagian Tanaman</span>
          <svg
            className={`h-5 w-5 ${isOpenBagian ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isOpenBagian && (
          <div className="mt-4 space-y-2">
            {filters.bagian.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  id={`bagian-${item.id}`}
                  name={`bagian-${item.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={selectedFilters.bagian.includes(item.id)}
                  onChange={(e) => handleFilterChange('bagian', item.id, e.target.checked)}
                />
                <label htmlFor={`bagian-${item.id}`} className="ml-3 text-sm text-gray-600">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Khasiat */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => setIsOpenKhasiat(!isOpenKhasiat)}
          className="flex justify-between items-center w-full text-left focus:outline-none"
        >
          <span className="text-base font-medium text-gray-900">Khasiat</span>
          <svg
            className={`h-5 w-5 ${isOpenKhasiat ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isOpenKhasiat && (
          <div className="mt-4 space-y-2">
            {filters.khasiat.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  id={`khasiat-${item.id}`}
                  name={`khasiat-${item.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={selectedFilters.khasiat.includes(item.id)}
                  onChange={(e) => handleFilterChange('khasiat', item.id, e.target.checked)}
                />
                <label htmlFor={`khasiat-${item.id}`} className="ml-3 text-sm text-gray-600">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Daerah Asal */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => setIsOpenDaerah(!isOpenDaerah)}
          className="flex justify-between items-center w-full text-left focus:outline-none"
        >
          <span className="text-base font-medium text-gray-900">Daerah Asal</span>
          <svg
            className={`h-5 w-5 ${isOpenDaerah ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isOpenDaerah && (
          <div className="mt-4 space-y-2">
            {filters.daerah.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  id={`daerah-${item.id}`}
                  name={`daerah-${item.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={selectedFilters.daerah.includes(item.id)}
                  onChange={(e) => handleFilterChange('daerah', item.id, e.target.checked)}
                />
                <label htmlFor={`daerah-${item.id}`} className="ml-3 text-sm text-gray-600">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        )}
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