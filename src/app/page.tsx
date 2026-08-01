'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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

gsap.registerPlugin(ScrollTrigger);

const Model3D = dynamic(() => import('@/components/ui/Model3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] animate-pulse" />
  ),
});

const iconMap: Record<string, any> = {
  Users, MapPin, Trophy, Zap
};

const DUMMY_STATS: ClubStat[] = [
  { id: 'runs', label: 'TOTAL RUNS', value: '420+', icon_name: 'Zap', sort_order: 1 },
  { id: 'members', label: 'ACTIVE SQUAD', value: '850', icon_name: 'Users', sort_order: 2 },
  { id: 'city', label: 'STREETS COVERED', value: '12', icon_name: 'MapPin', sort_order: 3 },
  { id: 'wins', label: 'PODIUM FINISHES', value: '55', icon_name: 'Trophy', sort_order: 4 },
];

const Nav = ({ onLogoClick, clickCount }: { onLogoClick: () => void, clickCount: number }) => (
  <>
    <nav className="fixed top-0 left-0 z-[100] px-6 md:px-12 py-8 mix-blend-difference pointer-events-auto">
      <div 
        onClick={onLogoClick}
        className={cn(
          "text-2xl md:text-3xl font-black tracking-tighter text-white cursor-pointer select-none transition-all active:scale-95 uppercase",
          fontHeading.className,
          clickCount > 0 && "text-primary scale-110"
        )}
      >
        C9 CLUB {clickCount > 0 && <span className="text-[10px] ml-1 text-primary">[{clickCount}/10]</span>}
      </div>
    </nav>
    <BubbleMenu logo="SQUAD MENU" useFixedPosition />
  </>
);

const Hero = () => {
  const containerRef = useRef(null);
  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image 
          src={PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || ''}
          alt="Hero Running"
          fill
          priority
          className="object-cover brightness-[0.4]"
          data-ai-hint="running athlete"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-6">
           <span className="text-primary font-black tracking-[0.4em] text-[10px] block drop-shadow-[0_0_10px_rgba(186,255,0,0.6)]">TACTICAL TRAINING SYSTEMS</span>
        </div>
        <ScrollFloat
          containerClassName="mb-12"
          textClassName={cn("text-7xl md:text-[15vw] leading-[0.85] font-black text-white mix-blend-difference drop-shadow-2xl tracking-tighter", fontHeading.className)}
        >
          RUN BEYOND
        </ScrollFloat>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Scroll to Ascend</span>
        <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

const StatsSection = ({ stats }: { stats: ClubStat[] }) => {
  return (
    <section className="py-32 px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon_name] || Zap;
          return (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary transition-all duration-500 group-hover:bg-primary/10 shadow-[0_0_20px_rgba(186,255,0,0.05)]">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className={cn("text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-md", fontHeading.className)}>{stat.value}</span>
              <span className="text-[10px] font-black tracking-[0.3em] text-white/60 mt-4 uppercase">{stat.label}</span>
            </div>
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
              textClassName={cn("!text-white !text-5xl md:!text-8xl !leading-[0.85] !text-left !tracking-tighter", fontHeading.className)}
            >
              WE DON'T JUST RUN. WE HUNT FOR PROGRESS.
            </ScrollFloat>
          </div>
          <div className="space-y-8">
            <Model3D
              modelPath="/models/model.glb"
              className="w-full h-[400px] md:h-[500px]"
            />
            <div className="space-y-8 text-white/70 text-xl leading-relaxed font-medium">
              <ScrollReveal baseOpacity={0.2} blurStrength={10}>
                C9 is not just a club, it's a tactical training ecosystem. We believe running is the purest form of human discipline. Our squad is built on the foundations of grit, consistency, and a shared obsession with breaking barriers. Join the hunt.
              </ScrollReveal>
              <Button className="rounded-none bg-white text-black hover:bg-primary hover:text-black transition-all px-10 py-8 font-black text-sm tracking-widest group shadow-xl cursor-pointer">
                LEARN OUR CREED <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
    { id: '1', title: 'MISSION_01', category: 'URBAN OPS', img: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', height: 500 },
    { id: '2', title: 'MISSION_02', category: 'ELITE GEAR', img: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '', height: 400 },
    { id: '3', title: 'MISSION_03', category: 'SQUAD INTEL', img: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '', height: 600 },
    { id: '4', title: 'MISSION_04', category: 'DAWN HUNT', img: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '', height: 450 },
    { id: '5', title: 'MISSION_05', category: 'CP ATTACK', img: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', height: 550 },
    { id: '6', title: 'MISSION_06', category: 'TRACK DATA', img: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '', height: 400 },
    { id: '7', title: 'MISSION_07', category: 'ELITE GEAR', img: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '', height: 500 },
    { id: '8', title: 'MISSION_08', category: 'URBAN OPS', img: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '', height: 650 },
  ];

  return (
    <section id="archives" className="py-40 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8">
         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="space-y-4 text-center md:text-left mx-auto md:mx-0">
             <span className="text-primary font-black tracking-[0.4em] text-[12px] block uppercase">Tactical Database</span>
             <h2 className={cn("text-6xl md:text-9xl font-black text-white tracking-tighter leading-none italic", fontHeading.className)}>SQUAD ARCHIVES</h2>
           </div>
           <div className="hidden md:flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest pb-4">
             <Camera className="w-4 h-4" /> SCROLL TO SCAN VAULT
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
      title: 'YEH RUN NA MILEGI DOBARA',
      date: 'AUGUST 2',
      day: 'SUNDAY',
      theme: 'red',
      image: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '',
      subtitle: 'JOIN US THIS SUNDAY',
      tags: ['REGISTER NOW']
    },
    {
      id: 2,
      title: 'MONSOON RUN & CHILL',
      date: 'JULY 26',
      day: 'SUNDAY 7:00 AM',
      theme: 'dark',
      image: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '',
      subtitle: 'TRACK SERIES',
      tags: ['TUG OF WAR', 'SPRINT RACES']
    },
    {
      id: 3,
      title: 'RUN & PLAY',
      date: '12 JULY',
      day: '5:30 AM',
      theme: 'green',
      image: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '',
      subtitle: 'ZUMBA & PICKLE BALL',
      tags: ['ZUMBA', 'PICKLE BALL']
    },
    {
      id: 4,
      title: 'THE SOCIAL',
      date: '28 JUNE',
      day: 'SUNDAY',
      theme: 'pink',
      image: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '',
      subtitle: 'TRACK SERIES',
      tags: ['FREE RUN', 'POST-RUN SCHEDULE']
    }
  ];

  return (
    <section id="schedule" className="py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h2 className={cn("text-7xl md:text-9xl font-black text-white italic tracking-tighter leading-none", fontHeading.className)}>
            WEEKLY EVENTS
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-white/80 text-lg md:text-xl font-medium leading-snug">
              Explore every C9 event in one place. Whether it's your first run or your fiftieth, there's always another route, another sunrise, and another community waiting for you.
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar justify-center">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-none font-bold text-sm tracking-widest uppercase transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-white text-black" 
                  : "bg-zinc-900 text-white/40 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posters.map((poster) => (
            <div key={poster.id} className="group relative aspect-[1/1.6] overflow-hidden rounded-none bg-zinc-900 border border-white/5 transition-transform duration-500 hover:-translate-y-2">
              <Image 
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.7]"
              />
              
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500 opacity-60",
                poster.theme === 'red' && "bg-gradient-to-t from-red-900/80 via-transparent to-red-600/20",
                poster.theme === 'dark' && "bg-gradient-to-t from-black/80 via-transparent to-zinc-900/20",
                poster.theme === 'green' && "bg-gradient-to-t from-primary/60 via-transparent to-primary/10",
                poster.theme === 'pink' && "bg-gradient-to-t from-pink-900/80 via-transparent to-pink-600/20"
              )} />

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex flex-col gap-1">
                   <span className="text-white font-black text-[10px] tracking-widest uppercase opacity-60">{poster.day}</span>
                   <div className="flex items-center gap-2">
                     <span className={cn(
                       "text-4xl font-black italic",
                       poster.theme === 'green' ? "text-primary" : "text-white"
                     )}>{poster.date}</span>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className={cn(
                      "text-[10px] font-black tracking-[0.3em] uppercase block",
                      poster.theme === 'green' ? "text-primary" : "text-white/60"
                    )}>{poster.subtitle}</span>
                    <h4 className={cn("text-3xl font-black italic text-white leading-none uppercase", fontHeading.className)}>
                      {poster.title}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {poster.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black text-white/60 tracking-widest uppercase border border-white/20 px-2 py-1 rounded-none">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-black" />
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
    <section id="vault" className="h-[90vh] py-32 bg-black overflow-hidden">
       <div className="px-8 mb-16 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4 text-center md:text-left">
          <h2 className={cn("text-5xl font-black text-white tracking-tighter italic", fontHeading.className)}>THE VAULT</h2>
          <span className="text-[10px] font-black tracking-[0.4em] text-primary drop-shadow-[0_0_10px_rgba(186,255,0,0.6)] uppercase">Elite Intelligence</span>
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

const TacticalSelection = () => {
  const menuItems = [
    { link: '#', text: 'URBAN INTERVALS', image: PlaceHolderImages.find(img => img.id === 'gallery-1')?.imageUrl || '' },
    { link: '#', text: 'DAWN HUNTS', image: PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || '' },
    { link: '#', text: 'ELITE VAULT', image: PlaceHolderImages.find(img => img.id === 'gallery-2')?.imageUrl || '' },
    { link: '#', text: 'SQUAD CREED', image: PlaceHolderImages.find(img => img.id === 'gallery-3')?.imageUrl || '' },
  ];

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-12 text-center md:text-left">
         <span className="text-primary font-black tracking-[0.4em] text-[12px] block uppercase mb-4">Squad Selection</span>
         <h2 className={cn("text-5xl md:text-7xl font-black text-white tracking-tighter italic", fontHeading.className)}>TACTICAL SELECTION</h2>
      </div>
      <FlowingMenu items={menuItems} />
    </section>
  );
};

const Footer = () => (
  <footer id="join" className="pt-40 pb-16 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-primary font-black tracking-[0.4em] text-[12px] block uppercase">Recruitment Protocol</span>
          <ScrollFloat
            textClassName={cn("text-8xl md:text-[12vw] leading-[0.8] font-black text-white tracking-tighter italic", fontHeading.className)}
          >
            READY TO JOIN?
          </ScrollFloat>
        </div>
        <div className="space-y-10 text-center lg:text-left">
          <ScrollReveal baseOpacity={0.2}>
            <p className="text-2xl text-white/80 max-w-md font-medium leading-tight mx-auto lg:mx-0">Join the squad today and gain access to elite coaching, member-only events, and tactical gear.</p>
          </ScrollReveal>
          <Button className="rounded-none bg-primary text-black hover:bg-white transition-all px-16 py-10 font-black text-xl group shadow-[0_0_50px_rgba(186,255,0,0.3)] cursor-pointer">
            JOIN SQUAD <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex gap-12 text-[10px] font-black tracking-[0.3em] text-white/50">
          <Link href="#" className="hover:text-primary transition-colors uppercase">Instagram</Link>
          <Link href="#" className="hover:text-primary transition-colors uppercase">Strava</Link>
          <Link href="#" className="hover:text-primary transition-colors uppercase">Discord</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
          © 2024 C9 RUN CLUB. Tactical Training Systems.
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const router = useRouter();
  const [logoClicks, setLogoClicks] = useState(0);
  const [stats, setStats] = useState<ClubStat[]>(DUMMY_STATS);

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

  return (
    <div className="bg-black text-foreground selection:bg-primary selection:text-black overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay bg-[url('https://res.cloudinary.com/l5nvozix/image/upload/v1725599869/noise_o8p8p8.png')]" />
      
      <Nav onLogoClick={handleLogoClick} clickCount={logoClicks} />
      <main>
        <Hero />
        <StatsSection stats={stats} />
        <VisionSection />
        <ArchivesSection />
        <ScheduleSection />
        <GallerySection />
        <TacticalSelection />
        <Footer />
      </main>
    </div>
  );
}
