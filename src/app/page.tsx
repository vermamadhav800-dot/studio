
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { TiltableImage } from '@/components/ui/TiltableImage';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'CUSTOMERS', href: '#customers' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const PlaceholderSection = ({ id, label }: { id: string; label: string }) => (
  <section id={id} className="min-h-screen flex items-center justify-center border-t border-gray-800">
    <h2 className="text-4xl font-bold text-gray-500">{label}</h2>
  </section>
);


export default function Home() {
  return (
    <div className="bg-black text-foreground">
      <header className="fixed top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <div className="text-lg font-bold">
            <Link href="#">MADHAV</Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.label} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-200 tracking-tighter leading-none mb-4">
            HI, I'M MADHAV
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 w-full max-w-6xl">
            <p className="md:text-left text-gray-400 text-sm sm:text-base max-w-xs mx-auto md:mx-0">
              A 3D DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS
            </p>

            <TiltableImage
              src="https://res.cloudinary.com/dqdxd8ixr/image/upload/v1764312114/Gemini_Generated_Image_hriipthriipthrii-removebg-preview_gpwz90.png"
              alt="3D character"
              className="w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] object-contain"
            />
            
            <div className="flex justify-center md:justify-end">
                <Link href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
                CONTACT ME
                </Link>
            </div>
          </div>
        </section>

        <PlaceholderSection id="about" label="ABOUT" />
        <PlaceholderSection id="customers" label="CUSTOMERS" />
        <PlaceholderSection id="projects" label="PROJECTS" />
        <PlaceholderSection id="contact" label="CONTACT" />

      </main>
    </div>
  );
}
