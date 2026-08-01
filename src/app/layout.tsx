import type { Metadata } from 'next';
import { fontBody, fontHeading } from '@/app/fonts';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'C9 RUN CLUB - Tactical Training Systems',
  description: 'A high-performance running ecosystem for the elite. Join the squad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(fontBody.className, 'bg-black text-white antialiased selection:bg-primary selection:text-black')}>
        {children}
      </body>
    </html>
  );
}