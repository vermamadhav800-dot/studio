'use client';
import Image from 'next/image';
import Link from 'next/link';
import { TiltableImage } from '@/components/ui/TiltableImage';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFirebase } from 'react-icons/si';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

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

        <section id="projects" className="relative bg-black text-white py-20">
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter">MY PROJECTS</h2>
            </div>
            <ScrollStack useWindowScroll itemStackDistance={30}>
                {projects.map((project, index) => (
                    <ScrollStackItem key={index} itemClassName="bg-gray-950 border border-gray-800 p-0 overflow-hidden">
                        <div className='p-6'>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl font-bold text-gray-500">{project.id}</span>
                                    <div>
                                        <p className="text-xs text-gray-400">CLIENT</p>
                                        <p className="font-semibold text-white">{project.client}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={project.liveProjectLink}>LIVE PROJECT</Link>
                                </Button>
                            </div>
                            <div className="border-b border-gray-800 mb-6"></div>
                            <div className="grid grid-cols-3 gap-4 h-[400px]">
                                <div className="col-span-2 relative rounded-lg overflow-hidden">
                                    <Image src={project.images[0].imageUrl} alt={project.images[0].description} fill className="object-cover" data-ai-hint={project.images[0].imageHint} />
                                </div>
                                <div className="col-span-1 grid grid-rows-2 gap-4">
                                    <div className="relative rounded-lg overflow-hidden">
                                        <Image src={project.images[1].imageUrl} alt={project.images[1].description} fill className="object-cover" data-ai-hint={project.images[1].imageHint} />
                                    </div>
                                    <div className="relative rounded-lg overflow-hidden">
                                        <Image src={project.images[2].imageUrl} alt={project.images[2].description} fill className="object-cover" data-ai-hint={project.images[2].imageHint} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
      </main>
    </div>
  );
}
