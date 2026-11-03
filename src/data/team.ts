export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    name: 'The Jack Russell',
    role: 'Founder & Chief Executive',
    bio: 'Appears in every photo on this site. Has never read a slide deck. Has excellent instincts about squirrels.',
    initials: 'JR',
  },
  {
    name: 'The AI',
    role: 'Head of Content',
    bio: 'Wrote every word you are reading. Has read every About Us page on the internet and kept the worst parts.',
    initials: 'AI',
  },
  {
    name: 'A Stock Photo Person',
    role: 'Director of High Fives',
    bio: 'Shows up for team photos, leaves before the meeting. Has been laughing at a salad since 2009.',
    initials: 'SP',
  },
  {
    name: 'Placeholder Name',
    role: 'VP of Lorem Ipsum',
    bio: 'Bio coming soon. Bio has been coming soon since launch.',
    initials: 'PN',
  },
];

export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: 'Mission',
    description: 'To empower stakeholders to leverage solutions. We are still working out which ones.',
  },
  {
    title: 'Vision',
    description: 'A world where every company has a website. We checked, and that world is here.',
  },
  {
    title: 'Values',
    description: 'Integrity, Innovation, Excellence. We picked them from a dropdown.',
  },
];
