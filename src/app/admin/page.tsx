'use client';

import { useForm } from 'react-hook-form';
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
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const heroSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

export default function AdminPage() {
  const { toast } = useToast();
  
  const heroForm = useForm<z.infer<typeof heroSchema>>({
    resolver: zodResolver(heroSchema),
    // TODO: Load initial values from a data source
    defaultValues: {
      title: 'Madhav Verma',
      description: 'A passionate and creative Full-Stack Developer with a knack for building beautiful, user-friendly, and efficient web applications. I thrive on turning complex problems into simple, elegant solutions.',
    },
  });

  const { isSubmitting: isHeroSubmitting } = heroForm.formState;

  async function onHeroSubmit(values: z.infer<typeof heroSchema>) {
    console.log('Saving Hero Section Data:', values);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Hero Section Saved!',
      description: 'Your hero section content has been updated locally.',
    });
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold font-headline mb-8">Admin Panel</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline">Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...heroForm}>
            <form onSubmit={heroForm.handleSubmit(onHeroSubmit)} className="space-y-6">
              <FormField
                control={heroForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Heading</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={heroForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A little bit about yourself..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isHeroSubmitting}>
                {isHeroSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Hero Section'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator />

      {/* Other sections will be added here */}

    </div>
  );
}
