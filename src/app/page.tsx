
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
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Calendar, MapPin, Users, Zap, Trophy, 
  CheckCircle2, Shield, AlertTriangle, Loader2
} from 'lucide-react';
import { supabase, type Mission, type ClubStat } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  Users, MapPin, Trophy, Zap
};

const Nav = ({ onLogoClick, clickCount }: { onLogoClick: () => void, clickCount: number }) => (
  <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference pointer-events-auto">
    <div 
      onClick={onLogoClick}
      className={cn(
        "text-2xl md:text-3xl font-black tracking-tighter text-white cursor-pointer select-none transition-all active:scale-95",
        fontHeading.className,
        clickCount > 0 && "text-primary scale-110"
      )}
    >
      C9 CLUB {clickCount > 0 && <span className="text-[10px] ml-1">[{clickCount}/10]</span>}
    </div>
    <div className="hidden md:flex items-center gap-12 text-[10px] font-black tracking-[0.2em] text-white">
      <Link href="#about" className="hover:text-primary transition-colors">VISION</Link>
      <Link href="#schedule" className="hover:text-primary transition-colors">SCHEDULE</Link>
      <Link href="#gallery" className="hover:text-primary transition-colors">VAULT</Link>
      <Link href="#join" className="group flex items-center gap-2 text-white border-b border-primary pb-1">
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
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image 
          src={PlaceHolderImages.find(img => img.id === 'hero-run')?.imageUrl || ''}
          alt="Hero Running"
          fill
          priority
          className="object-cover brightness-[0.4]"
          data-ai-hint="running athlete"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-primary font-black tracking-[0.4em] text-[10px] mb-6 block drop-shadow-[0_0_10px_rgba(186,255,0,0.6)]">TACTICAL TRAINING SYSTEMS</span>
          <h1 className={cn("text-7xl md:text-[15vw] leading-[0.85] font-black text-white mix-blend-difference drop-shadow-2xl", fontHeading.className)}>
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
        <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Scroll to Ascend</span>
        <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const StatsSection = ({ stats }: { stats: ClubStat[] }) => {
  return (
    <section className="py-32 px-8 border-y border-white/20 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-10" />
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {stats.length > 0 ? stats.map((stat, i) => {
          const Icon = iconMap[stat.icon_name] || Zap;
          return (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:border-primary transition-all duration-500 group-hover:bg-primary/20 shadow-[0_0_20px_rgba(186,255,0,0.1)]">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className={cn("text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-md", fontHeading.className)}>{stat.value}</span>
              <span className="text-[10px] font-black tracking-[0.3em] text-white/60 mt-4 uppercase">{stat.label}</span>
            </div>
          );
        }) : (
          <div className="col-span-full text-center flex flex-col items-center gap-4 py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">SCANNIG TACTICAL STATS...</span>
          </div>
        )}
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
              textClassName="!text-white !text-5xl md:!text-8xl !leading-[0.85] !text-left !tracking-tighter"
            >
              WE DON'T JUST RUN. WE HUNT FOR PROGRESS.
            </ScrollFloat>
          </div>
          <div className="space-y-8 text-white/70 text-xl leading-relaxed font-medium">
            <ScrollReveal baseOpacity={0.2} blurStrength={10}>
              C9 is not just a club, it's a tactical training ecosystem. We believe running is the purest form of human discipline. Our squad is built on the foundations of grit, consistency, and a shared obsession with breaking barriers. Join the hunt.
            </ScrollReveal>
            <Button className="rounded-full bg-white text-black hover:bg-primary hover:text-black transition-all px-10 py-8 font-black text-sm tracking-widest group shadow-xl">
              LEARN OUR CREED <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScheduleSection = ({ missions, loading, error, onJoin, joinedIds }: { 
  missions: Mission[], 
  loading: boolean, 
  error: string | null, 
  onJoin: (id: string) => void,
  joinedIds: string[]
}) => {
  return (
    <section id="schedule" className="py-40 px-8 bg-black relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <h2 className={cn("text-7xl md:text-9xl font-black text-white leading-none tracking-tighter", fontHeading.className)}>
            WEEKLY <br /> <span className="text-primary drop-shadow-[0_0_20px_rgba(186,255,0,0.5)]">MISSIONS</span>
          </h2>
          <div className="h-20 w-20 rounded-2xl border border-white/30 flex items-center justify-center bg-zinc-900/40 backdrop-blur-2xl">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin h-12 w-12 text-primary" />
            <span className="text-[10px] font-black tracking-widest text-white/60">CONNECTING TO COMMAND...</span>
          </div>
        ) : error ? (
          <div className="py-20 text-center border border-dashed border-destructive/50 rounded-[2.5rem] bg-destructive/5">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-6" />
            <p className="text-white font-black tracking-widest text-xs uppercase mb-2">Tactical Link Offline</p>
            <p className="text-white/60 text-sm mb-6">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="rounded-full">RETRY CONNECTION</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.length > 0 ? missions.map((run) => (
              <div 
                key={run.id} 
                className={cn(
                  "bg-zinc-900/60 border border-white/20 p-12 hover:border-primary transition-all duration-500 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden",
                  joinedIds.includes(run.id) && "border-primary bg-primary/20"
                )}
              >
                <span className={cn("text-6xl font-black text-white/10 group-hover:text-white/20 block mb-12 transition-colors", fontHeading.className)}>
                  {run.day}
                </span>
                <div className="relative z-10">
                  <p className="text-primary font-black text-xs tracking-[0.2em] mb-2">{run.time}</p>
                  <h4 className="text-2xl font-black text-white mb-4 transition-colors">{run.type}</h4>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-bold mb-8">
                    <MapPin className="w-4 h-4" /> {run.location}
                  </div>
                  
                  <Button 
                    onClick={() => onJoin(run.id)}
                    disabled={joinedIds.includes(run.id)}
                    className={cn(
                      "w-full rounded-full font-black tracking-widest text-xs py-6 transition-all duration-300 shadow-lg",
                      joinedIds.includes(run.id) 
                        ? "bg-primary text-black" 
                        : "bg-white text-black hover:bg-primary"
                    )}
                  >
                    {joinedIds.includes(run.id) ? (
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> CONFIRMED</span>
                    ) : (
                      "JOIN MISSION"
                    )}
                  </Button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/20 rounded-[2.5rem]">
                <Shield className="w-12 h-12 text-white/20 mx-auto mb-6" />
                <p className="text-white/40 font-black tracking-widest text-xs uppercase">No active missions found in Command Database.</p>
              </div>
            )}
          </div>
        )}
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
    <section id="gallery" className="h-[90vh] py-32 bg-black overflow-hidden border-t border-white/20">
       <div className="px-8 mb-16 flex justify-between items-center max-w-7xl mx-auto">
          <h2 className={cn("text-5xl font-black text-white tracking-tighter", fontHeading.className)}>THE VAULT</h2>
          <span className="text-[10px] font-black tracking-[0.4em] text-primary drop-shadow-[0_0_10px_rgba(186,255,0,0.6)] uppercase">Elite Intelligence</span>
       </div>
       <CircularGallery 
         items={galleryItems} 
         bend={3} 
         textColor="#BAFF00" 
         borderRadius={0.1}
         autoScrollDirection="left"
         font="black 32px var(--font-heading)"
       />
    </section>
  );
};

const Footer = () => (
  <footer id="join" className="pt-40 pb-16 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
        <h2 className={cn("text-8xl md:text-[12vw] leading-[0.8] font-black text-white tracking-tighter", fontHeading.className)}>READY TO <br /><span className="text-primary drop-shadow-[0_0_30px_rgba(186,255,0,0.5)]">JOIN?</span></h2>
        <div className="space-y-10">
          <p className="text-2xl text-white/80 max-w-md font-medium leading-tight">Join the squad today and gain access to elite coaching, member-only runs, and tactical gear.</p>
          <Button className="rounded-full bg-primary text-black hover:bg-white transition-all px-16 py-10 font-black text-xl group shadow-[0_0_50px_rgba(186,255,0,0.3)]">
            JOIN SQUAD <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="pt-16 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-12">
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
  const [missions, setMissions] = useState<Mission[]>([]);
  const [stats, setStats] = useState<ClubStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);
  const { toast } = useToast();

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
    fetchData();

    return () => {
      lenis.destroy();
    };
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      
      const { data: mData, error: mErr } = await supabase.from('missions').select('*').order('created_at', { ascending: true });
      const { data: sData, error: sErr } = await supabase.from('club_stats').select('*').order('sort_order', { ascending: true });

      if (mErr) throw mErr;
      if (sErr) throw sErr;

      setMissions(mData || []);
      setStats(sData || []);
    } catch (err: any) {
      console.error('Tactical Sync Error:', err.message);
      setError("Squad Command is unreachable. Check network status.");
    } finally {
      setLoading(false);
    }
  }

  const handleJoin = async (missionId: string) => {
    if (joinedIds.includes(missionId)) return;

    const email = prompt("Enter Squad Member Email to Confirm Booking:");
    if (!email) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{ mission_id: missionId, user_email: email.trim().toLowerCase() }]);

      if (error) throw error;

      setJoinedIds(prev => [...prev, missionId]);
      toast({
        title: "Mission Joined",
        description: "Squad confirmed. See you at the location.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Tactical Failure",
        description: err.message || "Could not confirm booking.",
      });
    }
  };

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    
    if (newCount === 10) {
      setLogoClicks(0);
      router.push('/admin/login');
    }
  };

  return (
    <div className="bg-black text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <Nav onLogoClick={handleLogoClick} clickCount={logoClicks} />
      <main>
        <Hero />
        <StatsSection stats={stats} />
        <VisionSection />
        <ScheduleSection 
          missions={missions} 
          loading={loading} 
          error={error} 
          onJoin={handleJoin}
          joinedIds={joinedIds}
        />
        <GallerySection />
        <Footer />
      </main>
      
      {/* Tactical Bottom Bar for Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/30 rounded-full px-10 py-5 flex items-center justify-between shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
          <Link href="#about"><Zap className="w-6 h-6 text-white hover:text-primary transition-colors" /></Link>
          <Link href="#schedule"><Calendar className="w-6 h-6 text-white hover:text-primary transition-colors" /></Link>
          <Link href="#gallery"><Users className="w-6 h-6 text-white hover:text-primary transition-colors" /></Link>
          <Link href="#join" className="text-primary font-black text-xs tracking-tighter uppercase">Join Now</Link>
        </div>
      </div>
    </div>
  );
}
