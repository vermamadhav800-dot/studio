
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { TiltableImage } from '@/components/ui/TiltableImage';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollStack } from '@/components/ui/ScrollStack';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import CircularGallery from '@/components/ui/CircularGallery';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import ScrollFloat from '@/components/ui/ScrollFloat';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Facebook, Instagram, Dribbble, Linkedin, Mail, Phone, MapPin, Database, Code, Wind, Atom, ToyBrick, DraftingCompass } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";


const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CLIENTS', href: '#clients' },
  { label: 'CONTACT', href: '#contact' },
];

const techLogos = [
    { node: <Atom />, title: "React", href: "https://react.dev" },
    { node: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7"><title>Next.js</title><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.084 18.511-1.33-2.457v-5.96h1.33v4.54l4.136-6.73h1.4v6.073l1.329 2.344v5.84h-1.329v-4.426l-4.136 6.616h-1.4z" fill="currentColor"/></svg>, title: "Next.js", href: "https://nextjs.org" },
    { node: <Code/>, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <Wind/>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <ToyBrick />, title: "Node.js", href: "https://nodejs.org" },
    { node: <Database/>, title: "Firebase", href: "https://firebase.google.com" },
  ];

const projects = [
    {
        id: '01',
        client: 'Madhav Verma',
        liveProjectLink: 'https://estate-floww.vercel.app/',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-1-large')!,
            PlaceHolderImages.find(p => p.id === 'project-1-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-1-small-2')!,
        ],
    },
    {
        id: '02',
        client: 'Aura Creations',
        liveProjectLink: 'https://studio333-lime.vercel.app/',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-2-large')!,
            PlaceHolderImages.find(p => p.id === 'project-2-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-2-small-2')!,
        ],
    },
    {
        id: '03',
        client: 'Portfolio',
        liveProjectLink: 'https://madhav-portfolio-sepia.vercel.app/',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-3-large')!,
            PlaceHolderImages.find(p => p.id === 'project-3-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-3-small-2')!,
        ],
    },
    {
        id: '04',
        client: 'Madhav Verma',
        liveProjectLink: 'https://studio333-lime.vercel.app/',
        images: [
            PlaceHolderImages.find(p => p.id === 'project-4-large')!,
            PlaceHolderImages.find(p => p.id === 'project-4-small-1')!,
            PlaceHolderImages.find(p => p.id === 'project-4-small-2')!,
        ],
    },
];

const testimonials = [
  {
    image: 'https://picsum.photos/seed/10/100/100',
    text: 'Madhav is a design wizard. He took our vague ideas and turned them into a masterpiece. Pure magic!',
    author: 'Jane Doe',
    title: 'CEO of Rylinx Studios',
  },
  {
    image: 'https://picsum.photos/seed/12/100/100',
    text: 'Working with Madhav was a dream. The communication was seamless and the results were beyond our expectations.',
    author: 'John Smith',
    title: 'Founder of Aura Creations',
  },
  {
    image: 'https://picsum.photos/seed/14/100/100',
    text: 'The level of creativity and polish is insane. Our new branding has never looked better.',
    author: 'Emily White',
    title: 'Marketing Head at Quantum',
  },
  {
    image: 'https://picsum.photos/seed/16/100/100',
    text: 'Incredible attention to detail. Every pixel is perfect. Highly recommend for any project, big or small.',
    author: 'Michael Brown',
    title: 'CTO of Nova Digital',
  },
   {
    image: 'https://picsum.photos/seed/18/100/100',
    text: 'A true professional. Delivered on time and exceeded all our goals. We\'ll be back for more!',
    author: 'Sarah Green',
    title: 'Project Manager',
  },
   {
    image: 'https://picsum.photos/seed/20/100/100',
    text: 'The 3D work is simply breathtaking. It has added a whole new dimension to our product showcase.',
    author: 'David Black',
    title: 'Creative Director',
  },
];

const AnimatedTitle = () => {
  const { scrollYProgress } = useScroll();
  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 0.2],
    ['100% 0%', '0% 0%']
  );

  return (
    <motion.h1
      className={cn(
        "text-6xl md:text-8xl lg:text-[11vw] font-black bg-clip-text text-transparent tracking-tighter leading-none w-full",
        fontHeading.className
      )}
      style={{
        backgroundImage: 'linear-gradient(to right, white 50%, #4a4a4a 50%)',
        backgroundSize: '200% 100%',
        backgroundPosition,
      }}
    >
      HI, I'M MADHAV
    </motion.h1>
  );
};

const AboutSection = () => {
    const aboutText = "With over five years of experience in design, I specialize in branding, web design, and user experience. I love collaborating with businesses that want to stand out and showcase their best side. Let's create something amazing together!";

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 py-24">
             <motion.div 
                initial={{ x: -100, opacity: 0 }} 
                whileInView={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} 
                className="absolute top-1/4 left-10 md:left-20 w-40 h-40 md:w-56 md:h-56"
            >
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d abstract shape" width={224} height={224} className="object-contain" />
            </motion.div>
            <motion.div 
                initial={{ x: 100, opacity: 0 }} 
                whileInView={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="absolute top-1/3 right-10 md:right-20 w-40 h-40 md:w-56 md:h-56"
            >
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d abstract shape" width={224} height={224} className="object-contain" />
            </motion.div>
            <motion.div 
                initial={{ x: -100, opacity: 0 }} 
                whileInView={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }} 
                className="absolute bottom-1/4 left-10 md:left-40 w-32 h-32 md:w-44 md:h-44"
            >
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d abstract shape" width={176} height={176} className="object-contain" />
            </motion.div>
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }} 
                className="absolute bottom-1/3 right-10 md:right-40 w-32 h-32 md:w-44 md:h-44"
            >
                <Image src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764315743/Gemini_Generated_Image_50a0yl50a0yl50a0__1_-removebg-preview_ff0zb0.png" alt="Floating 3D element" data-ai-hint="3d abstract shape" width={176} height={176} className="object-contain" />
            </motion.div>
            
            <div className="flex justify-center items-center gap-4">
                 <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={cn("text-6xl md:text-8xl text-white font-black", fontHeading.className)}
                >
                    ABOUT ME
                </motion.h2>
                <Image
                    src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764351394/512_4_rz3wep.gif"
                    alt="waving character"
                    width={100}
                    height={100}
                    unoptimized
                />
            </div>
            
            <div className="max-w-2xl text-gray-300 mt-8">
                <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                >
                    {aboutText}
                </ScrollReveal>
            </div>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link href="#contact" className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold hover:scale-105 transition-transform shadow-lg mt-12 inline-block">
                    CONTACT ME
                </Link>
            </motion.div>
        </section>
    )
}

const ProjectsSection = () => {
    return (
        <section id="projects" className="relative bg-black text-white py-20">
            <div className="container mx-auto text-center mb-12">
                <div className="flex justify-center items-center gap-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={cn("text-6xl md:text-8xl text-white", fontHeading.className)}
                    >
                        MY PROJECTS
                    </motion.h2>
                    <Image
                        src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764351139/512_3_uzgibg.gif"
                        alt="pointing character"
                        width={100}
                        height={100}
                        unoptimized
                    />
                </div>
            </div>
            <ScrollStack items={projects} />
        </section>
    );
}

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="bg-black p-6 rounded-2xl border border-white/20 flex flex-col items-start gap-4 w-[350px] shrink-0">
        <div className="flex items-center gap-4">
            <Image
                src={testimonial.image}
                alt={testimonial.author}
                width={56}
                height={56}
                className="rounded-full object-cover"
            />
            <div>
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
            </div>
        </div>
        <p className="text-gray-300 text-left text-sm leading-relaxed">
           "{testimonial.text}"
        </p>
    </div>
);


const TestimonialsSection = () => {
    const firstRow = testimonials.slice(0, 2);
    const secondRow = testimonials.slice(2, 4);
    const thirdRow = testimonials.slice(4, 6);
    
    const duplicatedFirstRow = [...firstRow, ...firstRow, ...firstRow, ...firstRow, ...firstRow];
    const duplicatedSecondRow = [...secondRow, ...secondRow, ...secondRow, ...secondRow, ...secondRow];
    const duplicatedThirdRow = [...thirdRow, ...thirdRow, ...thirdRow, ...thirdRow, ...thirdRow];

    return (
        <section id="clients" className="relative bg-black text-white py-20 overflow-hidden">
            <div className="container mx-auto text-center mb-20">
                 <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={cn("text-4xl md:text-6xl text-white", fontHeading.className)}
                    >
                        WHAT CLIENTS ARE SAYING
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, rotate: -15, x: 50 }}
                        whileInView={{ opacity: 1, rotate: 0, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <Image
                            src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764350279/512_acmd9n.gif"
                            alt="animated character"
                            width={100}
                            height={100}
                            unoptimized
                        />
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex w-max items-center gap-4 animate-scroll-left">
                    {duplicatedFirstRow.map((testimonial, index) => (
                        <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
                    ))}
                </div>
                <div className="flex w-max items-center gap-4 animate-scroll-right">
                    {duplicatedSecondRow.map((testimonial, index) => (
                        <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
                    ))}
                </div>
                <div className="flex w-max items-center gap-4 animate-scroll-left">
                    {duplicatedThirdRow.map((testimonial, index) => (
                        <TestimonialCard key={`third-${index}`} testimonial={testimonial} />
                    ))}
                </div>
            </div>
            <motion.div 
                initial={{ x: -100, opacity: 0, rotate: -15 }}
                whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-8 left-8 md:bottom-16 md:left-16 w-32 h-32 md:w-48 md:h-48 z-20"
            >
                <Image 
                    src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764350615/512_1_tbjopp.gif"
                    alt="animated character"
                    width={200}
                    height={200}
                    unoptimized
                />
            </motion.div>
        </section>
    );
};

const ContactSection = () => {
    return (
        <footer id="contact" className="relative bg-[#0E0E0E] text-white pt-24">
            <div className="max-w-6xl mx-auto bg-white rounded-t-3xl p-8 md:p-12 relative text-black">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, y: -50, x: 50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute -top-16 -right-16 w-40 h-40 hidden md:block"
                >
                    <Image src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764348206/Gemini_Generated_Image_otvsq2otvsq2otvs__1_-removebg-preview_zjro58.png" alt="3D yellow shape" data-ai-hint="3d abstract shape" width={160} height={160} />
                </motion.div>
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, y: 50, x: -50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="absolute -bottom-16 -left-16 w-32 h-32 hidden md:block"
                >
                    <Image src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764348488/Gemini_Generated_Image_qjltt8qjltt8qjlt__1_-removebg-preview_k8tbgr.png" alt="3D red heart shape" data-ai-hint="3d abstract shape" width={128} height={128} unoptimized/>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Side */}
                    <div className="flex flex-col justify-center">
                        <motion.h2 
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={cn('!text-black !text-left !text-5xl md:!text-7xl !leading-tight', fontHeading.className)}
                        >
                            LET'S<br />GET IN<br />TOUCH
                        </motion.h2>
                        <a href="mailto:vermamadhav800@gmail.com" className="text-gray-600 mt-4 text-lg hover:underline">vermamadhav800@gmail.com</a>
                    </div>

                    {/* Right Side - Form */}
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="full-name" className="text-sm font-medium text-gray-500">Full Name*</label>
                                <Input id="full-name" name="full-name" type="text" className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-primary !h-10" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-500">Phone</label>
                                <Input id="phone" name="phone" type="tel" className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-primary !h-10" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email*</label>
                            <Input id="email" name="email" type="email" className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-primary !h-10" />
                        </div>
                        <div>
                            <label htmlFor="message" className="text-sm font-medium text-gray-500">Message</label>
                            <Textarea id="message" name="message" rows={3} className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-primary !min-h-[60px]" />
                        </div>
                        <div>
                            <Button type="submit" className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-base font-semibold hover:bg-primary/90 transition-transform hover:scale-105">
                                SEND
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
             <div className="bg-black text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <Image 
                                src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764347217/Angry_Background_Removal_for_Portfolio-VEED_2_nidfnm.gif"
                                alt="animated character"
                                width={200}
                                height={80}
                                unoptimized
                            />
                        </div>
                        <div className="flex gap-8 items-center">
                            <div>
                                <h4 className="font-semibold text-gray-400 mb-2">SOCIAL</h4>
                                <div className="flex flex-col gap-1 text-sm">
                                    <a href="https://github.com/vermamadhav800-dot" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
                                    <a href="https://www.instagram.com/madhav_verma98/?next=%2F" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
                                    <a href="#" className="hover:text-primary">Facebook</a>
                                    <a href="#" className="hover:text-primary">Dribbble</a>
                                    <a href="#" className="hover:text-primary">LinkedIn</a>
                                </div>
                            </div>
                             <div>
                                <h4 className="font-semibold text-gray-400 mb-2">CONTACT</h4>
                                <div className="text-sm space-y-1">
                                    <p>vermamadhav800@gmail.com</p>
                                    <p>9469238102</p>
                                    <p>Madhav Verma</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#9333EA"/>
                                    <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white"/>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="20" fill="#34D399"/>
                                    <circle cx="12" cy="12" r="4" fill="white"/>
                                    <circle cx="28" cy="12" r="4" fill="white"/>
                                    <circle cx="12" cy="28" r="4" fill="white"/>
                                    <circle cx="28" cy="28" r="4" fill="white"/>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H40C40 22.0914 22.0914 40 0 40V0Z" fill="#A78BFA"/>
                                </svg>
                                <svg width="50" height="50" viewBox="0-0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="20" fill="#FBBF24"/>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 20L20 0L40 20L20 40L0 20Z" fill="#F472B6"/>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 0L40 40H0L20 0Z" fill="#60A5FA"/>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="10" fill="#EC4899" />
                                    <circle cx="20" cy="20" r="20" stroke="#EC4899" strokeWidth="4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


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
            <div className="flex justify-center items-center gap-4 mt-36">
              <AnimatedTitle />
              <Image 
                src="https://res.cloudinary.com/dvfyk41km/image/upload/v1764350989/512_2_tazgqp.gif"
                alt="waving character"
                width={100}
                height={100}
                unoptimized
                className="hidden md:block"
              />
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 w-full max-w-6xl mt-8">
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

        <ContactSection />

      </main>
    </div>
  );
}

    