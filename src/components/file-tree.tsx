'use client';

import React, { useState, useEffect } from 'react';
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
  const pathname = usePathname();
  
  const isFolder = node.type === 'folder';
  const hasIndex = node.hasIndex;

  const logicalPath = `/docs/${node.path}`;
  const href = isFolder 
    ? (hasIndex ? logicalPath : '#')
    : logicalPath;

  // Check if this node is the active one
  const isActive = pathname === href || pathname === logicalPath;

  // Check if this folder contains the active path (should be expanded)
  // We check if pathname starts with the folder path + '/' to ensure directory match
  // OR if it matches exactly (active folder index)
  const shouldExpand = isFolder && (
      isActive || 
      pathname.startsWith(logicalPath + '/')
  );

  const [isOpen, setIsOpen] = useState(shouldExpand);

  useEffect(() => {
    if (shouldExpand) {
      setIsOpen(true);
    }
  }, [pathname, shouldExpand]);

  const handleToggle = (e: React.MouseEvent) => {
    if (isFolder) {
      if (!hasIndex) {
        e.preventDefault();
      }
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
