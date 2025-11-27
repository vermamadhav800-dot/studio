import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured online store with a custom CMS, payment gateway integration, and a responsive design for a seamless shopping experience.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    imageId: 'project-1'
  },
  {
    title: 'Task Management App',
    description: 'A SaaS product for team collaboration featuring real-time updates, project boards, and user authentication. Built for efficiency and productivity.',
    tags: ['React', 'Node.js', 'WebSocket'],
    imageId: 'project-2'
  },
  {
    title: 'Portfolio Generator',
    description: 'An interactive tool that allows users to create and customize their own professional portfolio websites with ease. Powered by modern web tech.',
    tags: ['TypeScript', 'Tailwind CSS', 'Server Actions'],
    imageId: 'project-3'
  }
];

export default function Projects() {
  return (
    <Section id="projects">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Notable Projects</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          A selection of projects that showcase my passion for development.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const projectImage = PlaceHolderImages.find((img) => img.id === project.imageId);
          return (
            <Card key={index} className="overflow-hidden group">
              <CardHeader className="p-0">
                {projectImage && (
                  <div className="aspect-video overflow-hidden">
                  <Image
                    src={projectImage.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    data-ai-hint={projectImage.imageHint}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 font-headline">{project.title}</CardTitle>
                <CardDescription className="mb-4">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                 <Link href="#" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary group-hover:underline">
                    View Project <ArrowUpRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
