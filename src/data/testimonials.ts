export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Bland Website transformed our business. I cannot tell you how, because nobody told me either, but the slides were incredible.',
    name: 'Sarah J.',
    role: 'Not a customer. Possibly not Sarah.',
    initials: 'SJ',
  },
  {
    quote: 'Five stars. I went to the website and it was there. That is all I ask from a website.',
    name: 'A Visitor',
    role: 'Visited once, by accident',
    initials: 'AV',
  },
  {
    quote: 'I submitted the contact form in March. I am still waiting. I have never felt so seen.',
    name: 'Valued Customer',
    role: 'Holding since March',
    initials: 'VC',
  },
];
