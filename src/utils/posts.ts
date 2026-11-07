import { getCollection, type CollectionEntry } from 'astro:content';
import { readingTime } from './reading-time';

/**
 * One list of blog posts from two sources:
 *  - Markdown files in src/content/blog (the launch posts)
 *  - RequestDesk, through the astro-proxy API, scoped to the "Bland Website"
 *    agent whose key is AGENT_API_KEY. Posts published there show up on the
 *    next build; publishing from RequestDesk triggers the Amplify webhook.
 *
 * A missing key or a failed API call FAILS THE BUILD. A blog that silently
 * drops every RequestDesk post looks identical to one with no posts, so the
 * build stops instead and Amplify keeps serving the last good deploy.
 */

export interface QaPair {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  readingTime: string;
  source: 'markdown' | 'requestdesk';
  /** Markdown posts render through astro:content */
  entry?: CollectionEntry<'blog'>;
  /** RequestDesk posts arrive as HTML */
  html?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  /** Shown under the post and marked up as FAQPage. Never empty: a post without one fails the build. */
  qa: QaPair[];
  /** Markdown posts: the AI and exact model that wrote it. RequestDesk posts carry the byline in their HTML. */
  writtenBy?: { llm: string; model: string };
}

interface RdPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  categories?: string[];
  featured_image?: string;
  featured_image_alt?: string;
  seo_description?: string;
  published_at?: string | null;
  updated_at?: string | null;
}

function env(name: string): string {
  const value = import.meta.env[name] || process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. The blog reads RequestDesk at build time; put ${name} in .env locally or in the Amplify branch environment.`,
    );
  }
  return value;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const decodeEntities = (s: string) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

/**
 * RequestDesk posts carry their Q&A at the end of the HTML as
 * <section class="aw-qa" data-qa><h2>…</h2><h3>question</h3><p>answer</p>…</section>
 * (written by .claude/local/bland-autopost.py). The section is taken out of the body
 * and the post page renders it, the same as a Markdown post's frontmatter qa.
 */
function splitQa(html: string): { body: string; qa: QaPair[] } {
  const m = html.match(/<section[^>]*\bdata-qa\b[^>]*>([\s\S]*?)<\/section>/i);
  if (!m) return { body: html, qa: [] };
  const qa: QaPair[] = [];
  for (const pair of m[1].matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    qa.push({ question: decodeEntities(stripHtml(pair[1])), answer: decodeEntities(stripHtml(pair[2])) });
  }
  return { body: html.replace(m[0], ''), qa };
}

async function fetchRequestDeskPosts(): Promise<RdPost[]> {
  const key = env('AGENT_API_KEY');
  const base = env('BACKEND_URL').replace(/\/$/, '');
  const all: RdPost[] = [];
  let page = 1;
  let pages = 1;
  do {
    const url = `${base}/api/astro-proxy/blog-posts?page=${page}&limit=50&status=publish`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
    if (!res.ok) {
      throw new Error(`RequestDesk blog fetch failed: HTTP ${res.status} on ${url}: ${(await res.text()).slice(0, 300)}`);
    }
    const body = await res.json();
    if (!body?.data?.posts) {
      throw new Error(`RequestDesk blog fetch returned no data.posts on ${url}`);
    }
    all.push(...body.data.posts);
    pages = body.data.pagination?.pages ?? 1;
    page++;
  } while (page <= pages);
  return all.filter((p) => p.slug);
}

/** The AI and model from a RequestDesk post's "Written by <AI> (<model>)" byline. */
function bylineAuthor(html: string): Post['writtenBy'] {
  const m = /class="aw-ai-byline"[^>]*>Written by ([^<(]+?)\s*\(([^)<]+)\)/.exec(html);
  return m ? { llm: decodeEntities(m[1].trim()), model: decodeEntities(m[2].trim()) } : undefined;
}

function fromRequestDesk(p: RdPost): Post {
  const { body, qa } = splitQa(p.content ?? '');
  const text = stripHtml(body);
  const description = p.excerpt || p.seo_description || text.slice(0, 160);
  return {
    slug: p.slug,
    title: p.title,
    description,
    pubDate: new Date(p.published_at ?? Date.now()),
    updatedDate: p.updated_at ? new Date(p.updated_at) : undefined,
    tags: p.tags?.length ? p.tags : (p.categories ?? []),
    readingTime: readingTime(text),
    source: 'requestdesk',
    html: body,
    featuredImage: p.featured_image || undefined,
    featuredImageAlt: p.featured_image_alt || p.title,
    qa,
    writtenBy: bylineAuthor(body),
  };
}

function fromMarkdown(entry: CollectionEntry<'blog'>): Post {
  return {
    slug: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.pubDate,
    updatedDate: entry.data.updatedDate,
    tags: entry.data.tags,
    readingTime: readingTime(entry.body ?? ''),
    source: 'markdown',
    entry,
    featuredImage: entry.data.image,
    featuredImageAlt: entry.data.imageAlt,
    qa: entry.data.qa,
    writtenBy: entry.data.writtenBy,
  };
}

let cache: Promise<Post[]> | undefined;

/** Every post, newest first. Fetched once per build. */
export function getAllPosts(): Promise<Post[]> {
  cache ??= (async () => {
    const [local, remote] = await Promise.all([getCollection('blog'), fetchRequestDeskPosts()]);
    const posts = [...local.map(fromMarkdown), ...remote.map(fromRequestDesk)];
    const seen = new Set<string>();
    for (const p of posts) {
      if (seen.has(p.slug)) {
        throw new Error(`Duplicate blog slug "${p.slug}" between Markdown and RequestDesk. Rename one.`);
      }
      seen.add(p.slug);
      // Every post ships with Q&A and FAQPage (Brent, 2026-11-05 and 2026-11-06).
      // Every post is signed with the AI and the exact model that wrote it (Brent, 2026-11-06).
      // The same AI and model are the BlogPosting author in the structured data.
      if (!p.writtenBy) {
        throw new Error(`Blog post "${p.slug}" (${p.source}) has no "Written by <AI> (<model>)" byline.`);
      }
      if (p.qa.length === 0) {
        throw new Error(
          `Blog post "${p.slug}" (${p.source}) has no Q&A. Add qa to its frontmatter, or a <section data-qa> to its RequestDesk HTML.`,
        );
      }
    }
    return posts.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  })();
  return cache;
}
