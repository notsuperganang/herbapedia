'use client';

import { useState } from 'react';
import { IPlant } from '@/lib/models/Plant';

export default function PlantTabs({ plant }: { plant: IPlant }) {
  const [activeTab, setActiveTab] = useState('habitat');

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Lengkap</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('habitat')}
            className={`py-3 px-4 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none ${
              activeTab === 'habitat'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Habitat & Penyebaran
          </button>
          <button
            onClick={() => setActiveTab('cultivation')}
            className={`py-3 px-4 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none ${
              activeTab === 'cultivation'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Budidaya
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none ${
              activeTab === 'history'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sejarah & Fakta
          </button>
          <button
            onClick={() => setActiveTab('classification')}
            className={`py-3 px-4 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none ${
              activeTab === 'classification'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Klasifikasi Ilmiah
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* Habitat & Penyebaran */}
        {activeTab === 'habitat' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Habitat & Penyebaran</h3>
            <div className="prose max-w-none text-gray-600">
              <p>{plant.habitat}</p>
              
              <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3">Daerah Penyebaran</h4>
              <p>
                Tanaman {plant.name} (atau {plant.latinName}) berasal dari {plant.region} dan 
                telah tersebar ke berbagai wilayah dengan iklim yang mendukung pertumbuhannya.
              </p>
              
              <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3">Kondisi Pertumbuhan Ideal</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Suhu: 20-30°C</li>
                <li>Kelembaban: Sedang hingga tinggi</li>
                <li>Tanah: Tanah yang gembur dengan drainase baik</li>
                <li>Paparan sinar matahari: Sinar matahari penuh hingga naungan parsial</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Budidaya */}
        {activeTab === 'cultivation' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Budidaya</h3>
            <div className="prose max-w-none text-gray-600">
              <p>{plant.cultivation}</p>
              
              <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3">Tahapan Budidaya</h4>
              <ol className="list-decimal ml-6 space-y-2">
                <li>
                  <span className="font-medium">Persiapan lahan</span>: Pilih lahan dengan tanah gembur yang kaya akan humus. Pastikan lahan memiliki drainase yang baik agar tidak tergenang air.
                </li>
                <li>
                  <span className="font-medium">Pemilihan bibit</span>: Pilih bibit yang sehat dan bebas dari penyakit. Untuk tanaman {plant.name}, biasanya digunakan {plant.parts && plant.parts[0]} sebagai bahan perbanyakan.
                </li>
                <li>
                  <span className="font-medium">Penanaman</span>: Tanam bibit dengan jarak yang cukup untuk memberikan ruang tumbuh yang optimal.
                </li>
                <li>
                  <span className="font-medium">Perawatan</span>: Lakukan penyiraman secara teratur, pemupukan berkala, dan pengendalian gulma untuk menjaga pertumbuhan tanaman.
                </li>
                <li>
                  <span className="font-medium">Pemanenan</span>: Panen dilakukan saat tanaman sudah mencapai umur yang cukup dan bagian yang digunakan sudah optimal untuk dimanfaatkan.
                </li>
              </ol>
              
              <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3">Tips Perawatan</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Siram tanaman secara teratur, terutama saat musim kemarau</li>
                <li>Berikan pupuk organik setiap 2-3 bulan</li>
                <li>Lakukan pemangkasan untuk mendorong pertumbuhan yang lebih baik</li>
                <li>Periksa tanaman secara rutin untuk mendeteksi hama dan penyakit sejak dini</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Sejarah & Fakta */}
        {activeTab === 'history' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sejarah & Fakta Menarik</h3>
            <div className="prose max-w-none text-gray-600">
              <p>{plant.history}</p>
              
              <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3">Penggunaan dalam Budaya Tradisional</h4>
              <p>
                Di berbagai budaya tradisional Indonesia, {plant.name} telah lama digunakan sebagai bahan pengobatan untuk berbagai penyakit. 
                Tanaman ini juga sering digunakan dalam upacara adat dan ritual tradisional di beberapa daerah.
              </p>
              
              <h4 className="text-base font-semibold text-gray-800 mt-6 mb-3">Fakta Menarik</h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>Tanaman ini telah digunakan dalam pengobatan tradisional selama ratusan tahun</li>
                <li>Beberapa penelitian modern telah mengkonfirmasi manfaat kesehatan yang diklaim secara tradisional</li>
                <li>Selain sebagai obat, tanaman ini juga digunakan sebagai bumbu masakan di berbagai belahan dunia</li>
                <li>Tanaman ini memiliki nilai ekonomi yang tinggi dan diperdagangkan secara internasional</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Klasifikasi Ilmiah */}
        {activeTab === 'classification' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Klasifikasi Ilmiah</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">Kingdom</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.kingdom}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Division</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.division}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Class</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.class}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Order</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.order}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Family</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.family}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Genus</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.genus}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Species</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.scientificClassification.species}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Klasifikasi ilmiah ini mengikuti sistem taksonomi yang diakui secara internasional.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}