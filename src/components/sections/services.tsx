'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Code, Palette, MonitorSmartphone } from 'lucide-react';
import ServiceCard from '@/components/ui/service-card';
import TextPressure from '../ui/text-pressure';

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
      <div className="text-center mb-16 h-24">
        <TextPressure text="What I Do" minFontSize={48} />
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
