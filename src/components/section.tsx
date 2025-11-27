import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('w-full py-16 md:py-24 lg:py-32', className)}>
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
}
