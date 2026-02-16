import { useEffect, useState } from 'react';
import type { Account, Transaction } from './types';
import { api } from './services/api';
import { AccountCard } from './components/AccountCard';
import { TransactionsTable } from './components/TransactionsTable';
import { TransferForm } from './components/TransferForm';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [accountsData, transactionsData] = await Promise.all([
        api.getAccounts(),
        api.getTransactions(),
      ]);
      setAccounts(accountsData);
      setTransactions(transactionsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTransferComplete = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Home Banking</h1>
          <p className="text-muted-foreground">Manage your accounts and transactions</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Transactions</h2>
            <TransactionsTable transactions={transactions} />
          </div>

          <div>
            <TransferForm accounts={accounts} onTransferComplete={handleTransferComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
