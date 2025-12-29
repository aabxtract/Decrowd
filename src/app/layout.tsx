import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/context/web3-context';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'DeCrowd',
  description: 'A decentralized crowdfunding platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <Web3Provider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
