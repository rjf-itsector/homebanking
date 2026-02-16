using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeBanking.Api.Data;
using HomeBanking.Api.Models;

namespace HomeBanking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly HomeBankingContext _context;

    public TransactionsController(HomeBankingContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions([FromQuery] int? accountId = null)
    {
        var query = _context.Transactions.AsQueryable();
        
        if (accountId.HasValue)
        {
            query = query.Where(t => t.AccountId == accountId.Value);
        }
        
        return await query.OrderByDescending(t => t.Date).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> GetTransaction(int id)
    {
        var transaction = await _context.Transactions.FindAsync(id);

        if (transaction == null)
        {
            return NotFound();
        }

        return transaction;
    }

    [HttpPost("transfer")]
    public async Task<ActionResult<object>> Transfer(TransferRequest request)
    {
        if (request.Amount <= 0)
        {
            return BadRequest(new { error = "Amount must be greater than zero" });
        }

        var fromAccount = await _context.Accounts.FindAsync(request.FromAccountId);
        var toAccount = await _context.Accounts.FindAsync(request.ToAccountId);

        if (fromAccount == null || toAccount == null)
        {
            return NotFound(new { error = "Account not found" });
        }

        if (fromAccount.Balance < request.Amount)
        {
            return BadRequest(new { error = "Insufficient funds" });
        }

        // Update balances
        fromAccount.Balance -= request.Amount;
        toAccount.Balance += request.Amount;

        // Create transactions
        var debitTransaction = new Transaction
        {
            AccountId = request.FromAccountId,
            Type = "debit",
            Category = "Transfer",
            Amount = request.Amount,
            Description = request.Description,
            Date = DateTime.UtcNow,
            ReferenceNumber = $"TRF-{DateTime.UtcNow.Ticks}"
        };

        var creditTransaction = new Transaction
        {
            AccountId = request.ToAccountId,
            Type = "credit",
            Category = "Transfer",
            Amount = request.Amount,
            Description = request.Description,
            Date = DateTime.UtcNow,
            ReferenceNumber = debitTransaction.ReferenceNumber
        };

        _context.Transactions.Add(debitTransaction);
        _context.Transactions.Add(creditTransaction);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Transfer completed successfully",
            fromAccount = new { fromAccount.Id, fromAccount.AccountNumber, fromAccount.Balance },
            toAccount = new { toAccount.Id, toAccount.AccountNumber, toAccount.Balance },
            referenceNumber = debitTransaction.ReferenceNumber
        });
    }
}
