import type { Transaction } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const categoryColors: Record<string, string> = {
  Groceries: 'bg-green-500',
  Utilities: 'bg-blue-500',
  Entertainment: 'bg-purple-500',
  Transportation: 'bg-yellow-500',
  Healthcare: 'bg-red-500',
  Shopping: 'bg-pink-500',
  Dining: 'bg-orange-500',
  Salary: 'bg-emerald-500',
  Transfer: 'bg-cyan-500',
  Other: 'bg-gray-500',
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Badge 
                    className={`${categoryColors[transaction.category] || categoryColors.Other} text-white border-transparent`}
                  >
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={transaction.type === 'credit' ? 'default' : 'outline'}>
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
