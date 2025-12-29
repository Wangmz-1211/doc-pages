import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: urlPath } = await params;
  const filePath = path.join(process.cwd(), 'docs', ...urlPath);

  // Security check: ensure we don't traverse out of docs
  const docsDir = path.join(process.cwd(), 'docs');
  if (!path.resolve(filePath).startsWith(docsDir)) {
     return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
      return new NextResponse('Not a file', { status: 400 });
  }

  let content = fs.readFileSync(filePath);
  
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.html') {
    let htmlString = content.toString();
    // Inject transparency and font styles
    const styles = `
      <style>
        body { background-color: #ffffff; color: #171717; }
        @media (prefers-color-scheme: dark) {
          body { background-color: #0a0a0a; color: #ededed; }
        }
      </style>
    `;
    htmlString = htmlString.replace('</head>', `${styles}</head>`);
    content = Buffer.from(htmlString);
  }

  const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
  };
  
  const contentType = mimeTypes[ext] || 'text/plain';

  return new NextResponse(content, {
    headers: {
      'Content-Type': contentType,
    },
  });
}
