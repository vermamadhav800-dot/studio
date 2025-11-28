'use client';
import Image from 'next/image';
import Link from 'next/link';
import { TiltableImage } from '@/components/ui/TiltableImage';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFirebase } from 'react-icons/si';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'CUSTOMERS', href: '#customers' },
  { label: 'PROJECTS', href: '#projects' },
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

const PlaceholderSection = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id} className="min-h-screen flex items-center justify-center border-t border-gray-800 px-4">
    {children}
  </section>
);


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

          <h1 className="text-6xl md:text-8xl lg:text-[11vw] font-black bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent tracking-tighter leading-none w-full mt-24">
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

        <PlaceholderSection id="about">
          <ScrollReveal>
            I am a passionate developer who loves to create beautiful and functional web experiences.
          </ScrollReveal>
        </PlaceholderSection>
        <PlaceholderSection id="customers">
          <ScrollReveal>
            Trusted by the best companies in the world to deliver high-quality software solutions.
          </ScrollReveal>
        </PlaceholderSection>
        <PlaceholderSection id="projects">
          <ScrollReveal>
            Here are some of the projects I'm proud to have worked on. Each one was a new challenge.
          </ScrollReveal>
        </PlaceholderSection>
        <PlaceholderSection id="contact">
          <ScrollReveal>
            Let's get in touch. I'm always open to discussing new projects and creative ideas.
          </ScrollReveal>
        </PlaceholderSection>

      </main>
    </div>
  );
}
