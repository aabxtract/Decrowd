import CampaignDetails from '@/components/campaign-details';

export default function CampaignPage({ params }: { params: { id: string } }) {
  const campaignId = parseInt(params.id, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <CampaignDetails campaignId={campaignId} />
    </div>
  );
}
