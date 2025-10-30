'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleBuilder from "@/lib/components/article_builder";

export default function Page() {
  const { articleId } = useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch existing article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/admin/articles/${articleId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }

        const article = await response.json();
        setInitialData(article);
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  // Handle article update
  const handleUpdate = async (articleData: any) => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      const result = await response.json();
      console.log('Article updated successfully:', result);
      
      // Optional: Show success message or redirect
      router.back();
    } catch (err: any) {
      console.error('Error updating article:', err);
      alert('Failed to update article: ' + err.message);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Article not found
  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">📄 Article not found</div>
          <p className="text-gray-600">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Render ArticleBuilder with fetched data
  return (
    <ArticleBuilder 
      onSave={handleUpdate}
      initialData={initialData}
      isEdit={true}
    />
  );
}