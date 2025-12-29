import fs from 'fs';
import path from 'path';

export type FileNode = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  hasIndex?: boolean;
  children?: FileNode[];
};

const DOCS_DIR = path.join(process.cwd(), 'docs');

export function getDocsTree(dir: string = DOCS_DIR, relativePath: string = ''): FileNode[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  const nodes: FileNode[] = [];

  for (const item of items) {
     const itemPath = path.join(relativePath, item.name);
     const fullPath = path.join(dir, item.name);

     if (item.isDirectory()) {
       const children = getDocsTree(fullPath, itemPath);
       // Check if children contain an index.html (before we stripped extensions or filtered)
       // Actually we need to check the raw items or check the processed children.
       // Since we process children recursively, we need to know if one of them *was* index.html.
       // But wait, the children function call *returns* the processed nodes. 
       // If we filter index.html inside the recursive call, we won't see it here unless we pass a flag.
       // Better approach: Check for index.html existence in the current dir *before* recursing or filter it out *after*?
       
       // Let's check fs explicitly for index.html to be safe and clean
       const hasIndex = fs.existsSync(path.join(fullPath, 'index.html'));
       
       nodes.push({
         name: item.name,
         type: 'folder',
         path: itemPath,
         hasIndex,
         children: children, // We will filter index.html out of children inside the recursive call? No, let's do it here.
       });
     } else {
        // It's a file
        let name = item.name.replace(/\.html$/i, '');
        if (item.name === 'index.html') {
           name = 'Overview';
        }
        
        nodes.push({
          name: name,
          type: 'file',
          path: itemPath,
        });
     }
  }

  // Sort: Overview first, then folders, then files
  return nodes.sort((a, b) => {
    if (a.name === 'Overview') return -1;
    if (b.name === 'Overview') return 1;
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'folder' ? -1 : 1;
  });
}
