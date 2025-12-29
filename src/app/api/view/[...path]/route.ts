import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: urlPath } = await params;
  let filePath = path.join(process.cwd(), 'docs', ...urlPath);

  // Security check: ensure we don't traverse out of docs
  const docsDir = path.join(process.cwd(), 'docs');
  if (!path.resolve(filePath).startsWith(docsDir)) {
     return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  let stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
      // Check for index.html
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
          filePath = indexPath;
          stat = fs.statSync(filePath);
      } else {
          return new NextResponse('Directory listing not allowed', { status: 403 });
      }
  }

  if (!stat.isFile()) {
      return new NextResponse('Not a file', { status: 400 });
  }

  let content = fs.readFileSync(filePath);
  
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.html') {
    let htmlString = content.toString();
    // Inject transparency, font styles and link handling
    const styles = `
      <style>
        body { background-color: #ffffff; color: #171717; }
        @media (prefers-color-scheme: dark) {
          body { background-color: #0a0a0a; color: #ededed; }
        }
      </style>
      <script>
        document.addEventListener('click', (e) => {
          const link = e.target.closest('a');
          if (link && link.href && link.target !== '_blank') {
            try {
              const url = new URL(link.href);
              if (url.origin === window.location.origin) {
                if (url.pathname.startsWith('/docs/')) {
                  e.preventDefault();
                  window.parent.location.href = url.pathname + url.search + url.hash;
                } else if (url.pathname.startsWith('/api/view/')) {
                  e.preventDefault();
                  window.parent.location.href = url.pathname.replace('/api/view/', '/docs/') + url.search + url.hash;
                }
              }
            } catch (err) {
              console.error('Link navigation error:', err);
            }
          }
        });
      </script>
    `;
    htmlString = htmlString.replace(/<\/head>/i, `${styles}</head>`);
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
