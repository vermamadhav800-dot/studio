import { Section } from '@/components/section';
import ContactForm from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <Section id="contact" className="bg-muted">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Get In Touch</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <a href="mailto:alex.doe@example.com" className="text-muted-foreground hover:text-primary">alex.doe@example.com</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-muted-foreground">555-123-4567</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
            </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
