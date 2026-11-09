export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

// The Chairman, named by Brent (2026-11-09). The About page prints his letter above the team.
export const chairman = {
  name: 'Marlin Blando',
  role: 'Chairman of the Board',
  initials: 'MB',
  letter: [
    'Dear stakeholders,',
    'When I joined Bland Website as Chairman, I asked the team one question. What do we stand for? After a long silence, the Jack Russell left the room, and that is when I knew we had a culture.',
    'Our industry is changing at the speed of change. Websites are being disrupted, reimagined and, in some cases, launched. Through it all, Bland Website has stayed the course, and the course has stayed exactly where we left it.',
    'I am proud of what this team has built. I have seen the homepage twice, and both times it loaded.',
    'Looking ahead, we will continue to leverage our core competencies to deliver value at scale. I do not know what our core competencies are. I am told they are core.',
  ],
  signOff: 'Onward, and moderately upward,',
};

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
