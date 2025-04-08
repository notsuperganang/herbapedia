import Link from 'next/link';

// Data kategori
const categories = [
  {
    id: 1,
    name: 'Berdasarkan Bagian Tanaman',
    subcategories: [
      { name: 'Daun', slug: 'bagian-daun' },
      { name: 'Akar', slug: 'bagian-akar' },
      { name: 'Buah', slug: 'bagian-buah' },
      { name: 'Bunga', slug: 'bagian-bunga' },
      { name: 'Batang', slug: 'bagian-batang' },
      { name: 'Biji', slug: 'bagian-biji' },
    ],
  },
  {
    id: 2,
    name: 'Berdasarkan Khasiat',
    subcategories: [
      { name: 'Anti Radang', slug: 'khasiat-anti-radang' },
      { name: 'Penurun Panas', slug: 'khasiat-penurun-panas' },
      { name: 'Peredaran Darah', slug: 'khasiat-peredaran-darah' },
      { name: 'Pernapasan', slug: 'khasiat-pernapasan' },
      { name: 'Pencernaan', slug: 'khasiat-pencernaan' },
      { name: 'Kekebalan Tubuh', slug: 'khasiat-kekebalan-tubuh' },
    ],
  },
  {
    id: 3,
    name: 'Berdasarkan Daerah Asal',
    subcategories: [
      { name: 'Jawa', slug: 'daerah-jawa' },
      { name: 'Sumatera', slug: 'daerah-sumatera' },
      { name: 'Kalimantan', slug: 'daerah-kalimantan' },
      { name: 'Sulawesi', slug: 'daerah-sulawesi' },
      { name: 'Papua', slug: 'daerah-papua' },
      { name: 'Bali & Nusa Tenggara', slug: 'daerah-bali-nusatenggara' },
    ],
  },
];

export default function CategoriesSection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Jelajahi Berdasarkan Kategori</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Temukan tanaman obat berdasarkan berbagai kategori untuk memudahkan pencarian sesuai kebutuhan Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.subcategories.map((subcat, index) => (
                  <li key={index}>
                    <Link 
                      href={`/katalog?kategori=${subcat.slug}`}
                      className="text-gray-600 hover:text-primary-600 hover:underline flex items-center"
                    >
                      <svg className="h-4 w-4 mr-2 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {subcat.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  href={`/katalog?tipe=${category.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Lihat Semua
                  <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}