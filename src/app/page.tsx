
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { TiltableImage } from '@/components/ui/TiltableImage';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFirebase } from 'react-icons/si';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollStack } from '@/components/ui/ScrollStack';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import CircularGallery from '@/components/ui/CircularGallery';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CLIENTS', href: '#clients' },
  { label: 'CONTACT', href: '#contact' },
];

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
  ];

const projects = [
    {
        id: '01',
        client: 'Rylinx Studios',
        liveProjectLink: '#',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-1-large')!,
            PlaceHolderImages.find(p => p.id === 'project-1-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-1-small-2')!,
        ],
    },
    {
        id: '02',
        client: 'Aura Creations',
        liveProjectLink: '#',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-2-large')!,
            PlaceHolderImages.find(p => p.id === 'project-2-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-2-small-2')!,
        ],
    },
    {
        id: '03',
        client: 'Quantum Innovations',
        liveProjectLink: '#',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-3-large')!,
            PlaceHolderImages.find(p => p.id === 'project-3-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-3-small-2')!,
        ],
    },
    {
        id: '04',
        client: 'Nova Digital',
        liveProjectLink: '#',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-4-large')!,
            PlaceHolderImages.find(p => p.id === 'project-4-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-4-small-2')!,
        ],
    },
];

const testimonials = [
  {
    image: 'https://picsum.photos/seed/10/800/600',
    text: 'Madhav is a design wizard. He took our vague ideas and turned them into a masterpiece. Pure magic!',
    author: 'Jane Doe, CEO of Rylinx Studios',
  },
  {
    image: 'https://picsum.photos/seed/12/800/600',
    text: 'Working with Madhav was a dream. The communication was seamless and the results were beyond our expectations.',
    author: 'John Smith, Founder of Aura Creations',
  },
  {
    image: 'https://picsum.photos/seed/14/800/600',
    text: 'The level of creativity and polish is insane. Our new branding has never looked better.',
    author: 'Emily White, Marketing Head at Quantum',
  },
  {
    image: 'https://picsum.photos/seed/16/800/600',
    text: 'Incredible attention to detail. Every pixel is perfect. Highly recommend for any project, big or small.',
    author: 'Michael Brown, CTO of Nova Digital',
  },
   {
    image: 'https://picsum.photos/seed/18/800/600',
    text: 'A true professional. Delivered on time and exceeded all our goals. We\'ll be back for more!',
    author: 'Sarah Green, Project Manager',
  },
   {
    image: 'https://picsum.photos/seed/20/800/600',
    text: 'The 3D work is simply breathtaking. It has added a whole new dimension to our product showcase.',
    author: 'David Black, Creative Director',
  },
];


const AboutSection = () => {
    const headingRef = useRef(null);

    useLayoutEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: 'top bottom-=100',
                end: 'bottom top+=100',
                scrub: 1,
            },
        });

        tl.to(heading, {
            '--bg-size': '100%',
            duration: 1,
        });

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 py-24">
            <motion.div initial={{ y: 50, x: -50, opacity: 0 }} whileInView={{ y: 0, x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} animate={{ y: [0, -10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-1/4 left-10 md:left-20 w-40 h-40 md:w-56 md:h-56">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d flower icon" width={224} height={224} className="object-contain" />
            </motion.div>
            <motion.div initial={{ y: 50, x: 50, opacity: 0 }} whileInView={{ y: 0, x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} animate={{ y: [0, 10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }} className="absolute top-1/4 right-10 md:right-20 w-40 h-40 md:w-56 md:h-56">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d flower icon" width={224} height={224} className="object-contain" />
            </motion.div>
            <motion.div initial={{ y: 50, x: -50, opacity: 0 }} whileInView={{ y: 0, x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} animate={{ y: [0, -10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 } }} className="absolute bottom-1/4 left-10 md:left-40 w-32 h-32 md:w-44 md:h-44">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d flower icon" width={176} height={176} className="object-contain" />
            </motion.div>
            <motion.div initial={{ y: 50, x: 50, opacity: 0 }} whileInView={{ y: 0, x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} animate={{ y: [0, 10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }} className="absolute bottom-1/4 right-10 md:right-40 w-32 h-32 md:w-44 md:h-44">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d flower icon" width={176} height={176} className="object-contain" />
            </motion.div>

            <h2
                ref={headingRef}
                className="animated-heading text-6xl md:text-8xl font-black text-white tracking-tighter mb-8"
            >
                ABOUT ME
            </h2>
            <div className="max-w-2xl">
                <ScrollReveal textClassName="text-base md:text-lg text-gray-300" containerClassName="mb-12">
                    With over five years of experience in design, I specialize in branding, web design, and user experience. I love collaborating with businesses that want to stand out and showcase their best side. Let&apos;s create something amazing together!
                </ScrollReveal>
            </div>
            <Link href="#contact" className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform shadow-lg">
                CONTACT ME
            </Link>
        </section>
    )
}

const ProjectsSection = () => {
    const headingRef = useRef(null);

    useLayoutEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: 'top bottom-=100',
                end: 'bottom top+=100',
                scrub: 1,
            },
        });

        tl.to(heading, {
            '--bg-size': '100%',
            duration: 1,
        });
        
        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    return (
        <section id="projects" className="relative bg-black text-white py-20">
            <div className="container mx-auto text-center mb-20">
                <h2 ref={headingRef} className="animated-heading text-6xl md:text-8xl font-black tracking-tighter">MY PROJECTS</h2>
            </div>
            <ScrollStack items={projects} />
        </section>
    );
}

const TestimonialsSection = () => {
    const headingRef = useRef(null);
    const galleryContainerRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: 'top bottom-=150',
                end: 'bottom top+=150',
                scrub: 1,
            },
        });

        tl.to(heading, {
            '--bg-size': '100%',
            duration: 1,
        });

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    const galleryItems = testimonials.map(t => ({
      image: t.image,
      text: `${t.text} - ${t.author}`
    }));


    return (
        <section id="clients" className="relative bg-black text-white py-20 overflow-hidden">
            <div className="container mx-auto text-center mb-12">
                 <div className="flex justify-center items-center gap-4">
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <LottiePlayer
                            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/lottie.json"
                            style={{ height: 100, width: 100 }}
                        />
                    </motion.div>
                    <h2 ref={headingRef} className="animated-heading text-4xl md:text-6xl font-black tracking-tighter">
                        WHAT CLIENTS ARE SAYING
                    </h2>
                </div>
            </div>
            <div ref={galleryContainerRef} className='relative h-[600px]'>
               <CircularGallery items={galleryItems} autoScrollDirection="left" />
               <CircularGallery items={[...galleryItems].reverse()} autoScrollDirection="right" />
            </div>
        </section>
    );
};

const ShowreelSection = () => {
    const headingRef = useRef(null);

    useLayoutEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: 'top bottom-=100',
                end: 'bottom top+=100',
                scrub: 1,
            },
        });

        tl.to(heading, {
            '--bg-size': '100%',
            duration: 1,
        });

        return () => {
          tl.kill();
          ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    return (
        <section id="showreel" className="relative bg-black text-white py-20">
            <div className="container mx-auto text-center mb-12">
                 <h2 ref={headingRef} className="animated-heading text-6xl md:text-8xl font-black tracking-tighter">
                    SHOWREEL
                </h2>
            </div>
            <div className="container mx-auto flex justify-center">
                <video 
                    src="https://res.cloudinary.com/dvfyk41km/video/upload/v1764338468/Angry_Background_Removal_for_Portfolio_idweme.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    className="rounded-lg w-full max-w-4xl"
                />
            </div>
        </section>
    );
};


export default function Home() {
  return (
    <div className="bg-black text-foreground">
      <main>
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
          
          <div className="absolute top-0 left-0 right-0 container mx-auto flex items-center justify-center p-4 z-10">
            <div className="hidden md:flex items-center space-x-16">
                {navLinks.map((link) => (
                <Link href={link.href} key={link.label} className="text-sm font-medium text-white hover:text-gray-300 transition-colors tracking-widest">
                    {link.label}
                </Link>
                ))}
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[11vw] font-black bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent tracking-tighter leading-none w-full mt-36">
            HI, I'M MADHAV
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 w-full max-w-6xl">
            <div className="md:text-left text-gray-400 text-sm sm:text-base max-w-xs mx-auto md:mx-0">
              <p className="mb-8">A Full-Stack Developer building fast, modern & scalable web applications with clean UI & powerful backend.</p>
                <motion.div
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -5 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="origin-bottom-left"
                >
                    <LogoLoop
                        logos={techLogos}
                        speed={100}
                        direction="left"
                        logoHeight={28}
                        gap={40}
                        fadeOut
                        fadeOutColor="#000000"
                        scaleOnHover
                        ariaLabel="Technologies used"
                    />
                </motion.div>
            </div>
            <div className="-mt-32">
              <TiltableImage
                src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764312114/Gemini_Generated_Image_hriipthriipthrii-removebg-preview_gpwz90.png"
                alt="3D character"
                className="w-[45rem] h-[45rem] object-contain"
              />
            </div>
            <div className="flex justify-center md:justify-end">
                <Link href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
                CONTACT ME
                </Link>
            </div>
          </div>
        </section>
        
        <AboutSection />

        <ProjectsSection />

        <TestimonialsSection />

        <ShowreelSection />

      </main>
    </div>
  );
}
