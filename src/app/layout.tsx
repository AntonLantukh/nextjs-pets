import './globals.css';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import QueryProvider from '@/components/QueryProvider';

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pets App',
  description: 'Aplication with pets - Home page',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
