import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type Params = { params: { id: string } }

// GET - Fetch single article by ID
export async function GET(req: Request, { params }: Params) {
  const { id } = params
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: { blocks: true },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

// PUT - Update article
export async function PUT(req: Request, { params }: Params) {
  const { id } = params
  try {
    const body = await req.json()
    const {
      title,
      slug,
      author,
      authorEmail,
      thumbnail,
      excerpt,
      published,
      blocks,
    } = body

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Handle blocks update
    let blocksUpdate = undefined
    if (Array.isArray(blocks)) {
      blocksUpdate = {
        deleteMany: {}, // Remove all existing blocks
        create: blocks.map((block: any, index: number) => ({
          type: block.type || 'PARAGRAPH',
          content: block.content || '',
          order: block.order ?? index,
          metadata: block.metadata ?? {},
        })),
      }
    }

    // Handle publishedAt logic
    let publishedAtValue = existingArticle.publishedAt
    if (published !== undefined) {
      if (published && !existingArticle.published) {
        publishedAtValue = new Date() // Publishing for first time
      } else if (!published) {
        publishedAtValue = null // Unpublishing
      }
    }

    // Update article
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(author !== undefined && { author }),
        ...(authorEmail !== undefined && { authorEmail }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(excerpt !== undefined && { excerpt }),
        ...(published !== undefined && { published: !!published }),
        publishedAt: publishedAtValue,
        ...(blocksUpdate && { blocks: blocksUpdate }),
      },
      include: { blocks: true },
    })

    return NextResponse.json({ success: true, article: updatedArticle })
  } catch (error: any) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: error.message || 'Failed to update article' }, { status: 500 })
  }
}

// PATCH - Partial update (optional alternative)
export async function PATCH(req: Request, { params }: Params) {
  const { id } = params
  try {
    const body = await req.json()

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Build dynamic update object
    const updateData: any = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.author !== undefined) updateData.author = body.author
    if (body.authorEmail !== undefined) updateData.authorEmail = body.authorEmail
    if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt
    
    if (body.published !== undefined) {
      updateData.published = !!body.published
      if (body.published && !existingArticle.published) {
        updateData.publishedAt = new Date()
      } else if (!body.published) {
        updateData.publishedAt = null
      }
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData,
      include: { blocks: true },
    })

    return NextResponse.json({ success: true, article: updatedArticle })
  } catch (error: any) {
    console.error('Error patching article:', error)
    return NextResponse.json({ error: error.message || 'Failed to patch article' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params
  try {
    await prisma.article.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}