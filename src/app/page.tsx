'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CircularGallery from '@/components/ui/CircularGallery';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollFloat from '@/components/ui/ScrollFloat';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Calendar, MapPin, Users, Zap, Trophy, 
  CheckCircle2, Camera, ExternalLink
} from 'lucide-react';
import { type Mission as Event, type ClubStat } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import FlowingMenu from '@/components/ui/FlowingMenu';
import Masonry from '@/components/ui/Masonry';
import BubbleMenu from '@/components/ui/BubbleMenu';
import { LogoLoop } from '@/components/ui/LogoLoop';
import CircularText from '@/components/ui/CircularText';

gsap.registerPlugin(ScrollTrigger);

const Model3D = dynamic(() => import('@/components/ui/Model3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] animate-pulse" />
  ),
});

const DUMMY_STATS: ClubStat[] = [
  { id: 'runs', label: 'Weekly runs', value: '12+', icon_name: 'Zap', sort_order: 1 },
  { id: 'members', label: 'Active squad', value: '500+', icon_name: 'Users', sort_order: 2 },
  { id: 'km', label: 'KM completed', value: '35K+', icon_name: 'MapPin', sort_order: 3 },
  { id: 'founded', label: 'Established', value: '2026', icon_name: 'Trophy', sort_order: 4 },
];

const MENU_ITEMS = [
  {
    label: 'Mission',
    href: '#about',
    thumbnail: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl
  },
  {
    label: 'Archives',
    href: '#archives',
    thumbnail: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl
  },
  {
    label: 'Events',
    href: '#schedule',
    thumbnail: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl
  },
  {
    label: 'Vault',
    href: '#vault',
    thumbnail: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl
  },
  {
    label: 'Join Squad',
    href: '#join',
    thumbnail: PlaceHolderImages.find(img => img.id === 'squad-joy')?.imageUrl
  }
];

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-black">
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src={PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || ''}
          alt="Elite Squad"
          fill
          priority
          className="object-cover"
          data-ai-hint="running marathon"
        />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-black/40" 
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y: textY }}
          className="text-left space-y-6"
        >
          <div>
             <span className="text-primary font-black tracking-[0.4em] text-[10px] block uppercase mb-4">Tactical Training Systems</span>
             <h1 className={cn("text-6xl md:text-8xl font-black text-white tracking-tighter leading-none italic font-heading", fontHeading.className)}>
               Run beyond <br /> limits
             </h1>
          </div>
          
          <p className="max-w-md text-white/80 text-lg font-medium leading-tight font-heading">
            Elite running community built for athletes, warriors and those who refuse average.
          </p>

          <Button className="rounded-none bg-primary text-black hover:bg-white transition-all px-10 py-6 font-black text-sm group shadow-xl cursor-pointer">
            Join the Squad →
          </Button>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.7, opacity: 0, rotateY: 45 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
          <Model3D
            modelPath="/models/model.glb"
            className="w-full h-[500px] relative z-10"
          />
          <div className="absolute -bottom-12 right-0 text-right">
             <span className="text-primary font-black tracking-[0.4em] text-[10px] block uppercase">Est. 2026</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Scroll to Ascend</span>
        <motion.div 
          animate={{ height: [0, 48, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px bg-primary" 
        />
      </div>
    </section>
  );
};

const StatsSection = ({ stats }: { stats: ClubStat[] }) => {
  return (
    <section className="py-20 px-8 bg-black relative border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => {
          return (
            <motion.div 
              key={i} 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <span className={cn("text-5xl md:text-6xl font-black text-white tracking-tighter italic font-heading", fontHeading.className)}>{stat.value}</span>
              <span className="text-[10px] font-black tracking-[0.3em] text-primary mt-2 uppercase">{stat.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const VisionSection = () => {
  return (
    <section id="about" className="py-40 px-8 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-primary font-black tracking-[0.4em] text-[12px] mb-8 block uppercase">Operational Vision</span>
            <ScrollFloat
              containerClassName="!text-left"
              textClassName={cn("!text-white !text-5xl md:!text-7xl !leading-[0.9] !text-left !tracking-tighter font-heading italic", fontHeading.className)}
            >
              Discipline over motivation.
            </ScrollFloat>
          </div>
          <div className="space-y-8">
            <div className="space-y-8 text-white/70 text-xl leading-relaxed font-medium font-heading">
              <ScrollReveal baseOpacity={0.2} blurStrength={10}>
                C9 is not just a club, it's a tactical training ecosystem. We believe running is the purest form of human discipline. Our squad is built on the foundations of grit, consistency, and a shared obsession with breaking barriers. Join the hunt.
              </ScrollReveal>
              <Button className="rounded-none bg-white text-black hover:bg-primary hover:text-black transition-all px-10 py-7 font-black text-sm tracking-widest group shadow-xl cursor-pointer">
                Learn our Creed →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArchivesSection = () => {
  const archiveItems = [
    { id: '1', title: 'Urban Ops', category: 'Urban ops', img: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', height: 500 },
    { id: '2', title: 'Elite Gear', category: 'Elite gear', img: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '', height: 400 },
    { id: '3', title: 'Squad Intel', category: 'Squad intel', img: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '', height: 600 },
    { id: '4', title: 'Dawn Hunt', category: 'Dawn hunt', img: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '', height: 450 },
    { id: '5', title: 'Street Attack', category: 'Urban ops', img: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', height: 550 },
    { id: '6', title: 'Track Data', category: 'Track data', img: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '', height: 400 },
    { id: '7', title: 'Elite Training', category: 'Elite gear', img: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '', height: 500 },
    { id: '8', title: 'Mission Log', category: 'Urban ops', img: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', height: 650 },
  ];

  return (
    <section id="archives" className="py-40 bg-black overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="space-y-4 text-center md:text-left mx-auto md:mx-0">
             <span className="text-primary font-black tracking-[0.4em] text-[12px] block uppercase">Tactical Database</span>
             <h2 className={cn("text-5xl md:text-8xl font-black text-white tracking-tighter leading-none italic font-heading", fontHeading.className)}>Squad archives</h2>
           </div>
           <div className="hidden md:flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest pb-4">
             <Camera className="w-4 h-4" /> Scroll to scan vault
           </div>
         </div>

         <Masonry 
            items={archiveItems}
            animateFrom="bottom"
            stagger={0.08}
            scaleOnHover={true}
            hoverScale={0.97}
         />
      </div>
    </section>
  );
};

const ScheduleSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Upcoming', 'Past'];
  
  const posters = [
    {
      id: 1,
      title: 'City Street Attack',
      date: 'Aug 2',
      theme: 'red',
      image: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '',
      subtitle: 'Join the hunt',
      tags: ['Register now']
    },
    {
      id: 2,
      title: 'Monsoon Track Series',
      date: 'Jul 26',
      theme: 'dark',
      image: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '',
      subtitle: 'Elite Ops',
      tags: ['Squad only']
    },
    {
      id: 3,
      title: 'Cross Training Play',
      date: 'Jul 12',
      theme: 'green',
      image: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '',
      subtitle: 'Hybrid Training',
      tags: ['Elite ops']
    },
    {
      id: 4,
      title: 'The Networking Run',
      date: 'Jun 28',
      theme: 'pink',
      image: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '',
      subtitle: 'Social Mission',
      tags: ['Vault access']
    }
  ];

  return (
    <section id="schedule" className="py-32 px-6 md:px-12 bg-black relative">
      <div className="absolute right-0 top-0 hidden lg:block">
        <CircularText 
          text="C9 CLUB • ELITE SQUAD • TACTICAL TRAINING • "
          spinDuration={15}
          onHover="goBonkers"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <h2 className={cn("text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.9] font-heading", fontHeading.className)}>
            Weekly<br/>events
          </h2>
          <div className="space-y-6">
            <p className="text-white/60 text-lg max-w-lg font-heading">
              Explore every C9 event in one place. Whether it's your first run or your fiftieth, there's always another route, another sunrise.
            </p>
            <div className="flex gap-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2 rounded-none font-black text-[10px] tracking-widest uppercase transition-all border",
                    activeTab === tab 
                      ? "bg-primary text-black border-primary" 
                      : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posters.map((poster) => (
            <motion.div 
              key={poster.id} 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="group relative aspect-[1/1.6] overflow-hidden bg-zinc-900 border border-white/5 transition-transform duration-500 hover:-translate-y-2"
            >
              <Image 
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.7]"
              />
              
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500 opacity-60",
                poster.theme === 'red' && "bg-gradient-to-t from-red-950 via-transparent to-red-600/20",
                poster.theme === 'dark' && "bg-gradient-to-t from-black via-transparent to-zinc-900/20",
                poster.theme === 'green' && "bg-gradient-to-t from-primary/60 via-transparent to-primary/10",
                poster.theme === 'pink' && "bg-gradient-to-t from-pink-950 via-transparent to-pink-600/20"
              )} />

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                     <span className={cn(
                       "text-5xl font-black italic font-heading",
                       poster.theme === 'green' ? "text-primary" : "text-white"
                     )}>{poster.date}</span>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black tracking-[0.3em] text-white/60 uppercase block">{poster.subtitle}</span>
                    <h4 className={cn("text-3xl font-black italic text-white leading-none font-heading", fontHeading.className)}>
                      {poster.title}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {poster.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black text-white/40 tracking-widest uppercase px-2 py-1 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-black" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const galleryItems = [
    { image: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', text: 'Street attack' },
    { image: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '', text: 'Elite gear' },
    { image: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '', text: 'Data driven' },
    { image: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '', text: 'Dawn hunt' },
  ];

  return (
    <section id="vault" className="h-[90vh] py-32 bg-black overflow-hidden relative border-y border-white/5">
       <div className="px-8 mb-16 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4 text-center md:text-left">
          <h2 className={cn("text-5xl font-black text-white tracking-tighter italic font-heading", fontHeading.className)}>The vault</h2>
          <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Elite intelligence</span>
       </div>
       <CircularGallery 
         items={galleryItems} 
         bend={3} 
         textColor="#BAFF00" 
         borderRadius={0}
         autoScrollDirection="left"
         font="black 32px var(--font-heading)"
       />
    </section>
  );
};

const Footer = () => (
  <footer id="join" className="pt-40 pb-16 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="relative group overflow-hidden bg-zinc-900 border border-white/10 p-1 mb-20 shadow-2xl rounded-[24px]">
        <div className="relative aspect-[16/7] md:aspect-[21/9] w-full overflow-hidden rounded-[22px]">
          <Image 
            src={PlaceHolderImages.find(img => img.id === 'squad-joy')?.imageUrl || ''}
            alt="Squad Joy"
            fill
            className="object-cover brightness-50 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-center text-center p-8">
            <span className="text-primary font-black tracking-[0.4em] text-[10px] mb-4 uppercase block">Recruitment protocol</span>
            <h2 className={cn("text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8 font-heading italic", fontHeading.className)}>
              Ready to <span className="text-primary">join?</span>
            </h2>
            <p className="text-white/80 text-sm md:text-lg max-w-md font-medium leading-snug mb-8 font-heading">
              Join the squad today and gain access to elite coaching, member-only events, and tactical gear.
            </p>
            <Button className="rounded-none bg-primary text-black hover:bg-white transition-all px-10 py-5 font-black text-sm group shadow-xl cursor-pointer">
              Join the Squad →
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex gap-12 text-[10px] font-black tracking-[0.3em] text-white/50 font-heading">
          <Link href="#" className="hover:text-primary transition-colors uppercase">Instagram</Link>
          <Link href="#" className="hover:text-primary transition-colors uppercase">Strava</Link>
          <Link href="#" className="hover:text-primary transition-colors uppercase">Discord</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase font-heading">
          © 2024 C9 RUN CLUB. Tactical Training Systems.
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const router = useRouter();
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    
    if (newCount === 10) {
      setLogoClicks(0);
      router.push('/admin/login');
    }
  };

  const logos = [
    { node: <span className="font-heading font-black italic">C9 Club</span> },
    { node: <span className="text-primary px-4">•</span> },
    { node: <span className="font-heading font-black italic">Tactical running</span> },
    { node: <span className="text-primary px-4">•</span> },
    { node: <span className="font-heading font-black italic">Elite squad</span> },
    { node: <span className="text-primary px-4">•</span> },
    { node: <span className="font-heading font-black italic">Train endure dominate</span> },
    { node: <span className="text-primary px-4">•</span> },
  ];

  return (
    <div className="bg-black text-foreground selection:bg-primary selection:text-black overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay bg-noise" />
      
      <BubbleMenu 
        logo="Command Hub" 
        items={MENU_ITEMS}
      />

      <div className="fixed top-8 left-8 z-[100] mix-blend-difference pointer-events-auto">
        <div 
          onClick={handleLogoClick}
          className={cn(
            "text-2xl font-black tracking-tighter text-white cursor-pointer select-none transition-all active:scale-95 font-heading italic",
            logoClicks > 0 && "text-primary scale-110"
          )}
        >
          C9 Club {logoClicks > 0 && <span className="text-[10px] ml-1 text-primary font-heading">[{logoClicks}/10]</span>}
        </div>
      </div>

      <main>
        <Hero />
        <div className="py-8 bg-zinc-900/50 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-noise" />
          <LogoLoop 
            logos={logos} 
            speed={80} 
            logoHeight={24} 
            gap={60} 
            fadeOut 
            fadeOutColor="#000000"
            scaleOnHover
          />
        </div>
        <StatsSection stats={DUMMY_STATS} />
        <VisionSection />
        <ArchivesSection />
        <ScheduleSection />
        <GallerySection />
        <Footer />
      </main>
    </div>
  );
}
