// app/sitemap.ts
import prisma from "@/lib/prisma"

export default async function sitemap() {
  const articles = await prisma.article.findMany({ select: { slug: true, updatedAt: true } })

  const urls = articles.map((article) => ({
    url: `https://nasipaipon.com/pages/articles/${encodeURIComponent(article.slug)}/`,
    lastModified: article.updatedAt,
  }))

  return urls
}
