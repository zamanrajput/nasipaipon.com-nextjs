'use client'
import { useState } from 'react';
import ArticleBuilder from '@/lib/components/article_builder';

// Type definition for article data
interface ArticleData {
  title: string;
  slug: string;
  author: string;
  authorEmail?: string;
  thumbnail?: string;
  excerpt?: string;
  published: boolean;
  blocks: Array<{
    type: string;
    content: string;
    order: number;
    metadata?: any;
  }>;
}

export default function CreateArticlePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This function will be called when user clicks save
  const handleSave = async (articleData: ArticleData) => {
    setIsSaving(true);
    setError(null);
    
    try {
      console.log('Saving article:', articleData);
      
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });
    
      const result = await response.json();
    
      if (!response.ok) {
        throw new Error(result.error || "Failed to save article");
      }
    
      alert("✅ Article saved successfully!");
      console.log("Saved article:", result.article);
      
      // Redirect to articles list or the new article
      window.location.href = '/admin/articles';
      // Or: window.location.href = `/articles/${result.article.slug}`;
    } catch (err: any) {
      console.error('Error saving article:', err);
      setError(err.message);
      alert(`❌ Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
          <p className="mt-2 text-sm text-gray-600">
            Build your article with headings, paragraphs, images, videos, tables, and lists
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">❌ {error}</p>
          </div>
        )}

        {/* Article Builder */}
        <ArticleBuilder onSave={handleSave} isSaving={isSaving} />
      </div>
    </div>
  );
}