import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'CUSTOMERS', href: '#customers' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const PlaceholderSection = ({ id, label }) => (
  <section id={id} className="min-h-screen flex items-center justify-center border-t border-gray-800">
    <h2 className="text-4xl font-bold text-gray-500">{label}</h2>
  </section>
);


export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/50 backdrop-blur-sm">
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
        <section id="home" className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto flex flex-col items-center justify-center text-center relative px-4">
            <div className="relative w-full max-w-5xl flex flex-col items-center">
              <h1 className="text-8xl md:text-[10rem] font-black uppercase text-gray-200 tracking-tighter">
                Hi, I'm Madhav
              </h1>
              <div className="mt-8 relative z-20 flex flex-col items-center">
                <p className="max-w-md text-center text-gray-400">
                  A 3D DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS
                </p>
                <Link href="#contact" className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
                  CONTACT ME
                </Link>
              </div>
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
