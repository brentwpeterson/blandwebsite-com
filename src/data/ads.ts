/**
 * House ads for Content Cucumber, the humans behind this site (Brent, 2026-11-08).
 * The AdSlot component (in BaseLayout, so on every page) shows one ad, picked at
 * random on each page load. Add, edit or remove ads here; nothing else changes.
 * Every claim comes from contentcucumber.com itself (footer, homepage, pricing).
 */
export interface Ad {
  /** Short and stable, used in the link's utm_content and the GA4 event. */
  id: string;
  headline: string;
  body: string;
  cta: string;
  /** A contentcucumber.com page. UTM tags are added by AdSlot. */
  href: string;
}

export const ads: Ad[] = [
  {
    id: 'human-words',
    headline: 'Want words a human wrote?',
    body: 'Content Cucumber writers are real people. Fresh, high-quality content delivered weekly to grow your brand.',
    cta: 'Meet the writers',
    href: 'https://contentcucumber.com/our-creators/',
  },
  {
    id: 'pangram-99',
    headline: 'Our homepage scored 99% human on Pangram',
    body: 'People wrote it, and the AI detector agrees. Content Cucumber writes your content the same way.',
    cta: 'Read it yourself',
    href: 'https://contentcucumber.com/',
  },
  {
    id: 'money-back',
    headline: 'Try human writers for 14 days',
    body: 'Content Cucumber comes with a 14-day money-back guarantee.',
    cta: 'See pricing',
    href: 'https://contentcucumber.com/pricing/',
  },
  {
    id: 'our-work',
    headline: 'See what humans wrote for real brands',
    body: 'Case studies, blogs and site copy from the Content Cucumber writers.',
    cta: 'See our work',
    href: 'https://contentcucumber.com/our-work/',
  },
];

export const adUtm = { source: 'blandwebsite', medium: 'house-ad', campaign: 'cc-for-humans' } as const;
