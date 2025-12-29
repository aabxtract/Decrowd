import Link from 'next/link';
import Image from 'next/image';
import { Campaign } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import CountdownTimer from './countdown-timer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignStatusBadge = ({ state }: { state: Campaign['state'] }) => {
    switch (state) {
        case 'successful':
            return <Badge className="bg-accent text-accent-foreground">Successful</Badge>;
        case 'expired':
            return <Badge variant="destructive">Expired</Badge>;
        case 'fundraising':
        default:
            return <Badge variant="secondary">Fundraising</Badge>;
    }
}


export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.amountCollected / campaign.target) * 100;
  const placeholderImage =
    PlaceHolderImages.find((p) => p.id === 'campaign-default')
      ?.imageUrl || 'https://picsum.photos/seed/default/600/400';

  return (
    <Link href={`/campaign/${campaign.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={campaign.image || placeholderImage}
            alt={campaign.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform group-hover:scale-105"
            data-ai-hint="technology abstract"
          />
        </div>
        <CardHeader>
          <CardTitle className="truncate font-headline">{campaign.title}</CardTitle>
          <CardDescription className="line-clamp-2 h-10">
            {campaign.summary}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>Raised: {formatCurrency(campaign.amountCollected)}</span>
              <span>Goal: {formatCurrency(campaign.target)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <CampaignStatusBadge state={campaign.state} />
            <CountdownTimer deadline={campaign.deadline} />
        </CardFooter>
      </Card>
    </Link>
  );
}
