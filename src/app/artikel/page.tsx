import ArticleFilter from '@/components/articles/ArticleFilter';
import ArticleGrid from '@/components/articles/ArticleGrid';

export const metadata = {
  title: 'Artikel Edukasi - Herbapedia',
  description: 'Temukan berbagai artikel informatif tentang tanaman obat, tips menanam, dan pentingnya menjaga lingkungan hijau.',
};

export default function ArtikelPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Artikel Edukasi</h1>
            <p className="text-primary-100 text-lg mb-0">
              Tingkatkan pengetahuan Anda tentang tanaman obat, praktik budidaya, dan upaya pelestarian untuk menjaga lingkungan hijau.
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
              <ArticleFilter />
            </div>
            
            {/* Article Grid */}
            <div className="lg:col-span-3">
              <ArticleGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}