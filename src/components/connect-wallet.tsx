
'use client';
import { useWeb3 } from '@/hooks/use-web3';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Wallet, User } from 'lucide-react';
import Link from 'next/link';

export default function ConnectWallet() {
  const { userAddress, connectWallet, disconnectWallet } = useWeb3();

  if (userAddress) {
    const formattedAddress = `${userAddress.slice(
      0,
      6
    )}...${userAddress.slice(-4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" />
            {formattedAddress}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href="/profile">
                    <User className="mr-2 h-4 w-4"/>
                    My Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={disconnectWallet}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={connectWallet} variant="outline">
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
