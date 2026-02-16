import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Account } from '@/types';
import { DollarSign } from 'lucide-react';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {account.accountHolder}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {account.currency} {account.balance.toFixed(2)}
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          {account.accountNumber}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
