    // src/app/admin/articles/ArticleForm.tsx
    'use client';

    import React, { useState, useEffect, FormEvent } from 'react';
    import { IArticle } from '@/lib/models/Article'; // Menggunakan alias
    import { useRouter } from 'next/navigation';
    import { format } from 'date-fns'; // Untuk format tanggal input

    interface ArticleFormProps {
      articleData?: IArticle | null;
      isEditMode: boolean;
    }

    const ArticleForm: React.FC<ArticleFormProps> = ({ articleData, isEditMode }) => {
      const [title, setTitle] = useState('');
      const [slug, setSlug] = useState('');
      const [excerpt, setExcerpt] = useState('');
      const [content, setContent] = useState(''); // Akan menjadi textarea
      const [image, setImage] = useState('');
      const [author, setAuthor] = useState('');
      const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd')); // Default ke tanggal hari ini
      const [category, setCategory] = useState('');
      const [readTime, setReadTime] = useState('');

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

      const router = useRouter();

      useEffect(() => {
        if (isEditMode && articleData) {
          setTitle(articleData.title || '');
          setSlug(articleData.slug || '');
          setExcerpt(articleData.excerpt || '');
          setContent(articleData.content || '');
          setImage(articleData.image || '');
          setAuthor(articleData.author || '');
          setDate(articleData.date ? format(new Date(articleData.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
          setCategory(articleData.category || '');
          setReadTime(articleData.readTime || '');
        } else if (!isEditMode) {
          // Reset form untuk artikel baru
          setTitle('');
          setSlug('');
          setExcerpt('');
          setContent('');
          setImage('');
          setAuthor('');
          setDate(format(new Date(), 'yyyy-MM-dd'));
          setCategory('');
          setReadTime('');
        }
      }, [articleData, isEditMode]);

      const generateSlugFromTitle = (articleTitle: string) => {
        return articleTitle
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '');
      };

      useEffect(() => {
        if (!isEditMode) {
          setSlug(generateSlugFromTitle(title));
        }
      }, [title, isEditMode]);

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setFieldErrors({});

        const payload: Partial<IArticle> = {
          title, slug, excerpt, content, image, author, 
          date: new Date(date), // Pastikan dikirim sebagai objek Date
          category, readTime
        };

        const endpoint = isEditMode ? `/api/articles/${articleData?._id}` : '/api/articles';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
          const res = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();

          if (!res.ok) {
            setError(data.error || `Failed to ${isEditMode ? 'update' : 'create'} article.`);
            if (data.errors) {
              setFieldErrors(data.errors);
            }
            setLoading(false);
            return;
          }
          alert(`Article ${isEditMode ? 'updated' : 'created'} successfully!`);
          router.push('/admin/articles');
          router.refresh();
        } catch (err: any) {
          console.error("Submission error:", err);
          setError(err.message || 'An unexpected error occurred during submission.');
        } finally {
          setLoading(false);
        }
      };

      const renderInput = (label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, type: string = "text", required: boolean = true, isTextarea: boolean = false, placeholder?: string, rows?: number) => (
        <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
          {isTextarea ? (
             <textarea id={id} name={id} value={value} onChange={onChange} required={required} rows={rows || 5} placeholder={placeholder || `Enter ${label.toLowerCase()}`}
             className={`input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors[id] ? 'border-red-500' : 'border-gray-300'}`} />
          ) : (
            <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className={`input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors[id] ? 'border-red-500' : 'border-gray-300'}`} />
          )}
          {fieldErrors[id] && <p className="text-red-500 text-xs mt-1">{fieldErrors[id]}</p>}
        </div>
      );
      
      // Contoh kategori, bisa diambil dari API atau konstanta
      const articleCategories = ["Panduan Menanam", "Manfaat Kesehatan", "Konservasi", "Budaya Tradisional", "Tips dan Trik", "Penelitian & Inovasi", "Lainnya"];


      return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-xl">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded mb-4 text-sm">{error}</div>}
          
          {renderInput("Title", "title", title, (e) => setTitle(e.target.value))}
          {renderInput("Slug", "slug", slug, (e) => setSlug(e.target.value))}
           <p className="text-xs text-gray-500 -mt-3 mb-4">Auto-generated from title if creating new. Must be unique.</p>

          {renderInput("Image URL", "image", image, (e) => setImage(e.target.value), "url", true, false, "https://example.com/article-image.jpg")}
           {image && <img src={image} alt="Preview" className="mt-2 h-40 w-auto object-contain border rounded-md p-1 bg-gray-50" onError={(e) => e.currentTarget.style.display='none'}/>}

          {renderInput("Excerpt", "excerpt", excerpt, (e) => setExcerpt(e.target.value), "text", true, true, "Short summary of the article...", 3)}
          {renderInput("Content", "content", content, (e) => setContent(e.target.value), "text", true, true, "Full content of the article...", 10)}
          {/* Untuk Rich Text Editor, 'content' akan dihandle oleh komponen editor */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {renderInput("Author", "author", author, (e) => setAuthor(e.target.value))}
            {renderInput("Date", "date", date, (e) => setDate(e.target.value), "date")}
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category<span className="text-red-500">*</span></label>
            <select 
                id="category" name="category" value={category} 
                onChange={(e) => setCategory(e.target.value)} required
                className={`input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value="">Select a category</option>
                {articleCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {fieldErrors.category && <p className="text-red-500 text-xs mt-1">{fieldErrors.category}</p>}
          </div>

          {renderInput("Read Time (e.g., 5 menit)", "readTime", readTime, (e) => setReadTime(e.target.value), "text", false, false, "7 menit")}


          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
            <button type="button" onClick={() => router.push('/admin/articles')} className="btn bg-gray-200 hover:bg-gray-300 text-gray-700">
                Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70">
              {loading ? 'Saving...' : (isEditMode ? 'Update Article' : 'Create Article')}
            </button>
          </div>
        </form>
      );
    };
    export default ArticleForm;