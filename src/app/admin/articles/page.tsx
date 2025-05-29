// src/app/admin/articles/page.tsx
'use client';

    import React, { useState, useEffect } from 'react';
    import Link from 'next/link';
    import AdminLayout from '../AdminLayout'; // Path relatif
    import { IArticle } from '@/lib/models/Article'; // Menggunakan alias
    import { format } from 'date-fns'; // Untuk format tanggal

    export default function ManageArticlesPage() {
      const [articles, setArticles] = useState<IArticle[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [searchTerm, setSearchTerm] = useState('');

      const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch('/api/articles');
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to fetch articles');
          }
          const data = await res.json();
          setArticles(data.data || []);
        } catch (err: any) {
          setError(err.message);
          console.error("Error fetching articles:", err);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchArticles();
      }, []);

      const handleDelete = async (articleId: string) => {
        if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
          try {
            const res = await fetch(`/api/articles/${articleId}`, {
              method: 'DELETE',
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.error || 'Failed to delete article');
            }
            alert('Article deleted successfully!');
            fetchArticles(); // Refresh daftar artikel
          } catch (err: any) {
            setError(err.message);
            alert(`Error deleting article: ${err.message}`);
            console.error("Error deleting article:", err);
          }
        }
      };
      
      const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.category && article.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      return (
        <AdminLayout>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Manage Articles</h1>
              <Link href="/admin/articles/new" className="btn btn-primary bg-green-600 hover:bg-green-700 text-white">
                Add New Article
              </Link>
            </div>

            <input 
                type="text"
                placeholder="Search by title, category, or author..."
                className="mb-6 p-3 border border-gray-300 rounded-md w-full md:w-1/2 lg:w-1/3 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <div className="text-center py-4">Loading articles...</div>}
            {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">Error fetching articles: {error}</div>}
            
            {!loading && !error && (
              <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredArticles.length > 0 ? filteredArticles.map((article) => (
                      <tr key={article._id as string} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {article.image ? (
                            <img 
                                src={article.image} 
                                alt={article.title} 
                                className="h-12 w-12 object-cover rounded-md shadow-sm"
                                onError={(e) => (e.currentTarget.src = 'https://placehold.co/48x48/EBF4FF/7F9CF5?text=No+Img')}
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">No Img</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate" title={article.title}>{article.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.date ? format(new Date(article.date), 'dd MMM yyyy') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <Link href={`/admin/articles/edit/${article._id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(article._id as string)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="text-center py-10 text-gray-500">No articles found matching your search or no articles available.</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </AdminLayout>
      );
    }