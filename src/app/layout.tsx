import './globals.css';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import QueryProvider from '@/components/QueryProvider';

import styles from './layout.module.css';

const openSans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pets App',
  description: 'Aplication with pets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <div className={styles.footer}>
          <Container>&nbsp;</Container>
        </div>
      </body>
    </html>
  );
}
