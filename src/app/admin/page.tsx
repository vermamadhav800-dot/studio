'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Schemas for each section
const heroSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  profileName: z.string().min(2),
  profileTitle: z.string().min(2),
  profileHandle: z.string(),
  profileStatus: z.string(),
  avatarUrl: z.string().url(),
});

const experienceSchema = z.object({
  role: z.string().min(2),
  company: z.string().min(2),
  period: z.string(),
  description: z.string().min(10),
  tags: z.string(),
});

const educationSchema = z.object({
  degree: z.string().min(2),
  institution: z.string().min(2),
  period: z.string(),
  description: z.string().min(10),
  tags: z.string(),
});

const skillsSchema = z.object({
  skills: z.array(z.object({ value: z.string().min(1) })),
});

const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
});

const projectSchema = z.object({
  text: z.string().min(2),
  image: z.string().url(),
});

const adminSchema = z.object({
  hero: heroSchema,
  workExperience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: skillsSchema,
  services: z.array(serviceSchema),
  projects: z.array(projectSchema),
});


export default function AdminPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      hero: {
        title: 'Madhav Verma',
        description: 'A passionate and creative Full-Stack Developer with a knack for building beautiful, user-friendly, and efficient web applications. I thrive on turning complex problems into simple, elegant solutions.',
        profileName: 'Madhav Verma',
        profileTitle: 'Full-Stack Developer',
        profileHandle: 'madhavverma',
        profileStatus: 'Available for hire',
        avatarUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjQyMjAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      workExperience: [
        { role: 'Lead Frontend Engineer', company: 'Vercel', period: '2023 - Present', description: 'Leading the development of a next-generation deployment platform. Focused on performance, developer experience, and building a more open web.', tags: 'Next.js, React, TypeScript, Edge' },
        { role: 'Senior Software Engineer', company: 'Stripe', period: '2021 - 2023', description: 'Engineered robust payment APIs and developer-facing tools. Contributed to core infrastructure and improved system reliability for millions of users.', tags: 'React, API Design, Ruby, Payments' },
        { role: 'Frontend Developer', company: 'Shopify', period: '2019 - 2021', description: 'Built and optimized high-traffic e-commerce features, focusing on storefront performance and creating seamless user experiences for merchants and customers.', tags: 'React, GraphQL, Performance' },
      ],
      education: [
          { degree: 'M.S. in Computer Science', institution: 'Stanford University', period: '2017 - 2019', description: 'Thesis on real-time data visualization for large-scale systems. Awarded for academic excellence and contributions to open-source projects.', tags: 'AI, HCI, Systems Design' },
          { degree: 'B.S. in Software Engineering', institution: 'University of California, Berkeley', period: '2013 - 2017', description: 'Graduated with honors. Led a team to win the annual hackathon with a project focused on decentralized identity verification.', tags: 'Data Structures, Algorithms, Web Dev' },
      ],
      skills: {
        skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Docker', 'UI/UX Design', 'Web Design', 'Tailwind CSS', 'Figma', 'Server Actions'].map(s => ({ value: s })),
      },
      services: [
        { title: 'UI/UX Design', description: 'Crafting intuitive and visually appealing user interfaces that enhance user satisfaction and engagement. From wireframes to high-fidelity prototypes.' },
        { title: 'Web Design', description: 'Creating modern and responsive websites from scratch. I focus on clean, elegant designs that are optimized for all devices and screen sizes.' },
        { title: 'Web Development', description: 'Building robust and scalable full-stack web applications. I use modern technologies to deliver high-performance, secure, and maintainable code.' },
      ],
      projects: [
        { text: 'E-commerce platform', image: 'https://images.unsplash.com/photo-1708939582011-ddbd2ff61b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3ZWJzaXRlJTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3NjQxOTQ3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { text: 'Task management app', image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzb2Z0d2FyZSUyMGludGVyZmFjZXxlbnwwfHx8fDE3NjQyMDc4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { text: 'Portfolio generator tool', image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3ZWIlMjBhcHBsaWNhdGlvbnxlbnwwfHx8fDE3NjQyNDc3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
    },
  });

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({ control: form.control, name: 'workExperience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills.skills' });
  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control: form.control, name: 'services' });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: 'projects' });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof adminSchema>) {
    console.log('Saving Full Portfolio Data:', values);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Portfolio Content Saved!',
      description: 'Your content has been updated locally.',
    });
  }
  
  const FieldArraySection = ({ title, fields, remove, append, newObject, renderItem }) => (
    <Card className="mb-4">
      <CardHeader>
          <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => renderItem(field, index))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append(newObject)}
        >
          Add {title.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold font-headline mb-8">Admin Panel</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="multiple" defaultValue={['hero']} className="w-full">

            <AccordionItem value="hero">
              <AccordionTrigger className="text-2xl font-headline">Hero Section</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <FormField control={form.control} name="hero.title" render={({ field }) => (<FormItem><FormLabel>Main Heading</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hero.description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hero.profileName" render={({ field }) => (<FormItem><FormLabel>Profile Card Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hero.profileTitle" render={({ field }) => (<FormItem><FormLabel>Profile Card Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={formcontrol} name="hero.profileHandle" render={({ field }) => (<FormItem><FormLabel>Profile Card Handle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hero.profileStatus" render={({ field }) => (<FormItem><FormLabel>Profile Card Status</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hero.avatarUrl" render={({ field }) => (<FormItem><FormLabel>Avatar Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about">
              <AccordionTrigger className="text-2xl font-headline">About Section</AccordionTrigger>
              <AccordionContent>
                <FieldArraySection
                  title="Work Experience"
                  fields={workFields}
                  remove={removeWork}
                  append={appendWork}
                  newObject={{ role: '', company: '', period: '', description: '', tags: '' }}
                  renderItem={(field, index) => (
                    <Card key={field.id} className="p-4 relative">
                        <FormField control={form.control} name={`workExperience.${index}.role`} render={({ field }) => (<FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`workExperience.${index}.period`} render={({ field }) => (<FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`workExperience.${index}.tags`} render={({ field }) => (<FormItem><FormLabel>Tags (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeWork(index)}><Trash2/></Button>
                    </Card>
                  )}
                />
                 <FieldArraySection
                  title="Education"
                  fields={eduFields}
                  remove={removeEdu}
                  append={appendEdu}
                  newObject={{ degree: '', institution: '', period: '', description: '', tags: '' }}
                  renderItem={(field, index) => (
                    <Card key={field.id} className="p-4 relative">
                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.period`} render={({ field }) => (<FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.tags`} render={({ field }) => (<FormItem><FormLabel>Tags (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2/></Button>
                    </Card>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="skills">
                <AccordionTrigger className="text-2xl font-headline">Skills Section</AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {skillFields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`skills.skills.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormControl><Input {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill(index)}><Trash2 /></Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={() => appendSkill({ value: '' })}>Add Skill</Button>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
                <AccordionTrigger className="text-2xl font-headline">Services Section</AccordionTrigger>
                <AccordionContent>
                    <FieldArraySection
                        title="Services"
                        fields={serviceFields}
                        remove={removeService}
                        append={appendService}
                        newObject={{ title: '', description: ''}}
                        renderItem={(field, index) => (
                            <Card key={field.id} className="p-4 relative">
                                <FormField control={form.control} name={`services.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={form.control} name={`services.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeService(index)}><Trash2/></Button>
                            </Card>
                        )}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects">
                <AccordionTrigger className="text-2xl font-headline">Projects Section</AccordionTrigger>
                <AccordionContent>
                    <FieldArraySection
                        title="Projects"
                        fields={projectFields}
                        remove={removeProject}
                        append={appendProject}
                        newObject={{ text: '', image: ''}}
                        renderItem={(field, index) => (
                            <Card key={field.id} className="p-4 relative">
                                <FormField control={form.control} name={`projects.${index}.text`} render={({ field }) => (<FormItem><FormLabel>Project Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={form.control} name={`projects.${index}.image`} render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeProject(index)}><Trash2/></Button>
                            </Card>
                        )}
                    />
                </AccordionContent>
            </AccordionItem>

          </Accordion>

          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-8" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save All Changes'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
    