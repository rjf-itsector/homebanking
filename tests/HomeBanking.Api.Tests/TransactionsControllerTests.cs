using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using HomeBanking.Api.Models;
using Xunit;

namespace HomeBanking.Api.Tests;

public class TransactionsControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TransactionsControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetTransactions_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/transactions");

        // Assert
        response.EnsureSuccessStatusCode();
        var transactions = await response.Content.ReadFromJsonAsync<List<Transaction>>();
        Assert.NotNull(transactions);
        Assert.Equal(20, transactions.Count);
    }

    [Fact]
    public async Task GetTransactions_WithAccountIdFilter_ReturnsFilteredTransactions()
    {
        // Act
        var response = await _client.GetAsync("/api/transactions?accountId=1");

        // Assert
        response.EnsureSuccessStatusCode();
        var transactions = await response.Content.ReadFromJsonAsync<List<Transaction>>();
        Assert.NotNull(transactions);
        Assert.All(transactions, t => Assert.Equal(1, t.AccountId));
    }

    [Fact]
    public async Task GetTransaction_WithValidId_ReturnsTransaction()
    {
        // Act
        var response = await _client.GetAsync("/api/transactions/1");

        // Assert
        response.EnsureSuccessStatusCode();
        var transaction = await response.Content.ReadFromJsonAsync<Transaction>();
        Assert.NotNull(transaction);
        Assert.Equal(1, transaction.Id);
    }

    [Fact]
    public async Task Transfer_WithValidRequest_ReturnsSuccess()
    {
        // Arrange
        var transferRequest = new TransferRequest
        {
            FromAccountId = 1,
            ToAccountId = 2,
            Amount = 100.00m,
            Description = "Test transfer"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/transactions/transfer", transferRequest);

        // Assert
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<dynamic>();
        Assert.NotNull(result);
    }

    [Fact]
    public async Task Transfer_WithInvalidAmount_ReturnsBadRequest()
    {
        // Arrange
        var transferRequest = new TransferRequest
        {
            FromAccountId = 1,
            ToAccountId = 2,
            Amount = -100.00m,
            Description = "Test transfer"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/transactions/transfer", transferRequest);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Transfer_WithInsufficientFunds_ReturnsBadRequest()
    {
        // Arrange
        var transferRequest = new TransferRequest
        {
            FromAccountId = 1,
            ToAccountId = 2,
            Amount = 999999.00m,
            Description = "Test transfer"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/transactions/transfer", transferRequest);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
