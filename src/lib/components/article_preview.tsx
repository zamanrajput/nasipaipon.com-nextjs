'use client';

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { BlockType, MediaSize, MediaAlign } from "@/lib/components/article_builder";

interface TableData {
  headers: string[];
  rows: string[][];
}

interface ListItem {
  text: string;
  checked?: boolean;
}

interface BlockMetadata {
  size?: MediaSize;
  align?: MediaAlign;
  caption?: string;
  alt?: string;
  hasHeader?: boolean;
  listStyle?: 'disc' | 'circle' | 'square' | 'decimal';
}

interface ArticleBlock {
  id: string;
  type: BlockType;
  content: string;
  order: number;
  metadata?: BlockMetadata;
}

interface ArticlePreviewData {
  title?: string;
  author?: string;
  published?: boolean;
  thumbnail?: string;
  excerpt?: string;
  blocks: ArticleBlock[];
}

interface ArticlePreviewComponentProps {
  data: ArticlePreviewData;
  showHeader?: boolean;
}

export default function ArticlePreviewComponent({ 
  data, 
  showHeader = true 
}: ArticlePreviewComponentProps) {
  
  const renderBlock = (block: ArticleBlock) => {
    const sizeClasses = {
      [MediaSize.SMALL]: 'max-w-sm',
      [MediaSize.MEDIUM]: 'max-w-md',
      [MediaSize.LARGE]: 'max-w-2xl',
      [MediaSize.FULL]: 'w-full',
    };

    const alignClasses = {
      [MediaAlign.LEFT]: 'mr-auto',
      [MediaAlign.CENTER]: 'mx-auto',
      [MediaAlign.RIGHT]: 'ml-auto',
    };

    switch (block.type) {
      case BlockType.HEADING:
        return (<h1 className="text-4xl font-bold mb-4">{block.content || 'Heading...'}</h1>);
      
      case BlockType.SUBHEADING:
        return <h2 className="text-2xl font-semibold mb-3">{block.content || 'Subheading...'}</h2>;
      
      case BlockType.PARAGRAPH:
        return (
          <p 
            className="text-gray-700 mb-4 leading-relaxed" 
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {block.content || 'Paragraph...'}
          </p>
        );
      
      case BlockType.IMAGE:
        if (!block.content) {
          return (
            <div className="bg-gray-200 h-48 rounded flex items-center justify-center text-gray-400">
              No image
            </div>
          );
        }
        return (
          <div 
            className={`mb-4 ${sizeClasses[block.metadata?.size || MediaSize.LARGE]} ${alignClasses[block.metadata?.align || MediaAlign.CENTER]}`}
          >
            <img 
              src={block.content} 
              alt={block.metadata?.alt || ''} 
              className="w-full rounded shadow" 
            />
            {block.metadata?.caption && (
              <p className="text-sm text-gray-600 mt-2 italic">
                {block.metadata.caption}
              </p>
            )}
          </div>
        );
      
      case BlockType.VIDEO:
        return (
          <div 
            className={`mb-4 ${sizeClasses[block.metadata?.size || MediaSize.FULL]} ${alignClasses[block.metadata?.align || MediaAlign.CENTER]}`}
          >
            {block.content ? (
              <div className="aspect-video bg-gray-900 rounded overflow-hidden">
                <iframe
                  src={block.content}
                  className="w-full h-full"
                  allowFullScreen
                  title="Video content"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-900 rounded flex items-center justify-center text-white">
                Video: {block.content?.substring(0, 30) || 'No video URL'}...
              </div>
            )}
          </div>
        );
      
      case BlockType.TABLE:
        try {
          const tableData: TableData = JSON.parse(block.content);
          return (
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                {block.metadata?.hasHeader && (
                  <thead className="bg-gray-100">
                    <tr>
                      {tableData.headers.map((header, i) => (
                        <th
                          key={i}
                          className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {tableData.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="border border-gray-300 px-4 py-3 text-gray-700"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        } catch (error) {
          return (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              Invalid table data
            </div>
          );
        }
      
      case BlockType.ORDERED_LIST:
        try {
          const orderedListData = JSON.parse(block.content);
          const listStyleType = block.metadata?.listStyle || 'decimal';
          return (
            <ol
              className="mb-4 space-y-2 pl-6"
              style={{ listStyleType }}
            >
              {orderedListData.items.map((item: string, i: number) => (
                <li key={i} className="text-gray-700 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          );
        } catch (error) {
          return (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              Invalid list data
            </div>
          );
        }
      
      case BlockType.UNORDERED_LIST:
        try {
          const unorderedListData = JSON.parse(block.content);
          const listStyleType = block.metadata?.listStyle || 'disc';
          return (
            <ul
              className="mb-4 space-y-2 pl-6"
              style={{ listStyleType }}
            >
              {unorderedListData.items.map((item: string, i: number) => (
                <li key={i} className="text-gray-700 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        } catch (error) {
          return (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              Invalid list data
            </div>
          );
        }
      
      case BlockType.CHECKLIST:
        try {
          const checklistData = JSON.parse(block.content);
          return (
            <div className="mb-4 space-y-3">
              {checklistData.items.map((item: ListItem, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-default"
                  />
                  <span
                    className={`text-gray-700 leading-relaxed ${
                      item.checked ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          );
        } catch (error) {
          return (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              Invalid checklist data
            </div>
          );
        }
      
      default:
        return null;
    }
  };

  return (
    <div>
      {showHeader && (
        <>
          {data.title && (
            <>
              <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
              <div className="flex space-x-3 items-center gap-2 text-sm text-gray-600 mb-4">
                <span>By {data.author || 'Author'}</span>
                {data.published && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Published
                  </Badge>
                )}
              </div>
            </>
          )}

          {data.thumbnail && (
            <img 
              src={data.thumbnail} 
              alt="Thumbnail" 
              className="w-full rounded-lg mb-4" 
            />
          )}

          {data.excerpt && (
            <p className="text-gray-600 italic mb-6 border-l-4 border-gray-300 pl-4">
              {data.excerpt}
            </p>
          )}

          {showHeader && <Separator className="mb-6" />}
        </>
      )}

      <div className="space-y-4">
        {data.blocks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Your content will appear here...</p>
        ) : (
          data.blocks
            .sort((a, b) => a.order - b.order)
            .map(block => (
              <div key={block.id}>{renderBlock(block)}</div>
            ))
        )}
      </div>
    </div>
  );
}