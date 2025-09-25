import type { ReactNode } from "react";

interface MDXRendererProps {
  children: ReactNode;
}

export function MDXRenderer({ children }: MDXRendererProps) {
  return (
    <article className="prose prose-invert max-w-none prose-headings:tracking-tight">
      {children}
    </article>
  );
}
