export interface Contributor {
  address: string;
  amount: number;
}

export type CampaignState = 'fundraising' | 'successful' | 'expired';

export interface Campaign {
  id: number;
  owner: string;
  title: string;
  description: string;
  summary: string;
  target: number;
  deadline: number; // unix timestamp
  amountCollected: number;
  image: string;
  contributors: Contributor[];
  state: CampaignState;
}

export type CreateCampaignData = Omit<Campaign, 'id' | 'owner' | 'summary' | 'amountCollected' | 'contributors' | 'state' | 'image'>;
