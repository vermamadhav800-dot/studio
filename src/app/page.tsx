'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CircularGallery from '@/components/ui/CircularGallery';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Twitter, Youtube, MapPin, Calendar, Users, Zap, Trophy, Timer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'MEMBERS', value: '1500+', icon: Users },
  { label: 'CITIES', value: '35', icon: MapPin },
  { label: 'KM COVERED', value: '42K+', icon: Trophy },
  { label: 'RUNS', value: '500+', icon: Zap },
];

const schedule = [
  { day: 'MON', time: '06:00 AM', location: 'Central Park', type: 'Intervals' },
  { day: 'WED', time: '06:30 PM', location: 'Marina Bay', type: 'Tempo Run' },
  { day: 'FRI', time: '06:00 AM', location: 'Track Field', type: 'Speed Work' },
  { day: 'SUN', time: '05:30 AM', location: 'City Square', type: 'Long Run' },
];

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
    <Link href="/" className={cn("text-2xl font-black tracking-tighter text-white", fontHeading.className)}>
      C9 CLUB
    </Link>
    <div className="hidden md:flex items-center gap-12 text-[10px] font-black tracking-[0.2em] text-white/60">
      <Link href="#about" className="hover:text-primary transition-colors">VISION</Link>
      <Link href="#schedule" className="hover:text-primary transition-colors">SCHEDULE</Link>
      <Link href="#gallery" className="hover:text-primary transition-colors">VAULT</Link>
      <Link href="#join" className="group flex items-center gap-2 text-white">
        JOIN SQUAD <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </nav>
);

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image 
          src={PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || ''}
          alt="Hero Running"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-primary font-black tracking-[0.3em] text-[10px] mb-4 block">ESTABLISHED 2024</span>
          <h1 className={cn("text-7xl md:text-[14vw] leading-[0.85] font-black text-white mix-blend-difference", fontHeading.className)}>
            RUN <br /> BEYOND
          </h1>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40">SCROLL TO ASCEND</span>
        <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 px-8 border-y border-white/5 bg-noise relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className={cn("text-4xl md:text-6xl font-black text-white", fontHeading.className)}>{stat.value}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mt-2">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const VisionSection = () => {
  return (
    <section id="about" className="py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-primary font-black tracking-[0.3em] text-[10px] mb-6 block uppercase">Our Vision</span>
            <ScrollFloat
              containerClassName="!text-left"
              textClassName="!text-white !text-5xl md:!text-7xl !leading-[0.9] !text-left"
            >
              WE DON'T JUST RUN. WE HUNT FOR PROGRESS.
            </ScrollFloat>
          </div>
          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <ScrollReveal baseOpacity={0.2} blurStrength={10}>
              C9 is not just a club, it's a high-performance ecosystem. We believe running is the purest form of human discipline. Our squad is built on the foundations of grit, consistency, and a shared obsession with breaking barriers.
            </ScrollReveal>
            <Button className="rounded-full bg-white text-black hover:bg-primary hover:text-black transition-all px-8 py-6 font-bold group">
              LEARN OUR CREED <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-32 px-8 bg-noise border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className={cn("text-6xl md:text-8xl font-black text-white", fontHeading.className)}>WEEKLY <br /> MISSIONS</h2>
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
          {schedule.map((run, i) => (
            <div key={i} className="bg-black p-10 hover:bg-primary group transition-all duration-500">
              <span className={cn("text-5xl font-black text-white/20 group-hover:text-black/20 block mb-8", fontHeading.className)}>{run.day}</span>
              <div className="space-y-2">
                <p className="text-primary group-hover:text-black font-black text-xs tracking-widest">{run.time}</p>
                <h4 className="text-xl font-black text-white group-hover:text-black">{run.type}</h4>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-black/60 text-sm">
                  <MapPin className="w-3 h-3" /> {run.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const galleryItems = [
    { image: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', text: 'STREET ATTACK' },
    { image: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '', text: 'ELITE GEAR' },
    { image: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '', text: 'DATA DRIVEN' },
    { image: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '', text: 'DAWN HUNT' },
  ];

  return (
    <section id="gallery" className="h-[80vh] py-32 bg-black overflow-hidden border-t border-white/5">
       <div className="px-8 mb-12 flex justify-between items-center">
          <h2 className={cn("text-4xl font-black text-white", fontHeading.className)}>THE VAULT</h2>
          <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground">MOMENTS OF GRIT</span>
       </div>
       <CircularGallery 
         items={galleryItems} 
         bend={3} 
         textColor="#BAFF00" 
         borderRadius={0.08}
         autoScrollDirection="left"
       />
    </section>
  );
};

const Footer = () => (
  <footer id="join" className="pt-32 pb-12 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
        <h2 className={cn("text-7xl md:text-[10vw] leading-[0.85] font-black text-white", fontHeading.className)}>READY TO <br />ASCEND?</h2>
        <div className="space-y-8">
          <p className="text-xl text-muted-foreground max-w-md">Join the squad today and gain access to elite coaching, member-only runs, and tactical gear.</p>
          <div className="flex gap-4">
            <Button className="rounded-full bg-primary text-black hover:bg-white transition-all px-12 py-8 font-black text-lg group">
              JOIN SQUAD <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 text-[10px] font-black tracking-[0.2em] text-muted-foreground">
          <Link href="#" className="hover:text-white transition-colors">INSTAGRAM</Link>
          <Link href="#" className="hover:text-white transition-colors">STRAVA</Link>
          <Link href="#" className="hover:text-white transition-colors">DISCORD</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.2em] text-white/20">
          © 2024 C9 RUN CLUB. TACTICAL TRAINING SYSTEMS.
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-foreground selection:bg-primary selection:text-black">
      <Nav />
      <main>
        <Hero />
        <StatsSection />
        <VisionSection />
        <ScheduleSection />
        <GallerySection />
        <Footer />
      </main>
      
      {/* Tactical Bottom Bar for Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 flex items-center gap-12">
          <Link href="#about"><Zap className="w-5 h-5 text-white" /></Link>
          <Link href="#schedule"><Calendar className="w-5 h-5 text-white" /></Link>
          <Link href="#gallery"><Users className="w-5 h-5 text-white" /></Link>
          <Link href="#join" className="text-primary font-black text-[10px] tracking-widest">JOIN</Link>
        </div>
      </div>
    </div>
  );
}