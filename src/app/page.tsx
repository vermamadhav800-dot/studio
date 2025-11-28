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
        
        <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 py-24">
            <motion.div initial={{ y: 50, x: -50 }} whileInView={{ y: 0, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute top-1/4 left-10 md:left-20 w-24 h-24 md:w-32 md:h-32">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764312210/Gemini_Generated_Image_w9g8dnw9g8dnw9g8-removebg-preview_oprjif.png" alt="3D glass shape" data-ai-hint="3d glass shape" width={200} height={200} className="object-contain" />
            </motion.div>
            <motion.div initial={{ y: 50, x: 50 }} whileInView={{ y: 0, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute top-1/4 right-10 md:right-20 w-24 h-24 md:w-32 md:h-32">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764312216/Gemini_Generated_Image_qf5r2fqf5r2fqf5r-removebg-preview_j0yvlw.png" alt="3D geometric shape" data-ai-hint="3d geometric shape" width={200} height={200} className="object-contain" />
            </motion.div>
            <motion.div initial={{ y: 50, x: -50 }} whileInView={{ y: 0, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute bottom-1/4 left-10 md:left-40 w-20 h-20 md:w-24 md:h-24">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764312204/Gemini_Generated_Image_g9yusbg9yusbg9yu-removebg-preview_s6a7yp.png" alt="3D heart shape" data-ai-hint="3d heart shape" width={150} height={150} className="object-contain" />
            </motion.div>
            <motion.div initial={{ y: 50, x: 50 }} whileInView={{ y: 0, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="absolute bottom-1/4 right-10 md:right-40 w-20 h-20 md:w-24 md:h-24">
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="3D flower shape" data-ai-hint="3d abstract shape" width={150} height={150} className="object-contain" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8"
            >
              ABOUT ME
            </motion.h2>
            <div className="max-w-2xl">
              <ScrollReveal textClassName="text-base md:text-lg text-gray-300" containerClassName="mb-12">
                  With over five years of experience in design, I specialize in branding, web design, and user experience. I love collaborating with businesses that want to stand out and showcase their best side. Let&apos;s create something amazing together!
              </ScrollReveal>
            </div>
            <Link href="#contact" className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform shadow-lg">
                CONTACT ME
            </Link>
        </section>

      </main>
    </div>
  );
}
