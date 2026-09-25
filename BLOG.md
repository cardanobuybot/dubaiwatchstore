# Blog authoring

Posts live in `content/blog/<lang>/<slug>.md`. One Markdown file per post
per language. The slug in the filename must match the `slug` in the
frontmatter, and both determine the URL: `/en/blog/<slug>` or
`/ar/blog/<slug>`.

Drafts (`draft: true`) are excluded from the build, sitemap and RSS feed.

## Creating a new post

1. Create the file under the correct locale directory:
   - EN: `content/blog/en/my-slug.md`
   - AR: `content/blog/ar/my-slug.md`
2. Copy the frontmatter template below and fill every required field.
3. Write the body in Markdown (GitHub-flavored). Use `##` for section
   headings — those feed the table of contents and get anchor IDs.
4. To drop a mid-article watch card, put a shortcode on its own line
   (see "Embedded components" below).
5. Save. `npm run dev` picks up the file immediately.

## Frontmatter

```yaml
---
title: "Post title, max ~60 chars"           # H1
seoTitle: "Optional different <title>"       # optional
description: "140–160 chars meta description"
slug: "post-slug"                            # lowercase, hyphens; matches filename
publishedAt: "2027-01-15"                    # ISO date
updatedAt: "2027-01-15"                      # ISO date; drives sitemap lastmod
author: "Pavel"                              # default: Pavel
coverImage: "/covers/my-post.jpg"            # under /public
coverAlt: "Alt text describing the cover"    # required
tags: ["dubai", "guide"]                     # used for related posts
lang: "en"                                   # en | ar; matches folder
relatedWatches: ["black", "steel", "gold"]   # optional
faq:                                          # optional; renders FAQ section + JSON-LD
  - q: "Question?"
    a: "Answer."
draft: true                                  # optional; drafts are not built
---
```

### Field notes

- **`title`** — used as the H1 and, unless `seoTitle` is set, as the
  `<title>` tag. Keep it under about 60 characters so it does not get
  truncated in search results.
- **`description`** — used as the meta description and Open Graph
  description. Aim for 140–160 characters.
- **`slug`** — must match the filename. Lowercase, hyphens only.
- **`publishedAt` / `updatedAt`** — ISO dates. `updatedAt` is what the
  sitemap uses for `lastmod`; bump it whenever you meaningfully change
  the content.
- **`coverImage` / `coverAlt`** — place the image under `public/` and
  reference it with a leading slash. Alt text is required for a11y and
  image SEO.
- **`tags`** — one post is "related" to another when they share at
  least one tag. Up to three related posts are shown at the bottom.
- **`lang`** — must match the parent folder (`en` or `ar`). When a post
  with the same slug exists in both locales, hreflang tags are emitted
  automatically.
- **`relatedWatches`** — optional. Reserved for future use inside the
  end-of-article CTA; safe to include today.
- **`faq`** — when present, renders a FAQ section at the end of the
  article and emits `FAQPage` JSON-LD.
- **`draft`** — when `true`, the post is excluded from build, sitemap
  and RSS feed. It is also not routable in production.

## Body

Standard Markdown, GitHub-flavored where relevant. Use `##` for section
headings; they populate the table of contents. Use `###` for subsections.

Internal links are plain Markdown links: `[collection](/en#collection)`.
They render as crawlable `<a>` tags.

Images inside the body render lazy-loaded via `<img loading="lazy">`.
Prefer webp/avif source files; the browser handles decoding.

## Embedded components (shortcodes)

### `[[watch-cta:<variant>]]`

Mid-article single-watch card. Variants: `black`, `steel`, `gold`.
Renders the watch photo, "The Palm Collection · 1 of 1", price and a
link to `/#collection`. Locale is picked up automatically.

Rules:

- The shortcode **must be on its own line**, with blank lines above
  and below.
- Nothing else on the line — no leading/trailing text, no other
  Markdown syntax.
- Case-sensitive lowercase variant name.

```md
Some paragraph before the CTA.

[[watch-cta:steel]]

Some paragraph after.
```

If the shortcode is not on its own line (e.g. inline `[[watch-cta:x]]`),
it is treated as plain text and rendered as-is. Fix by moving it to a
new paragraph.

### End-of-article three-watches block

Rendered automatically by the article template after the body and the
FAQ. You do not need to reference it in Markdown.

## Preview locally

```bash
npm run dev
# EN: http://localhost:3000/en/blog
# AR: http://localhost:3000/ar/blog
# Post: http://localhost:3000/en/blog/<slug>
```

Drafts are hidden. To preview a draft, temporarily flip `draft: false`
(and remember to flip it back before committing).

## What is generated automatically

- Unique `<title>` and meta description per post
- Canonical URL and hreflang alternates (only when the counterpart
  locale post exists and is not a draft)
- Open Graph + Twitter card with the cover image
- `BlogPosting` + `BreadcrumbList` JSON-LD, plus `FAQPage` when `faq`
  is set
- `sitemap.xml` entry with `lastmod = updatedAt`
- RSS feed at `/en/blog/rss.xml` and `/ar/blog/rss.xml`
- Reading time (based on word count)
- Table of contents from `##` headings

## What you should NOT add

- Event schema for events you do not organise
- Any invented facts, dates or prices
- Cover images without alt text
- Draft flags left on posts you meant to publish
