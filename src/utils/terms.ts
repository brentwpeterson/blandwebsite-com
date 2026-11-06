/**
 * The over-used AI terms list (shown on /best-used-ai-terms/), read from RequestDesk's public content-terms
 * feed at build time (the same feed requestdesk.ai/over-used-ai-terms uses).
 * The list refreshes on every build, and every published post triggers one.
 *
 * A failed fetch FAILS THE BUILD, the same as the blog: a page that silently
 * shows zero terms looks like a page with nothing to say.
 */

export interface Term {
  id: string;
  term: string;
  category: string;
  description: string;
}

interface RawTerm {
  id: string;
  term?: string;
  match_type?: string | null;
  category?: string | null;
  description?: string | null;
  context?: string | null;
}

function env(name: string): string {
  const value = import.meta.env[name] || process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. The over-used terms page reads RequestDesk at build time.`);
  }
  return value;
}

// Regex and semantic rules are patterns for a checker, not words a reader can scan.
const READABLE = new Set(['term', 'phrase']);

let cache: Promise<Term[]> | undefined;

/** Every readable over-used term, sorted by category then term. Fetched once per build. */
export function getOverusedTerms(): Promise<Term[]> {
  cache ??= (async () => {
    const base = env('BACKEND_URL').replace(/\/$/, '');
    // The agent key is optional on this endpoint; it raises the rate limit.
    const key = env('AGENT_API_KEY');
    const raw: RawTerm[] = [];
    let page = 1;
    let pages = 1;
    do {
      const url = `${base}/api/public/content-terms?term_type=avoid&limit=100&page=${page}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      if (!res.ok) {
        throw new Error(`RequestDesk content-terms fetch failed: HTTP ${res.status} on ${url}: ${(await res.text()).slice(0, 300)}`);
      }
      const body = await res.json();
      if (!Array.isArray(body?.terms)) {
        throw new Error(`RequestDesk content-terms returned no terms array on ${url}`);
      }
      raw.push(...body.terms);
      pages = body.pagination?.pages ?? 1;
      page++;
    } while (page <= pages);

    const terms = raw
      .filter((t) => t.term && (!t.match_type || READABLE.has(t.match_type)))
      .map((t) => ({
        id: t.id,
        term: t.term!.trim(),
        category: t.category?.trim() || 'Uncategorized',
        description: (t.description || t.context || '').trim(),
      }));
    if (terms.length === 0) {
      throw new Error('RequestDesk content-terms returned no readable terms; refusing to build an empty page.');
    }
    return terms.sort((a, b) => a.category.localeCompare(b.category) || a.term.localeCompare(b.term));
  })();
  return cache;
}
