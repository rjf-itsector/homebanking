import type { Transaction } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Groceries: { bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400' },
  Utilities: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  Entertainment: { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400' },
  Transportation: { bg: 'bg-yellow-500/10', text: 'text-yellow-600 dark:text-yellow-400' },
  Healthcare: { bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400' },
  Shopping: { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400' },
  Dining: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400' },
  Salary: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  Transfer: { bg: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400' },
  Other: { bg: 'bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' },
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <Card className="overflow-hidden border-muted/40">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="text-right font-semibold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => {
                const categoryStyle = categoryColors[transaction.category] || categoryColors.Other;
                return (
                  <TableRow 
                    key={transaction.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${categoryStyle.bg} ${categoryStyle.text} border-transparent font-semibold`}
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {transaction.type === 'credit' ? (
                          <ArrowDownCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                          {transaction.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-bold text-lg ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}$
                      {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
