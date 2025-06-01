// src/app/artikel/[slug]/page.tsx
import dbConnect from '@/lib/dbConnect';
import Article, { IArticle } from '@/lib/models/Article';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import ArticleImage from '@/components/articles/ArticleImage';

type Props = {
  params: Promise<{ slug: string }>; // Changed: params is now Promise
};

// Fungsi untuk mengambil data artikel berdasarkan slug
async function getArticleBySlug(slug: string): Promise<IArticle | null> {
  await dbConnect();
  try {
    const article = await Article.findOne({ slug }).lean();
    if (!article) {
      return null;
    }
    const serializedArticle = JSON.parse(JSON.stringify(article)) as IArticle;
    return serializedArticle;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
}

// Generate metadata untuk SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params; // Fixed: await params first
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Herbapedia',
      description: 'Maaf, artikel yang Anda cari tidak ditemukan di database kami.',
    };
  }

  return {
    title: `${article.title} - Herbapedia`,
    description: article.excerpt,
  };
}

// Generate static params
export async function generateStaticParams() {
  await dbConnect();
  try {
    const articles = await Article.find({}, 'slug').lean();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for articles:", error);
    return [];
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params; // Fixed: await params first
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Maaf, artikel dengan slug "{slug}" tidak tersedia di database kami.
        </p>
        <Link href="/artikel" className="btn btn-primary">
          Kembali ke Artikel
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <nav className="text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-800">
              Beranda
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/artikel" className="text-primary-600 hover:text-primary-800">
              Artikel
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{article.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 mb-8">
                <div className="flex items-center mr-6">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-600">
                      {article.author
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">{article.author}</span>
                </div>
                
                <span className="mr-6">{formatDate(article.date)}</span>
                
                {article.readTime && (
                  <span>{article.readTime} baca</span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            <ArticleImage 
              image={article.image} 
              title={article.title} 
            />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="text-gray-700 leading-relaxed"
              />
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Dipublikasikan: {formatDate(article.date)}
                </div>
                
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
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Back to Articles */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom text-center">
          <Link href="/artikel" className="btn btn-primary">
            ← Kembali ke Artikel
          </Link>
        </div>
      </section>
    </div>
  );
}