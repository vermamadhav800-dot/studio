'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import ProfileCard from '@/components/ui/ProfileCard';
import DarkVeil from '../ui/DarkVeil';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <DarkVeil 
        speed={0.8}
        hueShift={240}
        noiseIntensity={0.03}
        scanlineIntensity={0.05}
        scanlineFrequency={200}
        warpAmount={0.2}
      />
      <div className="relative z-10 container flex flex-col-reverse items-center gap-12 text-center lg:flex-row lg:text-left">
        <div className="flex-1 lg:w-7/12 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter text-foreground">
            Madhav Verma
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl lg:mx-0">
            A passionate and creative Full-Stack Developer with a knack for building beautiful, user-friendly, and efficient web applications. I thrive on turning complex problems into simple, elegant solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#projects">View My Work</Link>
            </Button>
          </div>
        </div>
        <div className="flex-shrink-0 lg:w-5/12 flex justify-center lg:justify-end">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          >
            <ProfileCard
              name="Madhav Verma"
              title="Full-Stack Developer"
              handle="madhavverma"
              status="Available for hire"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjQyMjAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
