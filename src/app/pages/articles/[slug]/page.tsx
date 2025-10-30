import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { useEffect } from "react"
import authClient from "@/lib/clients/auth"
import CommentForm from "@/components/comments/CommentForm"

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
        <div key={comment.id} className="border rounded-lg p-3">
          <p className="font-semibold">{comment.author}</p>
          <p className="text-gray-700">{comment.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-3 border-l pl-4">
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



  return (
    <main className="p-6 prose mt-[80px] bg-white w-[100vw] mx-auto max-w-5xl">
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="rounded-lg mb-6 w-full object-cover"
        />
      )}

      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-500 mb-6">
        By <strong>{article.author}</strong> •{" "}
        {new Date(article.createdAt).toLocaleDateString()}
      </p>

      {article.blocks.map((block) => {
        switch (block.type) {
          case "HEADING":
            return (
              <h2 key={block.id} className="text-2xl font-semibold mt-8">
                {block.content}
              </h2>
            )
          case "SUBHEADING":
            return (
              <h3 key={block.id} className="text-xl font-medium mt-6">
                {block.content}
              </h3>
            )
          case "PARAGRAPH":
            return (
              <p key={block.id} className="text-lg leading-relaxed">
                {block.content}
              </p>
            )
          case "IMAGE":
            return (
              <img
                key={block.id}
                src={block.content}
                alt="Article image"
                className="my-4 rounded-md"
              />
            )
          case "VIDEO":
            return (
              <video
                key={block.id}
                controls
                className="w-full rounded-md my-4"
                src={block.content}
              />
            )
          default:
            return null
        }
      })}

      {/* 🗨️ Comments Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {article.comments.length > 0 ? (
          <CommentList comments={article.comments} />
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {/* 💬 Comment Form */}
        <CommentForm articleId={article.id} slug={slug} />
      </section>
    </main>
  )
}
