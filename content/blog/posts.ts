export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: 'welcome',
    title: 'Welcome to the Journal',
    date: '2026-09-12',
    excerpt:
      'Why this journal exists and what you will find here — notes on movements, cases, and the small details worth knowing before you wear one.',
    body: `Every watch in this collection has been chosen by hand, from Dubai. The Journal is where I write about the **movements** inside, the finishing, and the small details worth knowing before you wear one.

This is not a catalogue. It is a slow record of what makes a well-executed Seiko Mod worth its price:

- the depth of a good *frosted* finish
- the tolerances of the [NH72A caliber](https://calibercorner.com/tmi-caliber-nh72a/)
- the balance of an integrated bracelet under Dubai heat

New notes appear when there is something worth saying. No SEO fluff, no filler.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
