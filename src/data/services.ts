export interface Service {
  title: string;
  description: string;
  details: string[];
  format: string;
}

export const services: Service[] = [
  {
    title: 'Seamless Integration',
    description: 'We integrate things. Seamlessly. Please do not ask which things.',
    details: ['Plug-and-play synergy', 'Works with your existing stack, in theory', 'Zero downtime, zero uptime'],
    format: 'Ongoing · Vibes-based',
  },
  {
    title: 'Scalable Growth',
    description: 'This website can comfortably handle up to several visitors at once.',
    details: ['Built for scale', 'Scale not included', 'Growth measured in good feelings'],
    format: 'Quarterly · Hockey stick pending',
  },
  {
    title: '24/7 Support',
    description: 'Our chatbot is available around the clock to tell you it did not understand the question.',
    details: ['Always on', 'Never helpful', 'Staffed by one Jack Russell in a headset'],
    format: 'Round the clock · Hold music forever',
  },
  {
    title: 'Digital Transformation',
    description: 'We will transform your business into a digital version of the same business.',
    details: ['Same business, now online', 'Slides with arrows on them', 'A roadmap with no dates'],
    format: '18-month engagement · Results TBD',
  },
  {
    title: 'Thought Leadership',
    description: 'We have thoughts. We are leading with them. This is one of them.',
    details: ['Insights', 'Learnings', 'Takeaways, key'],
    format: 'Weekly · On LinkedIn, sadly',
  },
  {
    title: 'Pricing Strategy',
    description: 'Contact us for pricing. There is no pricing.',
    details: ['Custom quotes', 'Custom silence', 'Value-based, mostly the value of your time'],
    format: 'By request · Never answered',
  },
];
