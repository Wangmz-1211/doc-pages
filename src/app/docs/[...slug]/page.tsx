import React from 'react';
// import { FileText } from 'lucide-react'; // Removing FileText as per new design

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const rawPath = slug.join('/');
  
  const decodedSegments = slug.map(part => decodeURIComponent(part));
  const mainTitle = decodedSegments[decodedSegments.length - 1].replace(/\.html$/i, '');
  const breadcrumbs = decodedSegments.slice(0, -1).map(part => part.replace(/\.html$/i, ''));

  return (
    <div className="flex-1 h-full flex flex-col relative">
       {/* Floating Header */}
       <div className="absolute top-0 left-0 right-0 h-14 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center px-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl shrink-0 gap-2 z-20">
          {breadcrumbs.length > 0 && (
            <>
              <span className="text-sm font-medium text-zinc-500">
                {breadcrumbs.join(' / ')}
              </span>
              <span className="text-sm font-medium text-zinc-400">/</span>
            </>
          )}
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 break-all">{mainTitle}</h1>
       </div>
       
       {/* Full Height Iframe Container */}
       <div className="flex-1 w-full h-full">
          <iframe 
            src={`/api/view/${rawPath}`} 
            className="w-full h-full border-none block"
            title="Document Viewer"
            style={{ paddingTop: '3.5rem' }} // Add padding inside iframe container if possible, or handle via absolute
          />
       </div>
    </div>
  );
}
