
'use client';

import React from 'react';
import { Section } from '@/components/section';
import ContactForm from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'alex.doe@example.com',
    href: 'mailto:alex.doe@example.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '555-123-4567',
    href: 'tel:555-123-4567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function Contact() {
  const handleContactClick = (value: string, isEmail?: boolean) => {
    if (isEmail) {
      navigator.clipboard.writeText(value);
      // You might want to add a toast notification here
      console.log('Email copied to clipboard');
    }
  };

  return (
    <Section id="contact" className="bg-muted overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl opacity-50"></div>
      </div>
      <div className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Get In Touch</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                }
              }
            }}
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                className="flex items-start gap-4 group"
              >
                <div className="relative p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <div className="absolute -inset-0.5 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <item.icon className="relative h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <a
                    href={item.href}
                    onClick={() => handleContactClick(item.value, item.label === 'Email')}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    {item.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
