// app/fonts.ts or lib/fonts.ts
import { DM_Sans } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-sans',
});