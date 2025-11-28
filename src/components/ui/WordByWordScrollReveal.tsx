
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type WordByWordScrollRevealProps = {
  text: string;
  className?: string;
};

export const WordByWordScrollReveal = ({ text, className }: WordByWordScrollRevealProps) => {
  const targetRef = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const words = text.split(' ');

  return (
    <p ref={targetRef} className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className="mr-2" // Adjust spacing between words
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};
