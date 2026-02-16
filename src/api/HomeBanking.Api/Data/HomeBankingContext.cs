using Microsoft.EntityFrameworkCore;
using HomeBanking.Api.Models;

namespace HomeBanking.Api.Data;

public class HomeBankingContext : DbContext
{
    public HomeBankingContext(DbContextOptions<HomeBankingContext> options)
        : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<Transaction> Transactions { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed 3 accounts
        modelBuilder.Entity<Account>().HasData(
            new Account
            {
                Id = 1,
                AccountNumber = "ACC-1001",
                AccountHolder = "John Doe",
                Balance = 5420.50m,
                Currency = "USD",
                CreatedAt = DateTime.UtcNow.AddYears(-2)
            },
            new Account
            {
                Id = 2,
                AccountNumber = "ACC-1002",
                AccountHolder = "Jane Smith",
                Balance = 12750.00m,
                Currency = "USD",
                CreatedAt = DateTime.UtcNow.AddYears(-1)
            },
            new Account
            {
                Id = 3,
                AccountNumber = "ACC-1003",
                AccountHolder = "Bob Johnson",
                Balance = 3200.75m,
                Currency = "USD",
                CreatedAt = DateTime.UtcNow.AddMonths(-6)
            }
        );

        // Seed 20 transactions
        var categories = new[] { "Groceries", "Utilities", "Entertainment", "Transportation", "Healthcare", "Shopping", "Dining", "Salary", "Transfer", "Other" };
        var transactions = new List<Transaction>();
        var random = new Random(42); // Fixed seed for consistency
        
        for (int i = 1; i <= 20; i++)
        {
            var accountId = (i % 3) + 1;
            var isCredit = i % 3 == 0;
            
            transactions.Add(new Transaction
            {
                Id = i,
                AccountId = accountId,
                Type = isCredit ? "credit" : "debit",
                Category = categories[i % categories.Length],
                Amount = Math.Round((decimal)(random.NextDouble() * 500 + 10), 2),
                Description = $"Transaction {i} - {(isCredit ? "Incoming" : "Outgoing")} payment",
                Date = DateTime.UtcNow.AddDays(-random.Next(1, 90)),
                ReferenceNumber = $"REF-{1000 + i}"
            });
        }
        
        modelBuilder.Entity<Transaction>().HasData(transactions);
    }
}
