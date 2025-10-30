import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import CommentForm from "@/components/comments/CommentForm"
import ArticlePreviewComponent from "@/lib/components/article_preview"

export const revalidate = 60; // seconds

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    select: { slug: true },
  });

  return articles
    .filter((a) => !!a.slug) // ensure slug exists
    .map((article) => ({
      slug: article.slug,
    }));
}

type Props = {
  params: { slug: string }
}

/**
 * 🧠 Dynamic metadata for each article
 */
export async function generateMetadata({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { title: true, excerpt: true, thumbnail: true },
  })

  if (!article) {
    return {
      title: "Article not found | CoreLogic",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${article.title} | CoreLogic`,
    description: article.excerpt || "Read this article on CoreLogic.",
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.thumbnail ? [article.thumbnail] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "",
      images: article.thumbnail ? [article.thumbnail] : [],
    },
  }
}

/**
 * 🧩 Helper to render comments recursively
 */
function CommentList({ comments }: { comments: any[] }) {
  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-start justify-between mb-2">
            <p className="font-semibold text-gray-900">{comment.author}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">{comment.content}</p>

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4">
              <CommentList comments={comment.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * 📰 Article display page
 */
export default async function ArticlePage({ params }: Props) {
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
    <main className="min-h-screen  py-[90px]">
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

          {article.comments.length > 0 ? (
            <CommentList comments={article.comments} />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          )}

          {/* 💬 Comment Form */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
            <CommentForm articleId={article.id} slug={slug} />
          </div>
        </section>
      </div>
    </main>
  )
}