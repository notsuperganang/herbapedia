    // src/app/admin/articles/new/page.tsx
    import React from 'react';
    import AdminLayout from '../../AdminLayout'; // Path relatif
    import ArticleForm from '../ArticleForm';   // Path relatif

    export default function NewArticlePage() {
      return (
        <AdminLayout>
          <div className="container mx-auto px-2 sm:px-4 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Add New Article</h1>
            <ArticleForm isEditMode={false} />
          </div>
        </AdminLayout>
      );
    }