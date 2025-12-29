'use client';
import { useWeb3 } from '@/hooks/use-web3';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, isDeadlinePassed } from '@/lib/utils';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';
import { MOCK_CREATOR_ADDRESS } from '@/lib/constants';
import DonateDialog from './donate-dialog';
import CountdownTimer from './countdown-timer';
import { Separator } from './ui/separator';

export default function CampaignDetails({ campaignId }: { campaignId: number }) {
  const { getCampaignById, userAddress, withdraw, refund } = useWeb3();
  const { toast } = useToast();
  const campaign = getCampaignById(campaignId);

  if (!campaign) {
    // In a real app, you might show a loading state first
    return notFound();
  }

  const placeholderImage =
    PlaceHolderImages.find((p) => p.id === 'campaign-default')?.imageUrl || '';

  const progress = Math.min((campaign.amountCollected / campaign.target) * 100, 100);
  const deadlinePassed = isDeadlinePassed(campaign.deadline);
  const goalReached = campaign.amountCollected >= campaign.target;

  const isOwner = userAddress === campaign.owner;
  const isContributor = campaign.contributors.some(c => c.address === userAddress);

  const handleWithdraw = async () => {
    await withdraw(campaign.id);
  }

  const handleRefund = async () => {
    await refund(campaign.id);
  }

  const renderActionButtons = () => {
    if (!deadlinePassed) {
      return <DonateDialog campaign={campaign} />;
    }

    if (goalReached) {
      if (isOwner) {
        return <Button onClick={handleWithdraw} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Withdraw Funds</Button>;
      }
      return <Badge className="bg-accent text-accent-foreground">Goal Reached!</Badge>;
    }

    // Goal not reached
    if (isContributor) {
        return <Button onClick={handleRefund} variant="outline" className="w-full">Claim Refund</Button>;
    }
    return <Badge variant="destructive">Campaign Failed</Badge>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      <div className="lg:col-span-3">
        <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={campaign.image || placeholderImage}
            alt={campaign.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint="technology abstract"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
        <div className="text-muted-foreground mb-6">
          Created by <span className="font-mono text-foreground text-sm">{campaign.owner}</span>
        </div>
        <p className="text-lg leading-relaxed">{campaign.description}</p>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-24 space-y-6 bg-card p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Campaign Status</h2>
                <CountdownTimer deadline={campaign.deadline}/>
            </div>

            <Separator/>
            
            <div>
                <Progress value={progress} className="h-3" />
                <div className="mt-3 flex justify-between text-sm ">
                    <span className="font-bold text-lg text-primary">{formatCurrency(campaign.amountCollected)}</span>
                    <span className="text-muted-foreground">raised of {formatCurrency(campaign.target)}</span>
                </div>
            </div>

             <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progress.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Backers</span>
                    <span className="font-medium">{campaign.contributors.length}</span>
                </div>
             </div>

             <div className="pt-4">
                {renderActionButtons()}
             </div>

             <Separator />

             <div>
                <h3 className="text-lg font-semibold mb-3">Top Contributors</h3>
                <div className="space-y-2">
                    {campaign.contributors.length > 0 ? (
                        [...campaign.contributors].sort((a,b) => b.amount - a.amount).slice(0, 5).map((c, i) => (
                        <div key={i} className="flex justify-between text-sm bg-background p-2 rounded-md">
                            <span className="font-mono text-muted-foreground">{c.address.slice(0,6)}...{c.address.slice(-4)}</span>
                            <span className="font-medium">{formatCurrency(c.amount)}</span>
                        </div>
                    ))
                    ) : (
                        <p className="text-sm text-center text-muted-foreground py-4">Be the first to contribute!</p>
                    )}
                </div>
             </div>

        </div>
      </div>
    </div>
  );
}
