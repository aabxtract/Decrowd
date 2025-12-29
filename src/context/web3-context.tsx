
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_CAMPAIGNS, MOCK_USER_ADDRESS, AVAILABLE_BADGES, MOCK_EARNED_BADGES } from '@/lib/constants';
import type { Campaign, CreateCampaignData, NFTBadge, EarnedBadge } from '@/lib/types';
import { getSummary } from '@/lib/actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Web3ContextType {
  userAddress: string | null;
  campaigns: Campaign[];
  loading: boolean;
  earnedBadges: EarnedBadge[];
  connectWallet: () => void;
  disconnectWallet: () => void;
  createCampaign: (data: CreateCampaignData) => Promise<void>;
  donate: (campaignId: number, amount: number) => Promise<void>;
  withdraw: (campaignId: number) => Promise<void>;
  refund: (campaignId: number) => Promise<void>;
  getCampaignById: (id: number) => Campaign | undefined;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching campaigns from the blockchain
    setCampaigns(MOCK_CAMPAIGNS);
    setLoading(false);
  }, []);

  const connectWallet = () => {
    // Simulate wallet connection
    setUserAddress(MOCK_USER_ADDRESS);
    setEarnedBadges(MOCK_EARNED_BADGES);
    toast({
      title: 'Wallet Connected',
      description: `Connected as ${MOCK_USER_ADDRESS.slice(0, 6)}...${MOCK_USER_ADDRESS.slice(-4)}`,
    });
  };

  const disconnectWallet = () => {
    setUserAddress(null);
    setEarnedBadges([]);
    toast({ title: 'Wallet Disconnected' });
  };

  const createCampaign = async (data: CreateCampaignData) => {
    if (!userAddress) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please connect your wallet first.' });
      return;
    }
    
    toast({ title: 'Creating campaign...', description: 'Summarizing description with AI...' });

    try {
      const summary = await getSummary(data.description);
      const newCampaign: Campaign = {
        id: campaigns.length + 1,
        owner: userAddress,
        ...data,
        summary,
        amountCollected: 0,
        contributors: [],
        image: PlaceHolderImages.find(p => p.id === 'campaign-default')?.imageUrl || '',
        state: 'fundraising',
      };
      setCampaigns((prev) => [newCampaign, ...prev]);
      toast({
        variant: 'default',
        className: "bg-accent text-accent-foreground",
        title: 'Success!',
        description: 'Your campaign has been created.',
      });
      router.push('/campaigns');
    } catch(e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to create campaign.' });
    }
  };

  const donate = async (campaignId: number, amount: number) => {
    if (!userAddress) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please connect your wallet first.' });
      return;
    }

    let awardedBadge: NFTBadge | null = null;

    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id === campaignId) {
          // Badge Logic
          if (campaign.contributors.length < 10) {
            awardedBadge = AVAILABLE_BADGES.find(b => b.id === 'pioneer')!;
          } else if (amount > 10) {
            awardedBadge = AVAILABLE_BADGES.find(b => b.id === 'generous-supporter')!;
          }

          if (awardedBadge) {
              const newEarnedBadge: EarnedBadge = {
                  badge: awardedBadge,
                  campaignTitle: campaign.title,
                  timestamp: new Date().getTime(),
              };
              setEarnedBadges(prevBadges => [...prevBadges, newEarnedBadge]);
          }


          const newAmount = campaign.amountCollected + amount;
          return {
            ...campaign,
            amountCollected: newAmount,
            contributors: [...campaign.contributors, { address: userAddress, amount }],
            state: newAmount >= campaign.target ? 'successful' : campaign.state
          };
        }
        return campaign;
      })
    );
     toast({
        variant: 'default',
        className: "bg-accent text-accent-foreground",
        title: 'Donation Successful!',
        description: `You have successfully donated ${amount} ETH. ${awardedBadge ? `You've earned the ${awardedBadge.name} badge!` : ''}`,
      });
  };

  const withdraw = async (campaignId: number) => {
     toast({
        variant: 'default',
        className: "bg-accent text-accent-foreground",
        title: 'Withdrawal Processed!',
        description: 'Funds have been transferred to your wallet.',
      });
      // In a real app, this would interact with a smart contract
  };

  const refund = async (campaignId: number) => {
     toast({
        variant: 'default',
        className: "bg-accent text-accent-foreground",
        title: 'Refund Processed!',
        description: 'Your contribution has been refunded to your wallet.',
      });
     // In a real app, this would interact with a smart contract
  };

  const getCampaignById = (id: number) => {
    return campaigns.find((c) => c.id === id);
  };

  const value = {
    userAddress,
    campaigns,
    loading,
    earnedBadges,
    connectWallet,
    disconnectWallet,
    createCampaign,
    donate,
    withdraw,
    refund,
    getCampaignById,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}
