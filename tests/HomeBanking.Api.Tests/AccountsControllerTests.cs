using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using HomeBanking.Api.Models;
using Xunit;

namespace HomeBanking.Api.Tests;

public class AccountsControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public AccountsControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAccounts_ReturnsSuccess()
    {
        // Act
        var response = await _client.GetAsync("/api/accounts");

        // Assert
        response.EnsureSuccessStatusCode();
        var accounts = await response.Content.ReadFromJsonAsync<List<Account>>();
        Assert.NotNull(accounts);
        Assert.Equal(3, accounts.Count);
    }

    [Fact]
    public async Task GetAccount_WithValidId_ReturnsAccount()
    {
        // Act
        var response = await _client.GetAsync("/api/accounts/1");

        // Assert
        response.EnsureSuccessStatusCode();
        var account = await response.Content.ReadFromJsonAsync<Account>();
        Assert.NotNull(account);
        Assert.Equal(1, account.Id);
        Assert.Equal("ACC-1001", account.AccountNumber);
    }

    [Fact]
    public async Task GetAccount_WithInvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync("/api/accounts/999");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
