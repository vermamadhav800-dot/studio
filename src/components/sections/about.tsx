'use client';

import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import TiltedCard from '../ui/tilted-card';

const workExperience = [
  {
    icon: <Briefcase className="h-5 w-5" />,
    role: 'Lead Frontend Engineer',
    company: 'Vercel',
    period: '2023 - Present',
    tags: ['Next.js', 'React', 'TypeScript', 'Edge'],
    description: 'Leading the development of a next-generation deployment platform. Focused on performance, developer experience, and building a more open web.',
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    role: 'Senior Software Engineer',
    company: 'Stripe',
    period: '2021 - 2023',
    tags: ['React', 'API Design', 'Ruby', 'Payments'],
    description: 'Engineered robust payment APIs and developer-facing tools. Contributed to core infrastructure and improved system reliability for millions of users.',
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    role: 'Frontend Developer',
    company: 'Shopify',
    period: '2019 - 2021',
    tags: ['React', 'GraphQL', 'Performance'],
    description: 'Built and optimized high-traffic e-commerce features, focusing on storefront performance and creating seamless user experiences for merchants and customers.',
  },
];

const education = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    degree: 'M.S. in Computer Science',
    institution: 'Stanford University',
    period: '2017 - 2019',
    tags: ['AI', 'HCI', 'Systems Design'],
    description: 'Thesis on real-time data visualization for large-scale systems. Awarded for academic excellence and contributions to open-source projects.',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    degree: 'B.S. in Software Engineering',
    institution: 'University of California, Berkeley',
    period: '2013 - 2017',
    tags: ['Data Structures', 'Algorithms', 'Web Dev'],
    description: 'Graduated with honors. Led a team to win the annual hackathon with a project focused on decentralized identity verification.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const TimelineItem = ({ item, index }: { item: (typeof workExperience)[0] | (typeof education)[0]; index: number }) => (
  <motion.div
    className="relative pl-12"
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="absolute left-0 top-1">
      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          {item.icon}
        </div>
      </div>
    </div>
    <TiltedCard>
      <div
        className="p-6 transition-all duration-300 h-full"
      >
        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4" />
          {item.period}
        </p>
        <h3 className="font-bold text-lg text-foreground mb-1">
          {'role' in item ? item.role : item.degree}
        </h3>
        <p className="text-sm text-primary font-medium mb-3">
          {'company' in item ? item.company : item.institution}
        </p>
        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/5 border-primary/20 text-primary/80">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </TiltedCard>
  </motion.div>
);

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            About Me
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            My journey through code and academia.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Work Experience Column */}
          <div>
            <h3 className="text-2xl font-bold mb-10 flex items-center justify-center lg:justify-start gap-3 font-headline text-foreground">
              <Briefcase className="text-primary" /> Work Experience
            </h3>
            <div className="relative flex flex-col gap-10">
              <div className="absolute left-[15px] top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
              {workExperience.map((job, index) => (
                <TimelineItem key={`work-${index}`} item={job} index={index} />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-bold mb-10 flex items-center justify-center lg:justify-start gap-3 font-headline text-foreground">
              <GraduationCap className="text-primary" /> Education
            </h3>
            <div className="relative flex flex-col gap-10">
              <div className="absolute left-[15px] top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
              {education.map((edu, index) => (
                <TimelineItem key={`edu-${index}`} item={edu} index={index + workExperience.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
