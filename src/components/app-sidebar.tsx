import { getDocsTree } from '@/lib/docs';
import { FileTree } from './file-tree';
import Link from 'next/link';
import { Library } from 'lucide-react';

export async function AppSidebar() {
  const tree = getDocsTree();

  return (
    <aside className="w-64 border-r border-zinc-200/50 dark:border-zinc-800/50 h-screen sticky top-0 flex flex-col bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shrink-0 z-10">
      <div className="h-14 px-4 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-2">
        <Library className="w-6 h-6" />
        <Link href="/" className="font-semibold text-lg tracking-tight">
           DocViewer
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <FileTree nodes={tree} />
      </div>
    </aside>
  );
}
