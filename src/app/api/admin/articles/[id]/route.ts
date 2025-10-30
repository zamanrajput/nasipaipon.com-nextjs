import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type Params = { params: { id: string } }

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
