import React from 'react';
import { Files } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 h-full flex items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-4 flex flex-col items-center">
        <div className="w-16 h-16 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-center shadow-sm mb-2">
            <Files className="w-8 h-8 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome to DocViewer</h1>
        <p className="text-zinc-500">Select a document from the sidebar to view it.</p>
      </div>
    </div>
  );
}