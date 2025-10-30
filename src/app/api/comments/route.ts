import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const { articleId, author, content } = await req.json()

  if (!articleId || !content) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  await prisma.comment.create({
    data: {
      articleId,
      author,
      content,
      approved: true, // pending approval
    },
  })

  return NextResponse.json({ success: true })
}
