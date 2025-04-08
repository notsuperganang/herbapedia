import Image from 'next/image';
import Link from 'next/link';

type Plant = {
  id: number;
  name: string;
  latinName: string;
  description: string;
  benefits: string[];
  uses: string;
  region: string;
  parts: string[];
  habitat: string;
  cultivation: string;
  history: string;
  image: string;
  slug: string;
  scientificClassification: {
    kingdom: string;
    division: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  related: number[];
};

export default function PlantDetail({ plant }: { plant: Plant }) {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="mb-6">
          <Link 
            href="/katalog"
            className="inline-flex items-center text-primary-600 hover:text-primary-800"
          >
            <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Katalog
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plant Image */}
          <div className="relative h-96 lg:h-full rounded-lg overflow-hidden shadow-md">
            <img
              src={plant.image}
              alt={plant.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Plant Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{plant.name}</h1>
            <p className="text-lg italic text-gray-500 mb-6">{plant.latinName}</p>
            
            <div className="prose max-w-none text-gray-600 mb-6">
              <p>{plant.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Asal Daerah</h3>
                <p className="text-gray-600">{plant.region}</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2">Bagian yang Digunakan</h3>
                <p className="text-gray-600">{plant.parts.join(', ')}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Manfaat Kesehatan</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {plant.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cara Penggunaan</h3>
              <p className="text-gray-600">{plant.uses}</p>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <div className="flex space-x-2">
                <button className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-full text-gray-500 hover:text-gray-700 hover:border-gray-400">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-full text-gray-500 hover:text-gray-700 hover:border-gray-400">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              
              <button className="btn btn-primary">
                Unduh Informasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}