import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import Providers from '@/providers/Providers';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DataDock',
  description: 'DataDock | Your Database, Your Way',
  openGraph: {
    title: 'DataDock',
    description: 'DataDock | Your Database, Your Way',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/how-it-works/use.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
