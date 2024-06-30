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
      <body className="bg-background text-foreground">
        <header>
          <AuthButton />
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
