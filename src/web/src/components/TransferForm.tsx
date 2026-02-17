import { useState } from 'react';
import type { Account, TransferRequest } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface TransferFormProps {
  accounts: Account[];
  onTransferComplete: () => void;
}

export function TransferForm({ accounts, onTransferComplete }: TransferFormProps) {
  const [formData, setFormData] = useState<TransferRequest>({
    fromAccountId: 0,
    toAccountId: 0,
    amount: 0,
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (formData.fromAccountId === 0 || formData.toAccountId === 0) {
      setError('Please select both accounts');
      return;
    }

    if (formData.fromAccountId === formData.toAccountId) {
      setError('Cannot transfer to the same account');
      return;
    }

    if (formData.amount <= 0) {
      setError('Amount must be greater than zero');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please provide a description');
      return;
    }

    setLoading(true);

    try {
      const result = await api.transfer(formData);
      setSuccess(`Transfer successful! Reference: ${result.referenceNumber}`);
      setFormData({
        fromAccountId: 0,
        toAccountId: 0,
        amount: 0,
        description: '',
      });
      onTransferComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-card/50 border-muted/40 sticky top-4">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-b border-muted/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Send className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Transfer Funds</CardTitle>
            <CardDescription>Transfer money between your accounts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount" className="text-sm font-semibold">From Account</Label>
            <select
              id="fromAccount"
              className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              value={formData.fromAccountId}
              onChange={(e) => setFormData({ ...formData, fromAccountId: Number(e.target.value) })}
            >
              <option value={0}>Select account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountHolder} ({account.accountNumber}) - ${account.balance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toAccount" className="text-sm font-semibold">To Account</Label>
            <select
              id="toAccount"
              className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              value={formData.toAccountId}
              onChange={(e) => setFormData({ ...formData, toAccountId: Number(e.target.value) })}
            >
              <option value={0}>Select account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountHolder} ({account.accountNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold">Amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-8 h-11 rounded-lg bg-background/50"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
            <Input
              id="description"
              placeholder="Enter transfer description"
              className="h-11 rounded-lg bg-background/50"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-600">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>{success}</div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Transfer
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
