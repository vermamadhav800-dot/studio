'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Code, Palette, MonitorSmartphone } from 'lucide-react';
import ServiceCard from '@/components/ui/service-card';

const services = [
  {
    icon: <Palette className="h-10 w-10" />,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and visually appealing user interfaces that enhance user satisfaction and engagement. From wireframes to high-fidelity prototypes.',
  },
  {
    icon: <MonitorSmartphone className="h-10 w-10" />,
    title: 'Web Design',
    description: 'Creating modern and responsive websites from scratch. I focus on clean, elegant designs that are optimized for all devices and screen sizes.',
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: 'Web Development',
    description: 'Building robust and scalable full-stack web applications. I use modern technologies to deliver high-performance, secure, and maintainable code.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Services() {
  return (
    <Section id="services" className="overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          What I Do
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
          I specialize in creating beautiful and functional web experiences.
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </motion.div>
    </Section>
  );
}
