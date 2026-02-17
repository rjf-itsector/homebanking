import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Account } from '@/types';
import { Wallet, TrendingUp } from 'lucide-react';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  // Format balance with commas
  const formattedBalance = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(account.balance);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-card/50 border-muted/40 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              {account.accountHolder}
            </CardTitle>
          </div>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground tracking-tight">
            {account.currency}
          </span>
          <span className="text-3xl font-bold text-foreground">
            {formattedBalance}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 rounded bg-muted/50 text-xs font-mono text-muted-foreground">
            {account.accountNumber}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
