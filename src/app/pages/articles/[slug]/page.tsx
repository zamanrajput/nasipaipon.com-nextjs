// ... (keep all the existing code)

import CommentForm from "@/components/comments/CommentForm"
import ArticlePreviewComponent from "@/lib/components/article_preview"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
type PageParams = {
  params: {
    slug: string
  }
}

// Remove the CommentList function since it's now in CommentForm

export default async function ArticlePage({ params }: PageParams) {
  const { slug } = params

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      blocks: { orderBy: { order: "asc" } },
      comments: {
        where: { approved: true, parentId: null },
        include: {
          replies: {
            where: { approved: true },
            include: {
              replies: {
                where: { approved: true },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!article) return notFound()

  // Transform article data for the preview component
  const articleData = {
    title: article.title,
    author: article.author,
    published: article.published,
    thumbnail: article.thumbnail || undefined,
    excerpt: article.excerpt || undefined,
    blocks: article.blocks.map((block) => ({
      id: block.id,
      type: block.type as any,
      content: block.content,
      order: block.order,
      metadata: block.metadata as any,
    })),
  }

  return (
    <main className="min-h-screen py-[90px]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <ArticlePreviewComponent
            data={articleData}
            showHeader={true}
          />
        </article>

        {/* 🗨️ Comments Section */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Comments</h2>
          
          <CommentForm 
            articleId={article.id} 
            slug={slug}
            existingComments={article.comments}
          />
        </section>
      </div>
    </main>
  )
}