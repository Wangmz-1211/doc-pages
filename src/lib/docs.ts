import fs from 'fs';
import path from 'path';

export type FileNode = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
};

const DOCS_DIR = path.join(process.cwd(), 'docs');

export function getDocsTree(dir: string = DOCS_DIR, relativePath: string = ''): FileNode[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  const nodes: FileNode[] = items.map((item) => {
    const itemPath = path.join(relativePath, item.name);
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      return {
        name: item.name,
        type: 'folder',
        path: itemPath,
        children: getDocsTree(fullPath, itemPath),
      };
    } else {
      return {
        name: item.name,
        type: 'file',
        path: itemPath,
      };
    }
  });

  // Sort: folders first, then files
  return nodes.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'folder' ? -1 : 1;
  });
}
