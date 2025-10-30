'use client'
import ArticleBuilder from '@/lib/components/article_builder';

// Example: How to use the Article Builder in a Next.js page

export default function CreateArticlePage() {
  // This function will be called when user clicks save
  const handleSave = async (articleData: any) => {
    console.log('Saving article:', articleData);
    
    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articleData),
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      alert(result.error || "Failed to save article");
      return;
    }
  
    alert("✅ Article saved successfully!");
    console.log("Saved article:", result.article);
    window.history.back();

  };

  return (
  
      <ArticleBuilder onSave={handleSave} />
  
  );
}
