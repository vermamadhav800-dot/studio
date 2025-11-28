import Image from 'next/image';
import Link from 'next/link';

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
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
          <h1 className="text-8xl md:text-[18rem] font-black uppercase text-gray-200 tracking-tighter absolute top-10 md:top-20 z-0">
            Hi, I'm Madhav
          </h1>
          <div className="relative z-10 flex flex-col items-center justify-center pt-24 md:pt-40">
            <Image
              src="https://res.cloudinary.com/demtlzrii/image/upload/v1764311377/image-removebg-preview_iehyjw.png"
              alt="3D character"
              width={500}
              height={500}
              className="w-64 h-64 md:w-96 md:h-96 object-contain"
              priority
            />
            <p className="max-w-md text-gray-400 mt-4 px-4">
              A 3D DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS
            </p>
            <Link href="#contact" className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
              CONTACT ME
            </Link>
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
