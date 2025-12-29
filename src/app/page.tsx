
'use client';

import CampaignList from '@/components/campaign-list';
import { useWeb3 } from '@/hooks/use-web3';
import LandingPage from './landing/page';

export default function Home() {
  const { campaigns, loading } = useWeb3();

  return (
    <LandingPage/>
  );
}
