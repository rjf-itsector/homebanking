import { useEffect, useState } from 'react';
import type { Account, Transaction } from './types';
import { api } from './services/api';
import { AccountCard } from './components/AccountCard';
import { TransactionsTable } from './components/TransactionsTable';
import { TransferForm } from './components/TransferForm';
import { Loader2 } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <div className="text-foreground text-lg">Loading your banking dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
          <div className="text-destructive font-semibold mb-2">Error Loading Data</div>
          <div className="text-destructive/80">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with gradient overlay */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            Home Banking
          </h1>
          <p className="text-blue-100 text-lg">Manage your accounts and transactions with ease</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Account Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Transactions Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Recent Transactions</h2>
              <div className="text-sm text-muted-foreground">Last 20 transactions</div>
            </div>
            <TransactionsTable transactions={transactions} />
          </div>

          {/* Transfer Form Section */}
          <div className="lg:col-span-1">
            <TransferForm accounts={accounts} onTransferComplete={handleTransferComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
