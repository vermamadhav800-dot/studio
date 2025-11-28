import type { Metadata } from 'next';
import { fontBody, fontHeading } from '@/app/fonts';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Madhav - 3D Designer',
  description: 'A 3D Designer passionate about crafting bold and memorable projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(fontBody.className, 'bg-background text-foreground')}>
        {children}
      </body>
    </html>
  );
}
