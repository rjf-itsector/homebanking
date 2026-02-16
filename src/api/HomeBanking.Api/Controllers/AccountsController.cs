using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeBanking.Api.Data;
using HomeBanking.Api.Models;

namespace HomeBanking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly HomeBankingContext _context;

    public AccountsController(HomeBankingContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
    {
        return await _context.Accounts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> GetAccount(int id)
    {
        var account = await _context.Accounts.FindAsync(id);

        if (account == null)
        {
            return NotFound();
        }

        return account;
    }
}
