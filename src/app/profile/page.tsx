
'use client';

import { useWeb3 } from '@/hooks/use-web3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Award } from 'lucide-react';

export default function ProfilePage() {
    const { userAddress, earnedBadges } = useWeb3();

    if (!userAddress) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p>Please connect your wallet to view your profile.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">My Profile</h1>
                <p className="text-muted-foreground font-mono text-sm mt-2">{userAddress}</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>My Supporter Badges</CardTitle>
                    <CardDescription>Badges you've earned by backing projects on DeCrowd.</CardDescription>
                </CardHeader>
                <CardContent>
                    {earnedBadges.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {earnedBadges.map((earnedBadge, index) => (
                                <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
                                    <Award className="w-12 h-12 text-accent mb-2"/>
                                    <h3 className="font-semibold">{earnedBadge.badge.name}</h3>
                                    <p className="text-xs text-muted-foreground">for backing "{earnedBadge.campaignTitle}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
                            <p>No badges yet!</p>
                            <p>Back a campaign to start earning supporter badges.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
