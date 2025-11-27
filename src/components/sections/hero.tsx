import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const profilePic = PlaceHolderImages.find((img) => img.id === 'profile-picture');

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <div className="container flex flex-col-reverse items-center gap-12 text-center lg:flex-row lg:text-left">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
            Alex Doe
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl lg:mx-0">
            A passionate and creative Full-Stack Developer with a knack for building beautiful, user-friendly, and efficient web applications. I thrive on turning complex problems into simple, elegant solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#projects">View My Work</Link>
            </Button>
          </div>
        </div>
        <div className="flex-shrink-0">
          {profilePic && (
            <Image
              src={profilePic.imageUrl}
              alt={profilePic.description}
              width={300}
              height={300}
              data-ai-hint={profilePic.imageHint}
              className="rounded-full object-cover border-4 border-primary/20 shadow-lg"
              priority
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
