'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWeb3 } from '@/hooks/use-web3';
import { Campaign } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function DonateDialog({ campaign }: { campaign: Campaign }) {
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const { donate, userAddress } = useWeb3();
  const { toast } = useToast();

  const handleDonate = async () => {
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a positive number to donate.',
      });
      return;
    }
     if (!userAddress) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to donate.',
      });
      return;
    }

    await donate(campaign.id, donationAmount);
    setAmount('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">Back this project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Back {campaign.title}</DialogTitle>
          <DialogDescription>
            Enter the amount of ETH you want to contribute to this project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="0.1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleDonate} className="w-full" variant="default">
            Confirm Donation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
