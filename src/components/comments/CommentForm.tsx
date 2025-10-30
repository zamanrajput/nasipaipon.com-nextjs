"use client"

import { useEffect, useState } from "react"
import authClient from "@/lib/clients/auth"
import Link from "next/link"

export default function CommentForm({ articleId, slug }: { articleId: string; slug: string }) {
  const [user, setUser] = useState<{ username?: string } | null>(null)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    authClient.me().then(setUser).catch(() => setUser(null))
  }, [])

  // 🧩 If user not logged in — show message
  if (!user?.username) {
    return (
      <div className="mt-8 border rounded-lg p-6 bg-gray-50 text-center">
        <p className="text-gray-700 mb-2 font-medium">
          🔒 Sign in required to post a comment
        </p>
       
      </div>
    )
  }

  // 🧾 Otherwise show the comment form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        author: user!.username,
        content,
      }),
    })

    setLoading(false)
    if (res.ok) {
      setContent("")
      setMessage("✅ Comment submitted for approval.")
    } else {
      setMessage("❌ Failed to submit comment.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium">Commenting As</label>
        <input
          className="w-full border rounded-md p-2 bg-gray-100"
          value={user.username}
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Comment</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-md p-2"
          rows={4}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Comment"}
      </button>

      {message && <p className="text-sm text-gray-500">{message}</p>}
    </form>
  )
}
