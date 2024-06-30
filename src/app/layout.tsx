import { GeistSans } from 'geist/font/sans';
import HeaderAuth from '@/components/HeaderAuth';
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Five Minutes',
  description: "Let's go Five Minutes per day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen">
        <header className="container py-4 mb-10 border-b flex items-center justify-between">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <HeaderAuth />
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
