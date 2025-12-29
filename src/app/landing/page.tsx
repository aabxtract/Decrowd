
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  const placeholderImage =
    PlaceHolderImages.find((p) => p.id === 'campaign-default')?.imageUrl ||
    'https://picsum.photos/seed/default/1200/800';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white">
          <Image
            src={placeholderImage}
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="z-0 brightness-50"
            data-ai-hint="crowdfunding abstract"
          />
          <div className="relative z-10 container px-4 md:px-6 space-y-6">
            <Icons.logo className="w-24 h-24 mx-auto text-primary" />
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Powering Dreams, Together.
            </h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-primary-foreground/80">
              DeCrowd is the decentralized platform where innovative ideas meet community funding. Launch your project or back the next big thing, securely and transparently.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/">View Campaigns</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Why Choose DeCrowd?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We leverage blockchain technology to create a fair, transparent, and global crowdfunding ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <h3 className="text-xl font-bold font-headline">Secure & Transparent</h3>
                <p className="text-muted-foreground">
                  All transactions are recorded on the blockchain, ensuring unparalleled security and transparency for creators and backers.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto text-primary"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                <h3 className="text-xl font-bold font-headline">Lower Fees</h3>
                <p className="text-muted-foreground">
                  By removing intermediaries, we significantly reduce fees, meaning more of your money goes directly to the projects you support.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mx-auto text-primary"><path d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5s9.5-4.25 9.5-9.5z"></path><path d="M12 2.5c-2.4 0-4.8 1-6.7 2.8"></path></svg>
                <h3 className="text-xl font-bold font-headline">Global Reach</h3>
                <p className="text-muted-foreground">
                  Our decentralized nature means anyone, anywhere in the world can participate in funding the future.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 DeCrowd. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
