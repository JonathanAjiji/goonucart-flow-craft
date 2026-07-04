import * as React from 'react';
import { Share2, Copy, Users, Gift, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { User } from '@/types';

interface ReferralHubProps {
  user: User;
}

export function ReferralHub({ user }: ReferralHubProps) {
  const [promoCode, setPromoCode] = React.useState('');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      toast.success('Promo code applied successfully!');
      setPromoCode('');
    }
  };

  const referralGoal = 5;
  const progress = (user.referralCount / referralGoal) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Referral Program</h1>
          <p className="text-muted-foreground">Invite your friends and earn rewards for every successful signup.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                Your Referral Code
              </CardTitle>
              <CardDescription>Share this code with your fellow students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <div className="flex-1 bg-white border rounded-xl flex items-center justify-center font-mono font-bold text-2xl tracking-widest text-primary h-14">
                  {user.referralCode}
                </div>
                <Button variant="outline" className="h-14 w-14 rounded-xl shrink-0" onClick={handleCopyCode}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" className="rounded-full">
                  Share on WhatsApp
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full">
                  Post to Campus Hub
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Progress
              </CardTitle>
              <CardDescription>You're {referralGoal - user.referralCount} referrals away from your next reward</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Current Referrals</span>
                  <span>{user.referralCount} / {referralGoal}</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Next Reward</p>
                  <p className="text-xs text-muted-foreground">Free Delivery Token + $5 Credit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Reward History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.rewards.map(reward => (
                  <div key={reward.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        reward.status === 'Claimed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {reward.status === 'Claimed' ? <CheckCircle2 className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{reward.title}</p>
                        <p className="text-xs text-muted-foreground">{reward.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {reward.code && (
                        <code className="text-[10px] font-mono font-bold bg-muted px-2 py-1 rounded">
                          {reward.code}
                        </code>
                      )}
                      <Badge variant={reward.status === 'Claimed' ? 'secondary' : 'default'} className="text-[10px]">
                        {reward.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Have a Code?</CardTitle>
              <CardDescription>Enter a friend's code or a promo code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Enter code here" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="rounded-xl h-11"
              />
              <Button className="w-full rounded-xl" onClick={handleApplyPromo}>
                Apply Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
