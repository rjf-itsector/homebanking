namespace HomeBanking.Api.Models;

public class Transaction
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public string Type { get; set; } = string.Empty; // "debit" or "credit"
    public string Category { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string? ReferenceNumber { get; set; }
    
    public Account? Account { get; set; }
}
