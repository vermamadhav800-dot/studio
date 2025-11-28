

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { TiltableImage } from '@/components/ui/TiltableImage';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFirebase } from 'react-icons/si';
import { motion } from 'framer-motion';
import { ScrollStack } from '@/components/ui/ScrollStack';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import CircularGallery from '@/components/ui/CircularGallery';
import { fontHeading } from '@/app/fonts';
import { cn } from '@/lib/utils';
import ScrollFloat from '@/components/ui/ScrollFloat';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Facebook, Instagram, Dribbble, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
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

            <ScrollFloat
              textClassName='text-white'
              animationDuration={1}
              ease='back.inOut(2)'
              scrollStart='center bottom+=50%'
              scrollEnd='bottom bottom-=40%'
              stagger={0.03}
            >
                ABOUT ME
            </ScrollFloat>
            
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
                    <ScrollFloat
                        textClassName={cn("!text-6xl md:!text-8xl !text-white", fontHeading.className)}
                        stagger={0.02}
                    >
                        MY PROJECTS
                    </ScrollFloat>
                    <LottiePlayer
                        src="https://lottie.host/72a75bbe-a1bf-45a3-96f1-6f25aa1666c2/lweYmnuodz.json"
                        style={{ height: 100, width: 100 }}
                        loop
                        autoplay
                    />
                </div>
            </div>
            <ScrollStack items={projects} />
        </section>
    );
}

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="bg-black p-6 rounded-2xl border border-white/20 flex flex-col items-start gap-4 w-[350px] mx-4">
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
    const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
    const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

    return (
        <section id="clients" className="relative bg-black text-white py-20 overflow-hidden">
            <div className="container mx-auto text-center mb-20">
                 <div className="flex justify-center items-center gap-4">
                    <ScrollFloat
                        textClassName={cn("!text-4xl md:!text-6xl !text-white", fontHeading.className)}
                        stagger={0.02}
                    >
                        WHAT CLIENTS ARE SAYING
                    </ScrollFloat>
                     <LottiePlayer
                        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/lottie.json"
                        style={{ height: 100, width: 100 }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <LogoLoop
                    logos={firstRow}
                    direction="left"
                    speed={50}
                    gap={0}
                    renderItem={(item) => <TestimonialCard testimonial={item as any} />}
                />
                <LogoLoop
                    logos={secondRow}
                    direction="right"
                    speed={50}
                    gap={0}
                    renderItem={(item) => <TestimonialCard testimonial={item as any} />}
                />
            </div>
        </section>
    );
};

const ContactSection = () => {
    return (
        <footer id="contact" className="relative bg-[#0E0E0E] text-black py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-12 relative">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, y: -50, x: 50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute -top-16 -right-16 w-40 h-40"
                >
                    <Image src="https://picsum.photos/seed/yellow-shape/200/200" alt="3D yellow shape" data-ai-hint="3d abstract shape" width={160} height={160} />
                </motion.div>
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, y: 50, x: -50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="absolute -bottom-16 -left-16 w-32 h-32"
                >
                    <Image src="https://picsum.photos/seed/purple-shape/200/200" alt="3D purple shape" data-ai-hint="3d abstract shape" width={128} height={128} />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Side */}
                    <div className="flex flex-col justify-center">
                        <ScrollFloat
                          textClassName='!text-black !text-left !text-5xl md:!text-7xl !leading-tight'
                          stagger={0.02}
                          scrollStart="top bottom-=10%"
                          scrollEnd="bottom center"
                        >
                            LET'S GET IN TOUCH
                        </ScrollFloat>
                        <a href="mailto:alex@3dturner.or" className="text-gray-600 mt-4 text-lg hover:underline">alex@3dturner.or</a>
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
             <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8 text-sm text-gray-500 flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Madhav. All Rights Reserved.</p>
                     <div className="flex items-center gap-4">
                         <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF5733"/>
                        </svg>
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="20" rx="10" fill="#33FF57"/>
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="10" width="20" height="10" fill="#3357FF"/>
                            <rect width="10" height="10" fill="#FF33A1"/>
                        </svg>
                         <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V20H0V10Z" fill="#F0FF33"/>
                        </svg>
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

          <h1 className={cn("text-6xl md:text-8xl lg:text-[11vw] font-black bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent tracking-tighter leading-none w-full mt-36", fontHeading.className)}>
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

        <ContactSection />

      </main>
    </div>
  );
}

    

    
