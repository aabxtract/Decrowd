import CreateCampaignForm from '@/components/create-campaign-form';

export default function CreatePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Start a New Campaign
        </h1>
        <p className="text-muted-foreground">
          Let&apos;s get your project funded by the community.
        </p>
      </div>

      <CreateCampaignForm />
    </div>
  );
}
