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
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <PillNav
        logo={<TerminalSquare />}
        items={navLinks}
        activeHref="#home"
        baseColor="hsl(var(--foreground))"
        pillColor="hsl(var(--background))"
        hoveredPillTextColor="hsl(var(--foreground))"
        pillTextColor="hsl(var(--foreground))"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      />
      <main className="flex-grow">
        <Hero />
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
