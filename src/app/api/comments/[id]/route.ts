import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      )
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    })

    return NextResponse.json({ success: true, message: "Comment deleted successfully" })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    )
  }
}