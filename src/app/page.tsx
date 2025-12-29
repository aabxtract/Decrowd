'use client';

import CampaignList from '@/components/campaign-list';
import { useWeb3 } from '@/hooks/use-web3';

export default function Home() {
  const { campaigns, loading } = useWeb3();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tighter md:text-4xl">
        Active Campaigns
      </h1>
      <CampaignList campaigns={campaigns} isLoading={loading} />
    </div>
  );
}
