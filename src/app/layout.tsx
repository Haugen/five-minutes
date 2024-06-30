import { GeistSans } from 'geist/font/sans';
import AuthButton from '@/components/AuthButton';
import './globals.css';

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
        <header className="container py-4 mb-4 border-b">
          <AuthButton />
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
