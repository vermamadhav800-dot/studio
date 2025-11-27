'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Code, Palette, MonitorSmartphone } from 'lucide-react';
import CardSwap, { Card } from '@/components/ui/CardSwap';
import '@/components/ui/CardSwap.css';

const services = [
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and visually appealing user interfaces that enhance user satisfaction and engagement. From wireframes to high-fidelity prototypes.',
  },
  {
    icon: <MonitorSmartphone className="h-10 w-10 text-primary" />,
    title: 'Web Design',
    description: 'Creating modern and responsive websites from scratch. I focus on clean, elegant designs that are optimized for all devices and screen sizes.',
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'Building robust and scalable full-stack web applications. I use modern technologies to deliver high-performance, secure, and maintainable code.',
  },
];

export default function Services() {
  return (
    <Section id="services" className="overflow-hidden relative min-h-[90vh]">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              What I Do
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
              I specialize in creating beautiful and functional web experiences, blending design and development to bring ideas to life.
            </p>
          </motion.div>
          
          <div className="relative w-full min-h-[500px]">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={3000}
              pauseOnHover={true}
              skewAmount={8}
              easing="elastic"
            >
              {services.map((service, index) => (
                <Card key={index} customClass="p-8 flex flex-col items-center justify-center text-center bg-card/80 backdrop-blur-lg border-primary/20">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold font-headline text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </Section>
  );
}
