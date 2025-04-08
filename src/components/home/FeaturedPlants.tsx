import Image from 'next/image';
import Link from 'next/link';

// Data tanaman unggulan
const featuredPlants = [
  {
    id: 1,
    name: 'Jahe',
    latinName: 'Zingiber officinale',
    image: '/plants/jahe.jpg',
    benefits: 'Meredakan masalah pencernaan, peradangan, dan mual',
    region: 'Asia Tenggara',
    slug: 'jahe',
  },
  {
    id: 2,
    name: 'Kunyit',
    latinName: 'Curcuma longa',
    image: '/plants/kunyit.jpg',
    benefits: 'Antioksidan, anti-inflamasi, dan meningkatkan kesehatan pencernaan',
    region: 'Asia Selatan',
    slug: 'kunyit',
  },
  {
    id: 3,
    name: 'Kencur',
    latinName: 'Kaempferia galanga',
    image: '/plants/kencur.jpg',
    benefits: 'Meredakan batuk, masuk angin, dan mengurangi nyeri sendi',
    region: 'Indonesia',
    slug: 'kencur',
  },
  {
    id: 4,
    name: 'Temulawak',
    latinName: 'Curcuma zanthorrhiza',
    image: '/plants/temulawak.jpg', 
    benefits: 'Menjaga kesehatan hati, meningkatkan nafsu makan, dan daya tahan tubuh',
    region: 'Indonesia',
    slug: 'temulawak',
  },
];

export default function FeaturedPlants() {
  return (
    <section id="featured" className="section bg-gray-50 pt-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tanaman Obat Unggulan</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Berikut adalah beberapa tanaman obat yang banyak digunakan dalam pengobatan tradisional Indonesia dan memiliki khasiat yang telah terbukti secara ilmiah.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlants.map((plant) => (
            <Link key={plant.id} href={`/tanaman/${plant.slug}`}>
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
                  <p className="text-gray-600 text-sm mb-3">{plant.benefits}</p>
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
        
        <div className="text-center mt-10">
          <Link href="/katalog" className="btn btn-primary">
            Lihat Semua Tanaman
          </Link>
        </div>
      </div>
    </section>
  );
}