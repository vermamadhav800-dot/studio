import { PT_Sans, Space_Grotesk } from 'next/font/google';

export const fontBody = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export const fontHeading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});
