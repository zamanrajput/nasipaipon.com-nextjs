"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import authClient from "@/lib/clients/auth"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Lock, CheckCircle2, XCircle, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Delete Comment Button Component
function DeleteCommentButton({ commentId }: { commentId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting comment:", error)
      alert("Failed to delete comment. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Comment Display Component with Delete Button
function CommentItem({ 
  comment, 
  isAdmin, 
  currentUsername 
}: { 
  comment: any; 
  isAdmin: boolean;
  currentUsername?: string;
}) {
  // Show delete button if user is admin OR if user is the comment author
  const canDelete = isAdmin || (currentUsername && comment.author === currentUsername)

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{comment.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
        {canDelete && <DeleteCommentButton commentId={comment.id} />}
      </div>
      <p className="text-gray-700 leading-relaxed">{comment.content}</p>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4 space-y-3">
          {comment.replies.map((reply: any) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isAdmin={isAdmin}
              currentUsername={currentUsername}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Main Comment Form Component
export default function CommentForm({ 
  articleId, 
  slug, 
  existingComments = [] 
}: { 
  articleId: string; 
  slug: string;
  existingComments?: any[];
}) {
  const router = useRouter()
  const [user, setUser] = useState<{ username?: string } | null>(null)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    authClient.me().then((userData) => {
      setUser(userData)
      if (userData?.username === "admin@nasipaipon.com") {
        setIsAdmin(true)
      }
    }).catch(() => setUser(null))
  }, [])

  // 🧩 If user not logged in — show message
  if (!user?.username) {
    return (
      <div>
        {/* Show existing comments */}
        {existingComments.length > 0 && (
          <div className="space-y-4 mb-8">
            {existingComments.map((comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                isAdmin={false}
                currentUsername={undefined}
              />
            ))}
          </div>
        )}
        
        <Card className="mt-8 bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium">
                Sign in required to post a comment
              </p>
              <p className="text-sm text-gray-500">
                Please log in to share your thoughts on this article
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 🧾 Otherwise show the comment form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          author: user!.username,
          content,
        }),
      })

      if (res.ok) {
        setContent("")
        setMessage({ 
          type: "success", 
          text: "Comment submitted successfully!" 
        })
        
        // Refresh the page after 1 second to show the new comment
        setTimeout(() => {
          router.refresh()
        }, 1000)
      } else {
        throw new Error("Failed to submit comment")
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: "Failed to submit comment. Please try again." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Show existing comments with delete buttons for admin or comment author */}
      {existingComments.length > 0 && (
        <div className="space-y-4 mb-8">
          {existingComments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              isAdmin={isAdmin}
              currentUsername={user.username}
            />
          ))}
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="author">Commenting As</Label>
          <Input
            id="author"
            value={user.username}
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Your Comment</Label>
          <Textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={5}
            required
            className="resize-none"
          />
          <p className="text-xs text-gray-500">
            Be respectful and constructive in your comments
          </p>
        </div>

        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </div>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={loading || !content.trim()}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Comment"
          )}
        </Button>
      </form>
    </div>
  )
}