'use client';

import { Campaign } from '@/lib/types';
import CampaignCard from './campaign-card';
import { Skeleton } from './ui/skeleton';

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export default function CampaignList({
  campaigns,
  isLoading,
}: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[450px] w-full" />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No campaigns found.</p>
        <p>Why not be the first to create one?</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
