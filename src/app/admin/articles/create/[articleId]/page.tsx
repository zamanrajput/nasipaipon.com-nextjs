// ===========================================
// EXAMPLE 2: Edit Mode with Initial Data
// ===========================================

import ArticleBuilder from "@/lib/components/article_builder";
import { BlockType, MediaSize, MediaAlign } from "@/lib/types/article";

export function EditArticlePageExample({ articleId }: { articleId: string }) {
    // Example initial data (you'd fetch this from your database)
    const initialData = {
      title: "How to Build Amazing Web Apps",
      slug: "how-to-build-amazing-web-apps",
      author: "Jane Developer",
      authorEmail: "jane@example.com",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      excerpt: "Learn the fundamentals of building modern web applications with React and Next.js",
      published: false,
      blocks: [
        {
          type: BlockType.HEADING,
          content: "Getting Started with Modern Web Development",
          order: 0,
        },
        {
          type: BlockType.PARAGRAPH,
          content: "Web development has evolved significantly over the past decade. Today, we have powerful tools and frameworks that make building complex applications easier than ever before.",
          order: 1,
        },
        {
          type: BlockType.IMAGE,
          content: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
          order: 2,
          metadata: {
            size: MediaSize.LARGE,
            align: MediaAlign.CENTER,
            caption: "Modern development workspace",
            alt: "A laptop showing code on a desk with coffee"
          }
        },
        {
          type: BlockType.SUBHEADING,
          content: "Why Choose Next.js?",
          order: 3,
        },
        {
          type: BlockType.PARAGRAPH,
          content: "Next.js provides an excellent developer experience with features like automatic code splitting, server-side rendering, and static site generation out of the box.",
          order: 4,
        },
        {
          type: BlockType.VIDEO,
          content: "https://www.youtube.com/watch?v=Sklc_fQBmcs",
          order: 5,
          metadata: {
            size: MediaSize.FULL,
            align: MediaAlign.CENTER,
            caption: "Introduction to Next.js - Official Tutorial",
          }
        },
        {
          type: BlockType.PARAGRAPH,
          content: "By combining these technologies with a solid understanding of React fundamentals, you can build production-ready applications that scale.",
          order: 6,
        },
      ]
    };
  
    const handleUpdate = async (articleData: any) => {
      console.log('Updating article:', articleData);
      // await updateArticle(articleId, articleData);
    };
  
    return (
      <ArticleBuilder 
        onSave={handleUpdate}
        initialData={initialData}
        isEdit={true}
      />
    );
  }