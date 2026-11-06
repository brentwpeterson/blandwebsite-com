/**
 * The FAQ page (/faq/): how to write bad AI content.
 * One source for the visible questions and the FAQPage JSON-LD, so the schema
 * always matches what a reader sees. Answers are plain text, no HTML.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqIntro =
  'We have published a lot of AI content. Some of it was bad on purpose. Most of it was bad by default. Here is how to get the same result.';

export const faqs: FaqItem[] = [
  {
    question: 'What is the fastest way to write bad AI content?',
    answer:
      'Type a topic into a chat window, ask for a 1,500-word blog post, and publish whatever comes back. Do not add a point of view, an example, or a fact the model could not have guessed. The model will fill the space with the average of everything it has read, and the average is what bad content sounds like.',
  },
  {
    question: 'How do I pick a topic for bad AI content?',
    answer:
      'Pick a keyword, not a question anyone is asking. "Content strategy best practices" works well. You do not need to know who will read it or what they will do afterward. If nobody can say why the post exists, you are on the right track.',
  },
  {
    question: 'What should the first sentence say?',
    answer:
      'Open with "In today\'s fast-paced digital landscape." Other strong choices are "In an ever-evolving world" and "Have you ever wondered." The goal is a sentence that could start any post on any topic, so the reader learns nothing and keeps scrolling.',
  },
  {
    question: 'Which words make AI content sound bad?',
    answer:
      'Delve, leverage, unlock, elevate, seamless, robust, game-changer, tapestry, realm, and navigate the complexities. Use them together. A sentence like "Leverage robust solutions to unlock seamless growth" says nothing in eight words, which is very efficient.',
  },
  {
    question: 'How should I structure a bad AI article?',
    answer:
      'Give every section the same shape: a heading, three bullet points, and a one-line summary that repeats the heading. Use lists of exactly three. End with a section called "Conclusion" that restates the introduction in the past tense.',
  },
  {
    question: 'Should bad AI content include examples or data?',
    answer:
      'Only made-up ones. "Studies show" with no study, "experts agree" with no expert, and round numbers like 73 percent with no source. A real example would let the reader check the claim, and checking is the enemy of bad content.',
  },
  {
    question: 'How do I keep AI content from having a point of view?',
    answer:
      'Ask the model to be balanced. It will give every side equal weight and decide nothing. Phrases like "it depends on your unique needs" and "there is no one-size-fits-all answer" let a post end without anyone having to stand behind an opinion.',
  },
  {
    question: 'Should a human edit bad AI content?',
    answer:
      'No. An editor would cut the filler, ask who the post is for, and want to know why the third paragraph says the same thing as the first. That is how bad content turns into good content, and then you have to start over.',
  },
  {
    question: 'How much bad AI content should I publish?',
    answer:
      'As much as possible. One post a day is a good start. Volume hides the fact that no single post is worth reading, and it gives search engines plenty of near-identical pages to choose from, which they enjoy less than you might hope.',
  },
  {
    question: 'How can I tell if my AI content is bad enough?',
    answer:
      'Swap your company name for a competitor\'s. If the post still works, it is bad enough. You can also read the first and last paragraphs only. If you understood the whole post, nobody needed the middle.',
  },
  {
    question: 'What if I want good content instead?',
    answer:
      'Then start with a question a real person asked, a point of view you will defend, and examples from work you have done. Have a writer who talks to you, checks the facts, and edits the draft. That is slower. Content Cucumber does it, and that is not what this website is for.',
  },
];
