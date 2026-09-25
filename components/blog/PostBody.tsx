'use client';

import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

export type WatchVariant = 'black' | 'steel' | 'gold';

const SHORTCODE_RE = /^\[\[watch-cta:(black|steel|gold)\]\]$/;

// Pull a plain-text string out of react-markdown paragraph children. Only
// matches when the paragraph contains exactly one text node, i.e. the
// shortcode lives on its own line.
function paragraphText(children: ReactNode): string | null {
  if (typeof children === 'string') return children;
  if (Array.isArray(children) && children.length === 1) {
    return paragraphText(children[0]);
  }
  return null;
}

export function PostBody({
  content,
  watchCtas,
}: {
  content: string;
  watchCtas: Record<WatchVariant, ReactNode>;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        h1: (props) => (
          <h1
            {...props}
            className="font-display mt-12 text-4xl leading-tight text-white first:mt-0"
          />
        ),
        h2: (props) => (
          <h2
            {...props}
            className="font-display mt-12 scroll-mt-24 text-3xl leading-tight text-white"
          />
        ),
        h3: (props) => (
          <h3
            {...props}
            className="font-display mt-8 scroll-mt-24 text-2xl leading-tight text-white"
          />
        ),
        p: ({ children, ...props }) => {
          const text = paragraphText(children);
          if (text) {
            const m = SHORTCODE_RE.exec(text.trim());
            if (m) {
              const variant = m[1] as WatchVariant;
              return <>{watchCtas[variant]}</>;
            }
          }
          return (
            <p {...props} className="mt-6 text-lg leading-relaxed text-white/70">
              {children}
            </p>
          );
        },
        a: (props) => (
          <a
            {...props}
            className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          />
        ),
        strong: (props) => (
          <strong {...props} className="font-medium text-white" />
        ),
        em: (props) => <em {...props} className="italic text-white/80" />,
        ul: (props) => (
          <ul {...props} className="mt-6 list-disc space-y-2 ps-6 text-white/70" />
        ),
        ol: (props) => (
          <ol {...props} className="mt-6 list-decimal space-y-2 ps-6 text-white/70" />
        ),
        li: (props) => <li {...props} className="text-lg leading-relaxed" />,
        blockquote: (props) => (
          <blockquote
            {...props}
            className="mt-6 border-s-2 border-gold/60 ps-6 italic text-white/60"
          />
        ),
        code: (props) => (
          <code
            {...props}
            className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-gold"
          />
        ),
        hr: (props) => <hr {...props} className="my-10 border-white/10" />,
        img: (props) => (
          <img
            {...props}
            className="my-8 w-full border border-white/5"
            loading="lazy"
            alt={props.alt || ''}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
