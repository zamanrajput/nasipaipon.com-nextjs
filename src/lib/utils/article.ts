'use server';

import { prisma } from '../prisma';
import { ArticleFormData, BlockType } from '../types/article';
import { revalidatePath } from 'next/cache';

export async function getArticles(published?: boolean) {
  try {
    const articles = await prisma.article.findMany({
      where: published !== undefined ? { published } : undefined,
      include: {
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            comments: {
              where: {
                approved: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
}

export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        comments: {
          where: {
            approved: true,
            parentId: null,
          },
          include: {
            replies: {
              where: {
                approved: true,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article');
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        comments: {
          where: {
            approved: true,
            parentId: null,
          },
          include: {
            replies: {
              where: {
                approved: true,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return article;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    throw new Error('Failed to fetch article');
  }
}

export async function createArticle(data: ArticleFormData) {
  try {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        author: data.author,
        authorEmail: data.authorEmail,
        thumbnail: data.thumbnail,
        excerpt: data.excerpt,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        blocks: {
          create: data.blocks.map((block: { type: BlockType; content: string; order: number; metadata?: any }) => ({
            type: block.type,
            content: block.content,
            order: block.order,
            metadata: block.metadata,
          })),
        },
      },
      include: {
        blocks: true,
      },
    });
    
    revalidatePath('/admin/articles');
    revalidatePath('/articles');
    
    return article;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
}

export async function updateArticle(id: string, data: ArticleFormData) {
  try {
    // Delete existing blocks
    await prisma.articleBlock.deleteMany({
      where: { articleId: id },
    });

    // Update article with new blocks
    const article = await prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        author: data.author,
        authorEmail: data.authorEmail,
        thumbnail: data.thumbnail,
        excerpt: data.excerpt,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        blocks: {
          create: data.blocks.map((block: { type: BlockType; content: string; order: number; metadata?: any }) => ({
            type: block.type,
            content: block.content,
            order: block.order,
            metadata: block.metadata,
          })),
        },
      },
      include: {
        blocks: true,
      },
    });

    revalidatePath('/admin/articles');
    revalidatePath(`/articles/${article.slug}`);
    revalidatePath('/articles');

    return article;
  } catch (error) {
    console.error('Error updating article:', error);
    throw new Error('Failed to update article');
  }
}

export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath('/admin/articles');
    revalidatePath('/articles');

    return { success: true };
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new Error('Failed to delete article');
  }
}

export async function addComment(
  articleId: string,
  author: string,
  email: string,
  content: string,
  parentId?: string
) {
  try {
    const comment = await prisma.comment.create({
      data: {
        articleId,
        author,
        email,
        content,
        parentId,
        approved: false, // Comments need approval by default
      },
    });

    return comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}