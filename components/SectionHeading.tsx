'use client';

import { m } from 'framer-motion';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
};

const SectionHeading = ({ id, eyebrow, title }: Props) => (
  <div className="text-center mb-10 md:mb-16">
    <m.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-3"
    >
      {eyebrow}
    </m.p>
    <m.h2
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary"
    >
      {title}
    </m.h2>
  </div>
);

export default SectionHeading;
