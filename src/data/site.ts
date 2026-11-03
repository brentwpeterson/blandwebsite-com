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
  { label: 'Contact', href: '/contact/' },
];
