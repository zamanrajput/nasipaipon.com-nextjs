import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // adjust if your prisma client path differs

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      published: true,
      createdAt: true,
    },
  })
  return NextResponse.json(articles)
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      author,
      authorEmail,
      thumbnail,
      excerpt,
      published,
      blocks,
    } = body;

    if (!title || !slug || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🧠 Map blocks for nested creation
    const formattedBlocks =
      Array.isArray(blocks) && blocks.length > 0
        ? {
            create: blocks.map((block: any, index: number) => ({
              type: block.type || "PARAGRAPH",
              content: block.content || "",
              order: block.order ?? index,
              metadata: block.metadata ?? {},
            })),
          }
        : undefined;

    // ✅ Create article with nested blocks
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        author,
        authorEmail,
        thumbnail,
        excerpt,
        published: !!published,
        publishedAt: published ? new Date() : null,
        blocks: formattedBlocks,
      },
      include: { blocks: true },
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("❌ Error creating article:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



function uuidv4() {
  throw new Error('Function not implemented.');
}

