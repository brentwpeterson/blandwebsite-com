/**
 * Global site metadata and navigation.
 */
export const site = {
  name: 'Bland Website',
  tagline: 'Innovative solutions for a fast-paced digital landscape. Whatever that means.',
  description:
    'Bland Website delivers innovative, best-in-class solutions to forward-thinking stakeholders. We are not sure what that means either.',
  // 555-0100 is a reserved fictional number. It will not ring.
  phone: '+1 (555) 555-0100',
  address: '404 Nowhere Lane · Anytown, USA',
  url: 'https://blandwebsite.com',
  humanUrl: 'https://contentcucumber.com/',
  // Sponsor line at the top of every post. The page is RequestDesk's headless
  // blog hosting for Astro, the service this blog runs on.
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
  { label: 'Contact', href: '/contact/' },
];
