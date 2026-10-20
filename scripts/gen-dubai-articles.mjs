#!/usr/bin/env node
/**
 * Генератор SEO-статей для dubaiwatchstore.ae.
 *
 * Вход:  data/dubai-articles.json  (массив объектов статей)
 * Выход: content/blog/en/<slug>.md (по одному Markdown-файлу на статью)
 *
 * Структура каждой статьи:
 *   - frontmatter (title, description, slug, dates, cover, tags, FAQ)
 *   - lede-абзац
 *   - H2-секции с телом
 *   - FAQ раздел (рендерится ещё и в JSON-LD через стандартный блог-loader)
 *
 * Запуск: `node scripts/gen-dubai-articles.mjs`
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data', 'dubai-articles.json'), 'utf8'),
);
const TODAY = new Date().toISOString().slice(0, 10);

function esc(s) {
  return String(s).replace(/"/g, '\\"');
}
function yamlList(arr) {
  return `[${arr.map((x) => `"${esc(x)}"`).join(', ')}]`;
}

function buildMd(a) {
  const fm = [
    '---',
    `title: "${esc(a.title)}"`,
    a.seoTitle ? `seoTitle: "${esc(a.seoTitle)}"` : null,
    `description: "${esc(a.description)}"`,
    `slug: "${a.slug}"`,
    `publishedAt: "${TODAY}"`,
    `updatedAt: "${TODAY}"`,
    `author: "Pavel"`,
    `coverImage: "/hero-watch.jpg"`,
    `coverAlt: "${esc(a.coverAlt || a.title)}"`,
    `tags: ${yamlList(a.tags || ['dubai', 'guide'])}`,
    `lang: "en"`,
    `relatedWatches: ["black", "steel", "gold"]`,
    `draft: false`,
    a.faq && a.faq.length > 0 ? 'faq:' : null,
    ...(a.faq || []).flatMap((qa) => [`  - q: "${esc(qa.q)}"`, `    a: "${esc(qa.a)}"`]),
    '---',
    '',
  ]
    .filter((x) => x !== null)
    .join('\n');

  const body = [
    a.intro,
    '',
    ...a.sections.flatMap((s) => [`## ${s.h2}`, '', s.body, '']),
  ].join('\n');

  return fm + body + '\n';
}

const outDir = path.join(ROOT, 'content', 'blog', 'en');
fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const a of DATA) {
  const fp = path.join(outDir, `${a.slug}.md`);
  fs.writeFileSync(fp, buildMd(a), 'utf8');
  count++;
}
console.log(`✓ Сгенерировано ${count} статей → content/blog/en/`);
