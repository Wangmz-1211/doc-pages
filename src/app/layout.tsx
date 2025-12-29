import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { BackgroundDecorations } from "@/components/background-decorations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocViewer",
  description: "HTML Document Exhibition App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex text-zinc-900 dark:text-zinc-100 min-h-screen`}
      >
        <BackgroundDecorations />
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
             {children}
        </main>
      </body>
    </html>
  );
}