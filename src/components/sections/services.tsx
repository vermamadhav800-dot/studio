import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';
import { Code, Palette, MonitorSmartphone } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and visually appealing user interfaces that enhance user satisfaction and engagement. From wireframes to high-fidelity prototypes.'
  },
  {
    icon: MonitorSmartphone,
    title: 'Web Design',
    description: 'Creating modern and responsive websites from scratch. I focus on clean, elegant designs that are optimized for all devices and screen sizes.'
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building robust and scalable full-stack web applications. I use modern technologies to deliver high-performance, secure, and maintainable code.'
  }
];

export default function Services() {
  return (
    <Section id="services" className="bg-muted">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Services</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          How I can help you bring your digital vision to life.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="text-center group hover:border-primary transition-all">
            <CardHeader className="items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4 group-hover:bg-primary transition-colors">
                <service.icon className="h-8 w-8 text-primary transition-colors" />
              </div>
              <CardTitle className="font-headline">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
