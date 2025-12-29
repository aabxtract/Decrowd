import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import ConnectWallet from '@/components/connect-wallet';
import { Separator } from '@/components/ui/separator';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-xl">DeCrowd</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/create">Create Campaign</Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <ConnectWallet />
          </nav>
        </div>
      </div>
    </header>
  );
}
