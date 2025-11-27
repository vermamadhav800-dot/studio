
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Services from '@/components/sections/services';
import FlowingMenu from '@/components/ui/FlowingMenu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Contact from '@/components/sections/contact';
import PillNav from '@/components/ui/PillNav';
import { TerminalSquare } from 'lucide-react';
import Link from 'next/link';
import CurvedLoop from '@/components/ui/CurvedLoop';

const projectItems = PlaceHolderImages.filter(
  (image) => image.id.startsWith('project-')
).map((image, index) => ({
  link: '#',
  text: image.description.replace(' screenshot.', ''),
  image: image.imageUrl,
}));

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];


export default function Home() {
  const skillsText = "React ✦ Next.js ✦ Node.js ✦ TypeScript ✦ GraphQL ✦ PostgreSQL ✦ Docker ✦ UI/UX Design ✦ Web Design ✦ Tailwind CSS ✦ Figma ✦ Server Actions ✦";
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <PillNav
        logo={
          <Link href="/admin" aria-label="Admin Panel">
            <TerminalSquare />
          </Link>
        }
        logoHomeLink="#"
        items={navLinks}
        activeHref="#home"
        baseColor="hsl(var(--background))"
        pillColor="hsl(var(--foreground))"
        hoveredPillTextColor="hsl(var(--background))"
        pillTextColor="hsl(var(--background))"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      />
      <main className="flex-grow">
        <Hero />
        <CurvedLoop 
          marqueeText={skillsText}
          speed={0.5}
          curveAmount={80}
          interactive={true}
        />
        <About />
        <Skills />
        <Services />
        <div id="projects" className="h-[600px] relative">
          <FlowingMenu items={projectItems} />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
