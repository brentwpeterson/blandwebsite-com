export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'per month, forever',
    description: 'Everything you need to get started, if what you need is nothing.',
    features: ['Access to this website', 'Unlimited scrolling', 'One (1) free buzzword'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$0',
    period: 'per month, but in a nicer font',
    description: 'Our most popular plan, because it is in the middle and has a badge.',
    features: [
      'Everything in Starter',
      'The badge',
      'Priority access to the contact form that sends nothing',
      'A sense of momentum',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Call',
    period: 'the number does not work',
    description: 'For organizations that need the same thing, with more meetings.',
    features: ['Everything in Professional', 'A dedicated account synergist', 'Quarterly business reviews of nothing'],
    highlighted: false,
  },
];
