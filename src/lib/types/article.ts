// Block types for article content
export enum BlockType {
    HEADING = 'HEADING',
    SUBHEADING = 'SUBHEADING',
    PARAGRAPH = 'PARAGRAPH',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
  }
  
  // Size options for images and videos
  export enum MediaSize {
    SMALL = 'SMALL',      // 400px
    MEDIUM = 'MEDIUM',    // 600px
    LARGE = 'LARGE',      // 800px
    FULL = 'FULL',        // 100% width
  }
  
  // Alignment options for images and videos
  export enum MediaAlign {
    LEFT = 'LEFT',
    CENTER = 'CENTER',
    RIGHT = 'RIGHT',
  }
  
  // Metadata structure for blocks
  export interface BlockMetadata {
    // For images and videos
    size?: MediaSize;
    align?: MediaAlign;
    caption?: string;
    
    // For images
    alt?: string;
    
    // For videos
    aspectRatio?: string;  // e.g., "16:9", "4:3"
    autoplay?: boolean;
    muted?: boolean;
    controls?: boolean;
  }
  
  // Article block structure (from database)
  export interface ArticleBlock {
    id: string;
    articleId: string;
    type: BlockType;
    content: string;
    order: number;
    metadata?: BlockMetadata;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Comment structure
  export interface Comment {
    id: string;
    articleId: string;
    parentId?: string | null;
    author: string;
    email?: string | null;
    content: string;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
    replies?: Comment[];
  }
  
  // Complete article structure
  export interface Article {
    id: string;
    title: string;
    slug: string;
    author: string;
    authorEmail?: string | null;
    thumbnail?: string | null;
    excerpt?: string | null;
    published: boolean;
    publishedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    blocks?: ArticleBlock[];
    comments?: Comment[];
  }
  
  // Form data for creating/updating articles
  export interface ArticleFormData {
    title: string;
    slug: string;
    author: string;
    authorEmail?: string;
    thumbnail?: string;
    excerpt?: string;
    published: boolean;
    blocks: {
      type: BlockType;
      content: string;
      order: number;
      metadata?: BlockMetadata;
    }[];
  }
  
  // Helper: Map size enum to pixel values
  export const MediaSizePixels: Record<MediaSize, string> = {
    [MediaSize.SMALL]: '400px',
    [MediaSize.MEDIUM]: '600px',
    [MediaSize.LARGE]: '800px',
    [MediaSize.FULL]: '100%',
  };
  
  // Helper: Map alignment to CSS classes
  export const MediaAlignClasses: Record<MediaAlign, string> = {
    [MediaAlign.LEFT]: 'mr-auto',
    [MediaAlign.CENTER]: 'mx-auto',
    [MediaAlign.RIGHT]: 'ml-auto',
  };