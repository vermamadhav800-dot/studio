import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Services from '@/components/sections/services';
import FlowingMenu from '@/components/ui/FlowingMenu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Contact from '@/components/sections/contact';

const projectItems = PlaceHolderImages.filter(
  (image) => image.id.startsWith('project-')
).map((image, index) => ({
  link: '#',
  text: image.description.replace(' screenshot.', ''),
  image: image.imageUrl,
}));


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
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
