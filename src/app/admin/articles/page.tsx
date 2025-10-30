'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pencil, Trash2, Eye } from 'lucide-react'
import authClient, { AuthUser } from '@/lib/clients/auth'

type Article = {
  id: string
  title: string
  slug: string
  author: string
  published: boolean
  createdAt: string
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authClient.me()
        setUser(userData)
        
        // Check if user is admin
        if (userData?.username === 'admin@nasipaipon.com') {
          setIsAuthorized(true)
          // Fetch articles only if authorized
          fetchArticles()
        } else {
          setLoading(false)
        }
      } catch (err) {
        console.error('Auth check failed', err)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles')
      const data = await res.json()
      setArticles(data)
    } catch (err) {
      console.error('Failed to load articles', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>

  // Show unauthorized message if not admin
  if (!isAuthorized) {
    return (
      <div className="pt-20 px-6 text-white">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Access Denied</h2>
          <p className="text-gray-300">You do not have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 px-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <Link href="/admin/articles/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-gray-500">No articles found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gray-100 border-b text-left">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{a.title}</td>
                  <td className="px-4 py-3">{a.author}</td>
                  <td className="px-4 py-3">
                    {a.published ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 flex justify-end gap-3">
                    <Link
                      href={`/admin/articles/${a.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </Link>
                    <Link
                      href={`/pages/articles/${a.slug}`}
                      className="text-green-600 hover:text-green-800"
                      target="_blank"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}