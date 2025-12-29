'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_CAMPAIGNS, MOCK_USER_ADDRESS } from '@/lib/constants';
import type { Campaign, CreateCampaignData } from '@/lib/types';
import { getSummary } from '@/lib/actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Web3ContextType {
  userAddress: string | null;
  campaigns: Campaign[];
  loading: boolean;
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
    toast({
      title: 'Wallet Connected',
      description: `Connected as ${MOCK_USER_ADDRESS.slice(0, 6)}...${MOCK_USER_ADDRESS.slice(-4)}`,
    });
  };

  const disconnectWallet = () => {
    setUserAddress(null);
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
      router.push('/');
    } catch(e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to create campaign.' });
    }
  };

  const donate = async (campaignId: number, amount: number) => {
    if (!userAddress) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please connect your wallet first.' });
      return;
    }

    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id === campaignId) {
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
        description: `You have successfully donated ${amount} ETH.`,
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
