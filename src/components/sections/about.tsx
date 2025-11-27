import { Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Section } from '@/components/section';

const workExperience = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: 'Leading the development of cutting-edge user interfaces and collaborating with cross-functional teams to deliver high-quality products.'
  },
  {
    title: 'Full-Stack Developer',
    company: 'Web Innovators',
    period: '2020 - 2022',
    description: 'Developed and maintained full-stack web applications, from database design to UI implementation, for a variety of clients.'
  },
  {
    title: 'Software Engineer Intern',
    company: 'CodeCrafters',
    period: 'Summer 2019',
    description: 'Assisted the development team in building and testing new features for a flagship product.'
  },
];

const education = [
    {
      degree: 'M.S. in Computer Science',
      institution: 'Stanford University',
      year: '2020',
    },
    {
      degree: 'B.S. in Software Engineering',
      institution: 'University of California, Berkeley',
      year: '2018',
    },
];

export default function About() {
  return (
    <Section id="about" className="bg-muted">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">About Me</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          A glimpse into my professional journey and academic background.
        </p>
      </div>
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-headline"><Briefcase className="text-primary" /> Work Experience</h3>
          <div className="relative flex flex-col gap-8">
            <div className="absolute left-3.5 top-0 h-full w-px bg-border"></div>
            {workExperience.map((job, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Briefcase className="h-4 w-4" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company} / {job.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-headline"><GraduationCap className="text-primary" /> Education</h3>
           <div className="relative flex flex-col gap-8">
            <div className="absolute left-3.5 top-0 h-full w-px bg-border"></div>
            {education.map((edu, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <GraduationCap className="h-4 w-4" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{edu.degree}</CardTitle>
                    <CardDescription>{edu.institution} / Graduated {edu.year}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
