    // src/app/admin/articles/edit/[id]/page.tsx
    'use client';

    import React, { useState, useEffect } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import AdminLayout from '../../../AdminLayout'; // Path relatif
    import ArticleForm from '../../ArticleForm';     // Path relatif
    import { IArticle } from '@/lib/models/Article'; // Menggunakan alias

    export default function EditArticlePage() {
      const params = useParams();
      const id = params.id as string;
      const router = useRouter();

      const [articleData, setArticleData] = useState<IArticle | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        if (id) {
          const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
              const res = await fetch(`/api/articles/${id}`);
              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to fetch article data');
              }
              const data = await res.json();
               if (data.success) {
                setArticleData(data.data);
              } else {
                throw new Error(data.error || 'Article data not found in response');
              }
            } catch (err: any) {
              console.error("Error fetching article for edit:", err);
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
          fetchArticle();
        } else {
            setError("No article ID provided.");
            setLoading(false);
        }
      }, [id]);

      if (loading) return <AdminLayout><div className="text-center py-10">Loading article data...</div></AdminLayout>;
      if (error) return <AdminLayout><div className="p-4 bg-red-100 text-red-700 rounded-md">Error: {error} <button onClick={() => router.push('/admin/articles')} className="ml-4 text-blue-600 hover:underline">Go back to list</button></div></AdminLayout>;
      if (!articleData && !loading) return <AdminLayout><div className="text-center py-10">Article not found. <button onClick={() => router.push('/admin/articles')} className="ml-4 text-blue-600 hover:underline">Go back to list</button></div></AdminLayout>;

      return (
        <AdminLayout>
          <div className="container mx-auto px-2 sm:px-4 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Edit Article: <span className="text-primary-600">{articleData?.title}</span></h1>
            {articleData && <ArticleForm isEditMode={true} articleData={articleData} />}
          </div>
        </AdminLayout>
      );
    }