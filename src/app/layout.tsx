import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NextAuthProvider } from './Providers'; 

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Herbapedia - Ensiklopedia Tanaman Obat Indonesia',
  description: 'Pelajari berbagai tanaman obat tradisional di Indonesia, manfaat, dan cara penggunaannya',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <NextAuthProvider> {/* Provider harus membungkus semua yang butuh sesi */}
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}