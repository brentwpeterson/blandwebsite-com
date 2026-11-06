import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog content collection (Content Layer).
 * Posts live as Markdown files in src/content/blog and are rendered by the
 * routes under src/pages/blog/. Extend the schema here whenever a post needs
 * a new frontmatter field (e.g. author, heroImage).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // ISO date string in frontmatter, e.g. 2026-10-21
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Featured image under public/, e.g. /blog/<slug>.jpg. Every post has one (Brent, 2026-11-04).
    image: z.string(),
    imageAlt: z.string(),
    // Every post is signed with the AI and the exact model that wrote it (Brent, 2026-11-06).
    writtenBy: z.object({ llm: z.string().min(1), model: z.string().min(1) }),
    // Q&A shown under the post and marked up as FAQPage. Every post has at least one (Brent, 2026-11-06).
    qa: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
  }),
});

export const collections = { blog };
