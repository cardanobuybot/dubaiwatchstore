import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
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
            className="font-display mt-10 text-3xl leading-tight text-white"
          />
        ),
        h3: (props) => (
          <h3
            {...props}
            className="font-display mt-8 text-2xl leading-tight text-white"
          />
        ),
        p: (props) => (
          <p {...props} className="text-lg leading-relaxed text-white/70" />
        ),
        a: (props) => (
          <a
            {...props}
            className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={
              props.href?.startsWith('http') ? 'noopener noreferrer' : undefined
            }
          />
        ),
        strong: (props) => (
          <strong {...props} className="font-medium text-white" />
        ),
        em: (props) => <em {...props} className="italic text-white/80" />,
        ul: (props) => (
          <ul {...props} className="list-disc space-y-2 pl-6 text-white/70" />
        ),
        ol: (props) => (
          <ol
            {...props}
            className="list-decimal space-y-2 pl-6 text-white/70"
          />
        ),
        li: (props) => <li {...props} className="text-lg leading-relaxed" />,
        blockquote: (props) => (
          <blockquote
            {...props}
            className="border-s-2 border-gold/60 ps-6 text-white/60 italic"
          />
        ),
        code: (props) => (
          <code
            {...props}
            className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-gold"
          />
        ),
        hr: (props) => <hr {...props} className="border-white/10" />,
        img: (props) => (
          <img
            {...props}
            className="my-6 w-full border border-white/5"
            loading="lazy"
            alt={props.alt || ''}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
