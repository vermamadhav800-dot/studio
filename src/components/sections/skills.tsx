import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import ScrollReveal from '../ui/ScrollReveal';

const skills = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'GraphQL',
  'PostgreSQL',
  'Docker',
  'UI/UX Design',
  'Web Design',
  'Tailwind CSS',
  'Figma',
  'Server Actions',
];

export default function Skills() {
  return (
    <Section id="skills">
      <div className="text-center mb-12">
        <ScrollReveal
          containerClassName='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline'
          textClassName='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline'
          baseRotation={0}
          enableBlur={false}
          baseOpacity={0}
          >
          Skills & Expertise
        </ScrollReveal>
        <ScrollReveal
          containerClassName='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4'
          textClassName='mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4'
          baseRotation={0}
          enableBlur={false}
          baseOpacity={0}
        >
          My technical toolkit for building modern web experiences.
        </ScrollReveal>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-lg px-4 py-2 rounded-full transition-transform hover:scale-105">
            {skill}
          </Badge>
        ))}
      </div>
    </Section>
  );
}
