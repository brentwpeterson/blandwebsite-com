/**
 * Global site metadata and navigation.
 */
export const site = {
  name: 'Bland Website',
  tagline: 'Innovative solutions for a fast-paced digital landscape. Whatever that means.',
  description:
    'Bland Website delivers innovative, best-in-class solutions to forward-thinking stakeholders. We are not sure what that means either.',
  // Content Cucumber's real address and phone, the same as its footer (Brent, 2026-11-08).
  // Calls reach the humans at Content Cucumber.
  phone: '+1-808-210-3611',
  address: '1400 Van Buren St. NE, Suite 200 · Minneapolis, MN 55413',
  postalAddress: {
    streetAddress: '1400 Van Buren St. NE, Suite 200',
    addressLocality: 'Minneapolis',
    addressRegion: 'MN',
    postalCode: '55413',
    addressCountry: 'US',
  },
  url: 'https://blandwebsite.com',
  humanUrl: 'https://contentcucumber.com/',
  // The RequestDesk sponsor banner at the top of every post (SponsorBanner.astro) links here,
  // RequestDesk's Astro blog hosting page. The blog's posts come from RequestDesk.
  sponsorUrl: 'https://requestdesk.ai/solutions/astro-blog-hosting/',
  // The contact form posts to this HubSpot form (portal 39487190, form
  // "BlandWebsite-Contact", created 2026-11-03). Submissions reach the
  // Content Cucumber team as HubSpot contacts with campaign_code blandwebsite-contact.
  hubspot: { portalId: '39487190', formId: '4f0c99bf-27b3-42da-a434-e6d5aba018bc' },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'The Experiment', href: '/experiment/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];
