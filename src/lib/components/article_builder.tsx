'use client';

import { useState, useRef, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Upload, 
  X, 
  GripVertical, 
  Trash2, 
  Plus, 
  Heading1, 
  Heading2, 
  Type, 
  Image as ImageIcon, 
  Video,
  Eye,
  Save,
  Loader2,
  FileEdit,
  CheckCircle2,
  Table as TableIcon,
  List,
  ListOrdered,
  CheckSquare
} from 'lucide-react';

// Types
export enum BlockType {
  HEADING = 'HEADING',
  SUBHEADING = 'SUBHEADING',
  PARAGRAPH = 'PARAGRAPH',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  TABLE = 'TABLE',
  ORDERED_LIST = 'ORDERED_LIST',
  UNORDERED_LIST = 'UNORDERED_LIST',
  CHECKLIST = 'CHECKLIST',
}

export enum MediaSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  FULL = 'FULL',
}

export enum MediaAlign {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

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

interface ArticleBuilderProps {
  onSave?: (data: any) => Promise<void>;
  initialData?: any;
  isEdit?: boolean;
  isSaving?: boolean;
}

const componentTypes = [
  { type: BlockType.HEADING, icon: Heading1, label: 'Heading', desc: 'Main section title' },
  { type: BlockType.SUBHEADING, icon: Heading2, label: 'Subheading', desc: 'Subsection title' },
  { type: BlockType.PARAGRAPH, icon: Type, label: 'Paragraph', desc: 'Body text content' },
  { type: BlockType.IMAGE, icon: ImageIcon, label: 'Image', desc: 'Upload image' },
  { type: BlockType.VIDEO, icon: Video, label: 'Video', desc: 'Embed video' },
  { type: BlockType.TABLE, icon: TableIcon, label: 'Table', desc: 'Data table' },
  { type: BlockType.ORDERED_LIST, icon: ListOrdered, label: 'Numbered List', desc: 'Ordered list' },
  { type: BlockType.UNORDERED_LIST, icon: List, label: 'Bullet List', desc: 'Unordered list' },
  { type: BlockType.CHECKLIST, icon: CheckSquare, label: 'Checklist', desc: 'Todo list' },
];

export default function ArticleBuilder({ onSave, initialData, isEdit = false, isSaving = false }: ArticleBuilderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>(BlockType.PARAGRAPH);

  // Form state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    author: initialData?.author || '',
    authorEmail: initialData?.authorEmail || '',
    thumbnail: initialData?.thumbnail || '',
    excerpt: initialData?.excerpt || '',
    published: initialData?.published || false,
  });

  // Blocks state
  const [blocks, setBlocks] = useState<ArticleBlock[]>(
    initialData?.blocks?.map((b: any) => ({
      ...b,
      id: b.id || `block-${Date.now()}-${Math.random()}`,
    })) || []
  );

  const generateId = () => `block-${Date.now()}-${Math.random()}`;

  // Upload file
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.path;
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    try {
      const path = await uploadFile(file);
      setFormData(prev => ({ ...prev, thumbnail: path }));
    } catch (error) {
      alert('Failed to upload thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnail: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle image block upload
  const handleImageBlockUpload = async (blockId: string, file: File) => {
    setUploadingImage(blockId);
    try {
      const path = await uploadFile(file);
      setBlocks(prev =>
        prev.map(block =>
          block.id === blockId ? { ...block, content: path } : block
        )
      );
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(null);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Add block
  const addBlock = () => {
    let defaultContent = '';
    let defaultMetadata: BlockMetadata | undefined = undefined;

    // Set default content based on block type
    switch (selectedBlockType) {
      case BlockType.TABLE:
        defaultContent = JSON.stringify({
          headers: ['Column 1', 'Column 2', 'Column 3'],
          rows: [
            ['Data 1', 'Data 2', 'Data 3'],
            ['Data 4', 'Data 5', 'Data 6']
          ]
        });
        defaultMetadata = { hasHeader: true };
        break;
      case BlockType.ORDERED_LIST:
      case BlockType.UNORDERED_LIST:
        defaultContent = JSON.stringify({
          items: ['Item 1', 'Item 2', 'Item 3']
        });
        defaultMetadata = { listStyle: selectedBlockType === BlockType.ORDERED_LIST ? 'decimal' : 'disc' };
        break;
      case BlockType.CHECKLIST:
        defaultContent = JSON.stringify({
          items: [
            { text: 'Task 1', checked: false },
            { text: 'Task 2', checked: false }
          ]
        });
        break;
      case BlockType.IMAGE:
      case BlockType.VIDEO:
        defaultMetadata = { size: MediaSize.LARGE, align: MediaAlign.CENTER };
        break;
    }

    const newBlock: ArticleBlock = {
      id: generateId(),
      type: selectedBlockType,
      content: defaultContent,
      order: blocks.length,
      metadata: defaultMetadata,
    };
    setBlocks(prev => [...prev, newBlock]);
    setShowAddModal(false);
  };

  // Update block
  const updateBlock = (id: string, updates: Partial<ArticleBlock>) => {
    setBlocks(prev =>
      prev.map(block => (block.id === id ? { ...block, ...updates } : block))
    );
  };

  // Update metadata
  const updateBlockMetadata = (id: string, metadata: Partial<BlockMetadata>) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, metadata: { ...block.metadata, ...metadata } } : block
      )
    );
  };

  // Delete block
  const deleteBlock = (id: string) => {
    setBlocks(prev => {
      const filtered = prev.filter(b => b.id !== id);
      return filtered.map((block, index) => ({ ...block, order: index }));
    });
  };

  // Table functions
  const updateTableData = (blockId: string, tableData: TableData) => {
    updateBlock(blockId, { content: JSON.stringify(tableData) });
  };

  const addTableRow = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const tableData: TableData = JSON.parse(block.content);
    tableData.rows.push(new Array(tableData.headers.length).fill(''));
    updateTableData(blockId, tableData);
  };

  const addTableColumn = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const tableData: TableData = JSON.parse(block.content);
    tableData.headers.push(`Column ${tableData.headers.length + 1}`);
    tableData.rows = tableData.rows.map(row => [...row, '']);
    updateTableData(blockId, tableData);
  };

  const removeTableRow = (blockId: string, rowIndex: number) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const tableData: TableData = JSON.parse(block.content);
    tableData.rows.splice(rowIndex, 1);
    updateTableData(blockId, tableData);
  };

  const removeTableColumn = (blockId: string, colIndex: number) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const tableData: TableData = JSON.parse(block.content);
    tableData.headers.splice(colIndex, 1);
    tableData.rows = tableData.rows.map(row => {
      const newRow = [...row];
      newRow.splice(colIndex, 1);
      return newRow;
    });
    updateTableData(blockId, tableData);
  };

  // List functions
  const updateListItems = (blockId: string, items: string[] | ListItem[]) => {
    updateBlock(blockId, { content: JSON.stringify({ items }) });
  };

  const addListItem = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const data = JSON.parse(block.content);
    if (block.type === BlockType.CHECKLIST) {
      data.items.push({ text: '', checked: false });
    } else {
      data.items.push('');
    }
    updateBlock(blockId, { content: JSON.stringify(data) });
  };

  const removeListItem = (blockId: string, index: number) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const data = JSON.parse(block.content);
    data.items.splice(index, 1);
    updateBlock(blockId, { content: JSON.stringify(data) });
  };

  const updateListItem = (blockId: string, index: number, value: string | ListItem) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const data = JSON.parse(block.content);
    data.items[index] = value;
    updateBlock(blockId, { content: JSON.stringify(data) });
  };

  // Drag handlers
  const handleDragStart = (index: number) => setDraggedIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newBlocks = [...blocks];
    const draggedBlock = newBlocks[draggedIndex];
    newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(index, 0, draggedBlock);

    setBlocks(newBlocks.map((block, idx) => ({ ...block, order: idx })));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const articleData = {
        ...formData,
        blocks: blocks.map((block, index) => ({
          type: block.type,
          content: block.content,
          order: index,
          metadata: block.metadata,
        })),
      };

      if (onSave) await onSave(articleData);
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  // Render preview
  const renderBlockPreview = (block: ArticleBlock) => {
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
        return <h1 className="text-4xl font-bold mb-4">{block.content || 'Heading...'}</h1>;
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
        if (!block.content) return <div className="bg-gray-200 h-48 rounded flex items-center justify-center text-gray-400">No image</div>;
        return (
          <div className={`mb-4 ${sizeClasses[block.metadata?.size || MediaSize.LARGE]} ${alignClasses[block.metadata?.align || MediaAlign.CENTER]}`}>
            <img src={block.content} alt={block.metadata?.alt || ''} className="w-full rounded shadow" />
            {block.metadata?.caption && <p className="text-sm text-gray-600 mt-2 italic">{block.metadata.caption}</p>}
          </div>
        );
      case BlockType.VIDEO:
        return (
          <div className={`mb-4 ${sizeClasses[block.metadata?.size || MediaSize.FULL]} ${alignClasses[block.metadata?.align || MediaAlign.CENTER]}`}>
            <div className="aspect-video bg-gray-900 rounded flex items-center justify-center text-white">
              Video: {block.content?.substring(0, 30)}...
            </div>
          </div>
        );
      case BlockType.TABLE:
        try {
          const tableData: TableData = JSON.parse(block.content);
          return (
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                {block.metadata?.hasHeader && (
                  <thead>
                    <tr className="bg-gray-100">
                      {tableData.headers.map((header, i) => (
                        <th key={i} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {tableData.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {row.map((cell, j) => (
                        <td key={j} className="border border-gray-300 px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        } catch {
          return <div className="text-red-500">Invalid table data</div>;
        }
      case BlockType.ORDERED_LIST:
        try {
          const listData = JSON.parse(block.content);
          return (
            <ol className="list-decimal list-inside mb-4 space-y-1">
              {listData.items.map((item: string, i: number) => (
                <li key={i} className="text-gray-700">{item}</li>
              ))}
            </ol>
          );
        } catch {
          return <div className="text-red-500">Invalid list data</div>;
        }
      case BlockType.UNORDERED_LIST:
        try {
          const listData = JSON.parse(block.content);
          return (
            <ul className="list-disc list-inside mb-4 space-y-1">
              {listData.items.map((item: string, i: number) => (
                <li key={i} className="text-gray-700">{item}</li>
              ))}
            </ul>
          );
        } catch {
          return <div className="text-red-500">Invalid list data</div>;
        }
      case BlockType.CHECKLIST:
        try {
          const checklistData = JSON.parse(block.content);
          return (
            <div className="mb-4 space-y-2">
              {checklistData.items.map((item: ListItem, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    readOnly 
                    className="w-4 h-4"
                  />
                  <span className={`text-gray-700 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          );
        } catch {
          return <div className="text-red-500">Invalid checklist data</div>;
        }
      default:
        return null;
    }
  };

  // Render block editor
  const renderBlockEditor = (block: ArticleBlock) => {
    switch (block.type) {
      case BlockType.TABLE:
        try {
          const tableData: TableData = JSON.parse(block.content);
          return (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Switch
                  checked={block.metadata?.hasHeader ?? true}
                  onCheckedChange={(checked) => updateBlockMetadata(block.id, { hasHeader: checked })}
                />
                <Label>Show headers</Label>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {tableData.headers.map((header, i) => (
                        <th key={i} className="border p-1">
                          <div className="flex items-center gap-1">
                            <Input
                              value={header}
                              onChange={(e) => {
                                const newTableData = { ...tableData };
                                newTableData.headers[i] = e.target.value;
                                updateTableData(block.id, newTableData);
                              }}
                              className="text-sm"
                            />
                            {tableData.headers.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTableColumn(block.id, i)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="border p-1">
                            <Input
                              value={cell}
                              onChange={(e) => {
                                const newTableData = { ...tableData };
                                newTableData.rows[rowIndex][colIndex] = e.target.value;
                                updateTableData(block.id, newTableData);
                              }}
                              className="text-sm"
                            />
                          </td>
                        ))}
                        <td className="border-0 p-1">
                          {tableData.rows.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTableRow(block.id, rowIndex)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTableRow(block.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Row
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTableColumn(block.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Column
                </Button>
              </div>
            </div>
          );
        } catch {
          return <div className="text-red-500">Invalid table data</div>;
        }

      case BlockType.ORDERED_LIST:
      case BlockType.UNORDERED_LIST:
        try {
          const listData = JSON.parse(block.content);
          return (
            <div className="space-y-2">
              {listData.items.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateListItem(block.id, i, e.target.value)}
                    placeholder={`Item ${i + 1}`}
                  />
                  {listData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeListItem(block.id, i)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addListItem(block.id)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Item
              </Button>
            </div>
          );
        } catch {
          return <div className="text-red-500">Invalid list data</div>;
        }

      case BlockType.CHECKLIST:
        try {
          const checklistData = JSON.parse(block.content);
          return (
            <div className="space-y-2">
              {checklistData.items.map((item: ListItem, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => updateListItem(block.id, i, { ...item, checked: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Input
                    value={item.text}
                    onChange={(e) => updateListItem(block.id, i, { ...item, text: e.target.value })}
                    placeholder={`Task ${i + 1}`}
                  />
                  {checklistData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeListItem(block.id, i)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addListItem(block.id)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Task
              </Button>
            </div>
          );
        } catch {
          return <div className="text-red-500">Invalid checklist data</div>;
        }

      case BlockType.IMAGE:
        return (
          <div className="space-y-3">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageBlockUpload(block.id, file);
                }}
                className="hidden"
                id={`image-${block.id}`}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`image-${block.id}`)?.click()}
                disabled={uploadingImage === block.id}
              >
                {uploadingImage === block.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </>
                )}
              </Button>
            </div>
            {block.content && (
              <div className="relative">
                <img src={block.content} alt="" className="h-24 rounded border" />
                <Badge className="absolute top-1 right-1">Uploaded</Badge>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Size</Label>
                <Select
                  value={block.metadata?.size || MediaSize.LARGE}
                  onValueChange={(value: MediaSize) => updateBlockMetadata(block.id, { size: value as MediaSize })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={MediaSize.SMALL}>Small</SelectItem>
                    <SelectItem value={MediaSize.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={MediaSize.LARGE}>Large</SelectItem>
                    <SelectItem value={MediaSize.FULL}>Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Align</Label>
                <Select
                  value={block.metadata?.align || MediaAlign.CENTER}
                  onValueChange={(value: MediaAlign) => updateBlockMetadata(block.id, { align: value as MediaAlign })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={MediaAlign.LEFT}>Left</SelectItem>
                    <SelectItem value={MediaAlign.CENTER}>Center</SelectItem>
                    <SelectItem value={MediaAlign.RIGHT}>Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input
              placeholder="Caption"
              value={block.metadata?.caption || ''}
              onChange={(e) => updateBlockMetadata(block.id, { caption: e.target.value })}
            />
            <Input
              placeholder="Alt text"
              value={block.metadata?.alt || ''}
              onChange={(e) => updateBlockMetadata(block.id, { alt: e.target.value })}
            />
          </div>
        );

      case BlockType.VIDEO:
        return (
          <div className="space-y-3">
            <Input
              placeholder="Video URL"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={block.metadata?.size || MediaSize.FULL}
                onValueChange={(value: MediaSize) => updateBlockMetadata(block.id, { size: value as MediaSize })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MediaSize.SMALL}>Small</SelectItem>
                  <SelectItem value={MediaSize.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={MediaSize.LARGE}>Large</SelectItem>
                  <SelectItem value={MediaSize.FULL}>Full</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={block.metadata?.align || MediaAlign.CENTER}
                onValueChange={(value: MediaAlign) => updateBlockMetadata(block.id, { align: value as MediaAlign })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Align" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MediaAlign.LEFT}>Left</SelectItem>
                  <SelectItem value={MediaAlign.CENTER}>Center</SelectItem>
                  <SelectItem value={MediaAlign.RIGHT}>Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <Textarea
            placeholder={`Enter ${block.type.toLowerCase()} text...`}
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            rows={block.type === BlockType.PARAGRAPH ? 4 : 2}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileEdit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">{isEdit ? 'Edit Article' : 'Create Article'}</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: Editor */}
            <div className="space-y-6 gap-6 flex-col flex">
              {/* Article Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Article Information</CardTitle>
                  <CardDescription>Basic details about your article</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter article title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="article-url-slug"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="author">Author *</Label>
                      <Input id="author" name="author" required value={formData.author} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="authorEmail">Email</Label>
                      <Input id="authorEmail" name="authorEmail" type="email" value={formData.authorEmail} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div>
                    <Label>Thumbnail Image</Label>
                    <div className="mt-2 space-y-3">
                      {!formData.thumbnail ? (
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="hidden"
                            ref={fileInputRef}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingThumbnail}
                          >
                            {uploadingThumbnail ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Image
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="relative">
                          <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-32 object-cover rounded border" />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={removeThumbnail}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Brief description..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked: any) => setFormData(prev => ({ ...prev, published: checked }))}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Content Blocks */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Content Blocks</CardTitle>
                      <CardDescription>Build your article content</CardDescription>
                    </div>
                    <Button type="button" onClick={() => setShowAddModal(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Component
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {blocks.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Type className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium mb-2">No content blocks</p>
                      <p className="text-sm text-gray-500 mb-4">Start by adding your first component</p>
                      <Button type="button" variant="outline" onClick={() => setShowAddModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add First Component
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blocks.map((block, index) => (
                        <Card
                          key={block.id}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e: DragEvent<Element>) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          className={`cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                        >
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                                <Select
                                  value={block.type}
                                  onValueChange={(value: BlockType) => updateBlock(block.id, { type: value as BlockType })}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={BlockType.HEADING}>Heading</SelectItem>
                                    <SelectItem value={BlockType.SUBHEADING}>Subheading</SelectItem>
                                    <SelectItem value={BlockType.PARAGRAPH}>Paragraph</SelectItem>
                                    <SelectItem value={BlockType.IMAGE}>Image</SelectItem>
                                    <SelectItem value={BlockType.VIDEO}>Video</SelectItem>
                                    <SelectItem value={BlockType.TABLE}>Table</SelectItem>
                                    <SelectItem value={BlockType.ORDERED_LIST}>Numbered List</SelectItem>
                                    <SelectItem value={BlockType.UNORDERED_LIST}>Bullet List</SelectItem>
                                    <SelectItem value={BlockType.CHECKLIST}>Checklist</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Badge variant="secondary">#{index + 1}</Badge>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteBlock(block.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                            {renderBlockEditor(block)}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 w-[200px]" disabled={loading || isSaving}>
                  {(loading || isSaving) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEdit ? 'Update Article' : 'Create Article'}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* RIGHT: Preview */}
            <div className="lg:sticky lg:top-6 h-fit">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    <CardTitle>Live Preview</CardTitle>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <ScrollArea className="h-[600px]">
                    {formData.title && (
                      <>
                        <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
                        <div className="flex space-x-3 items-center gap-2 text-sm text-gray-600 mb-4">
                          <span>By {formData.author || 'Author'}</span>
                          {formData.published && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Published
                            </Badge>
                          )}
                        </div>
                      </>
                    )}

                    {formData.thumbnail && (
                      <img src={formData.thumbnail} alt="Thumbnail" className="w-full rounded-lg mb-4" />
                    )}

                    {formData.excerpt && (
                      <p className="text-gray-600 italic mb-6 border-l-4 border-gray-300 pl-4">{formData.excerpt}</p>
                    )}

                    <div className="space-y-4">
                      {blocks.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">Your content will appear here...</p>
                      ) : (
                        blocks.map(block => <div key={block.id}>{renderBlockPreview(block)}</div>)
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      {/* Add Component Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Component</DialogTitle>
            <DialogDescription>Choose a component type to add to your article</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            {componentTypes.map(({ type, icon: Icon, label, desc }) => (
              <Button
                key={type}
                type="button"
                variant={selectedBlockType === type ? "default" : "outline"}
                className="w-full justify-start h-auto py-3"
                onClick={() => setSelectedBlockType(type)}
                onDoubleClick={() => {
                  setSelectedBlockType(type);
                  setTimeout(() => addBlock(), 10);
                }}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{label}</div>
                  <div className="text-xs opacity-70">{desc}</div>
                </div>
                {selectedBlockType === type && <CheckCircle2 className="ml-auto h-5 w-5 flex-shrink-0" />}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="button" onClick={addBlock} className="flex-1">
              Add Component
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}