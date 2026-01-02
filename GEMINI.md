# Gemini Configuration: doc-pages

This repository contains a Next.js-based documentation site that dynamically renders HTML files from the `docs/` directory.

## Project Overview
- **Name:** doc-pages
- **Purpose:** Serve and display HTML documentation with a modern UI.
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## Tech Stack
- **React 19:** Utilizes the latest React features.
- **Next.js 16:** Uses App Router for routing and server components.
- **Tailwind CSS 4:** Modern utility-first styling.
- **Lucide React:** Icon library.

## Directory Structure
- `docs/`: The source of truth for documentation. Contains `.html` files.
- `src/app/`: Next.js App Router routes.
- `src/app/docs/[...slug]/`: Dynamic route that fetches and displays docs.
- `src/components/`: Reusable React components (Sidebar, FileTree, etc.).
- `src/lib/`: Utility functions (e.g., `docs.ts` for file system operations).
- `public/`: Static assets.

## Coding Standards & Guidelines

### TypeScript
- Use strict typing. Avoid `any`.
- Prefer interfaces for object structures and types for unions/aliases.

### React & Next.js
- Use Server Components by default. Use `'use client'` only when necessary (interactivity, hooks).
- Use `lucide-react` for icons.

### Styling
- Use Tailwind CSS 4 utility classes.
- Follow the existing design pattern (dark/light mode support if implemented, consistent spacing).

### Documentation Handling
- Documentation files are stored as `.html` in the `docs/` directory.
- `src/lib/docs.ts` is used to parse the directory structure.
- When adding new features, ensure they don't break the recursive tree generation or the dynamic route fetching.

## Gemini Specific Instructions
- When asked to add a new document, place it in the appropriate subdirectory within `docs/` as an `.html` file.
- If modifying the sidebar or file tree, ensure the `FileNode` type in `src/lib/docs.ts` is respected.
- Always check the `docs/` folder structure before suggesting routing changes.

## Document Generation Rules

When asked to generate or create new documentation, follow these strict guidelines to ensure consistency with the existing multi-language system.

### 1. File Naming & Location
- **Index Pages:** If the document is the main entry point for a folder, name it `index.html`. This ensures the folder is clickable and expandable in the UI.
- **Location:** Place files in the appropriate subdirectory within `docs/`.

### 2. Multi-Language Support Structure
All documentation files **must** support English (`en`), Chinese (`zh`), and Japanese (`ja`) in a single HTML file using the existing CSS/JS toggling mechanism.

**Required Boilerplate (Head):**
Include the following in `<head>`:
- Tailwind CSS via CDN (or check if project moves to build-time CSS).
- CSS styles for `[data-lang]` visibility toggling.
- JavaScript for `setLanguage()` and `localStorage` handling.

**Content Structure:**
- Wrap **every** text element (headings, paragraphs, spans) in its respective `data-lang` attribute.
- **Reference** The evidence supporting the content should be cited near the content. Maybe a document link, maby hyperlink to website. And the citation should be marked at the corresponding place in the article.
- **Reference sources** The evidence should always be real, so that you should retrieve the pages with google search and cite the pages.
- **Timeline** For a theme of technique, a timeline of the development should be included in the index page.
- **Do not** create separate files for languages.
- Provide high-quality translations for all three languages.

**Example Pattern:**
```html
<h1 data-lang="en">Title in English</h1>
<h1 data-lang="zh">中文标题</h1>
<h1 data-lang="ja">日本語のタイトル</h1>

<p data-lang="en">Content in English...</p>
<p data-lang="zh">中文内容...</p>
<p data-lang="ja">日本語の内容...</p>
```

### 3. UI/UX Components
- Include the language switcher buttons (EN/中文/日本語) in the top right (absolute positioned).
- Include a standard navigation/breadcrumb if applicable (e.g., "Back to Overview").
- Ensure dark mode support (use `dark:` Tailwind classes) as seen in existing files.

### 4. Visual Style (Next.js / Vercel Theme)
- **Font:** Use `Geist` or a system font stack (`inter`, `-apple-system`, etc.) that mimics the clean, industrial look of Vercel.
- **Color Palette:** Strictly use the `zinc` (or gray/slate) scale for neutral tones. Avoid vibrant primary colors unless for specific highlights (e.g., blue for links/active states).
- **Aesthetic:** Minimalist, high contrast text, subtle borders (`border-zinc-200 dark:border-zinc-800`), and clean spacing.
- **Components:** Use card-like containers with subtle shadows or borders for distinct sections.
- **Dark Mode:** Deep black or very dark grey backgrounds (`bg-black` or `bg-zinc-950`) with high contrast text.
