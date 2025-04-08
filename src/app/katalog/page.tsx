import PlantFilter from '@/components/catalog/PlantFilter';
import PlantGrid from '@/components/catalog/PlantGrid';

export const metadata = {
  title: 'Katalog Tanaman Obat - Herbapedia',
  description: 'Jelajahi katalog lengkap tanaman obat tradisional Indonesia. Temukan informasi tentang manfaat, cara penggunaan, dan daerah asal dari berbagai tanaman obat.',
};

export default function KatalogPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Katalog Tanaman Obat</h1>
            <p className="text-primary-100 text-lg mb-0">
              Jelajahi berbagai tanaman obat tradisional dari seluruh Indonesia dengan informasi tentang manfaat, cara penggunaan, dan daerah asalnya.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <PlantFilter />
            </div>
            
            {/* Plant Grid */}
            <div className="lg:col-span-3">
              <PlantGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}