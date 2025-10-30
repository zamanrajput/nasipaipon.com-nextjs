import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, User, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Articles | CoreLogic',
  description: 'Read our latest articles and insights',
}

export const revalidate = 60 // revalidate every 60 seconds

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      thumbnail: true,
      excerpt: true,
      publishedAt: true,
      createdAt: true,
      blocks: {
        select: {
          type: true,
        },
        take: 1,
      },
    },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, stories, and knowledge from our community
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles yet
            </h3>
            <p className="text-gray-600">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/pages/articles/${article.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  {/* Thumbnail */}
                  {article.thumbnail ? (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    {article.excerpt && (
                      <CardDescription className="line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span className="line-clamp-1">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          {new Date(
                            article.publishedAt || article.createdAt
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Section (Optional) */}
        {articles.length > 0 && (
          <div className="mt-12 text-center text-gray-600">
            <p>
              Showing <strong>{articles.length}</strong> published{' '}
              {articles.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}