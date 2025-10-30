// components/articles/ArticlePreview.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { MediaSize, MediaAlign, BlockType } from "../components/article_builder"; // reuse enums if in same folder

interface BlockMetadata {
  size?: MediaSize;
  align?: MediaAlign;
  caption?: string;
  alt?: string;
}

interface ArticleBlock {
  id: string;
  type: BlockType;
  content: string;
  order: number;
  metadata?: BlockMetadata;
}

interface ArticleData {
  title: string;
  author: string;
  published: boolean;
  thumbnail?: string;
  excerpt?: string;
  blocks: ArticleBlock[];
}

export default function ArticlePreview({ article }: { article: ArticleData }) {
  const renderBlock = (block: ArticleBlock) => {
    const sizeClasses = {
      [MediaSize.SMALL]: "max-w-sm",
      [MediaSize.MEDIUM]: "max-w-md",
      [MediaSize.LARGE]: "max-w-2xl",
      [MediaSize.FULL]: "w-full",
    };

    const alignClasses = {
      [MediaAlign.LEFT]: "mr-auto",
      [MediaAlign.CENTER]: "mx-auto",
      [MediaAlign.RIGHT]: "ml-auto",
    };

    switch (block.type) {
      case BlockType.HEADING:
        return <h1 className="text-4xl font-bold mb-4">{block.content}</h1>;
      case BlockType.SUBHEADING:
        return <h2 className="text-2xl font-semibold mb-3">{block.content}</h2>;
      case BlockType.PARAGRAPH:
        return <p className="text-gray-800 mb-4 leading-relaxed">{block.content}</p>;
      case BlockType.IMAGE:
        return (
          <div
            className={`mb-4 ${sizeClasses[block.metadata?.size || MediaSize.LARGE]} ${
              alignClasses[block.metadata?.align || MediaAlign.CENTER]
            }`}
          >
            {block.content ? (
              <>
                <img
                  src={block.content}
                  alt={block.metadata?.alt || ""}
                  className="w-full rounded-lg shadow"
                />
                {block.metadata?.caption && (
                  <p className="text-sm text-gray-600 mt-2 italic text-center">
                    {block.metadata.caption}
                  </p>
                )}
              </>
            ) : (
              <div className="bg-gray-200 h-48 rounded flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
        );
      case BlockType.VIDEO:
        return (
          <div
            className={`mb-4 ${sizeClasses[block.metadata?.size || MediaSize.FULL]} ${
              alignClasses[block.metadata?.align || MediaAlign.CENTER]
            }`}
          >
            <div className="aspect-video bg-gray-900 rounded flex items-center justify-center text-white">
              <span>{block.content || "Video URL Missing"}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

      <div className="flex space-x-3 items-center text-sm text-gray-600 mb-4">
        <span>By {article.author || "Unknown Author"}</span>
        {article.published && (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3 w-3" /> Published
          </Badge>
        )}
      </div>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt="Thumbnail"
          className="w-full rounded-lg mb-4 shadow"
        />
      )}

      {article.excerpt && (
        <p className="text-gray-600 italic mb-6 border-l-4 border-gray-300 pl-4">
          {article.excerpt}
        </p>
      )}

      <Separator className="mb-6" />

      <div className="space-y-4">
        {article.blocks?.length
          ? article.blocks
              .sort((a, b) => a.order - b.order)
              .map((block) => <div key={block.id}>{renderBlock(block)}</div>)
          : <p className="text-gray-400 text-center py-8">No content available.</p>}
      </div>
    </article>
  );
}
