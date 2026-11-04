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

function fromRequestDesk(p: RdPost): Post {
  const text = stripHtml(p.content ?? '');
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
    html: p.content ?? '',
    featuredImage: p.featured_image || undefined,
    featuredImageAlt: p.featured_image_alt || p.title,
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
    }
    return posts.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  })();
  return cache;
}
