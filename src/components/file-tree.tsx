'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FileNode } from '@/lib/docs';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileTreeProps {
  nodes: FileNode[];
  level?: number;
}

export function FileTree({ nodes, level = 0 }: FileTreeProps) {
  return (
    <div className="flex flex-col gap-1">
      {nodes.map((node) => (
        <FileTreeNode key={node.path} node={node} level={level} />
      ))}
    </div>
  );
}

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
}

function FileTreeNode({ node, level }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isFolder = node.type === 'folder';
  const hasIndex = node.hasIndex;

  // If folder has index, we link to it. Otherwise '#'
  // Note: node.path for file is "folder/file.html" (stripped now? No, lib keeps extension? Wait, I stripped extension in lib/docs.ts for name, but path?
  // In lib/docs.ts: path: itemPath. itemPath = join(relativePath, item.name). item.name has extension for files.
  // Wait, I stripped extension from NAME, but PATH usually keeps it?
  // Let's check lib/docs.ts again.
  // "name: item.name.replace(/\.html$/i, ''), path: itemPath" -> itemPath comes from item.name (original).
  // So file path still has .html. Good.
  // Folder path is just folder name.
  
  const href = isFolder 
    ? (hasIndex ? `/docs/${node.path}` : '#')
    : `/docs/${node.path}`; // File paths still have .html in node.path? Yes.

  // Active check needs to be robust
  // For folders: exact match /docs/folder or /docs/folder/
  // For files: exact match
  const isActive = pathname === href || (pathname === href + '/') || (pathname === href.replace(/\/$/, ''));

  const handleToggle = (e: React.MouseEvent) => {
    if (isFolder) {
      // If it has index, we want to navigate (allow default) AND toggle.
      // If no index, we prevent default (no navigation) AND toggle.
      if (!hasIndex) {
        e.preventDefault();
      }
      // Toggle expansion
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <Link
        href={href}
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm text-zinc-700 dark:text-zinc-300",
          isActive && "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-medium",
          "cursor-pointer"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        <span className="shrink-0 text-zinc-400">
            {isFolder ? (
                isOpen ? <FolderOpen size={16} /> : <Folder size={16} />
            ) : (
                <File size={16} />
            )}
        </span>
        <span className="truncate">{node.name}</span>
        {isFolder && (
          <span className="ml-auto shrink-0 text-zinc-400">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
      </Link>
      {isFolder && isOpen && node.children && (
        <FileTree nodes={node.children} level={level + 1} />
      )}
    </div>
  );
}
