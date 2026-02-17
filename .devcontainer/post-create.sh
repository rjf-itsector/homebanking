#!/bin/bash

# Restore .NET dependencies
echo "Restoring .NET dependencies..."
cd /workspaces/homebanking/src/api/HomeBanking.Api
dotnet restore

cd /workspaces/homebanking/tests/HomeBanking.Api.Tests
dotnet restore

# Install Node dependencies
echo "Installing Node dependencies..."
cd /workspaces/homebanking/src/web
npm install

cd /workspaces/homebanking/tests/e2e
npm install

echo "Setup complete! You can now:"
echo "  - Run API: cd src/api/HomeBanking.Api && dotnet run"
echo "  - Run Frontend: cd src/web && npm run dev"
echo "  - Run API Tests: cd tests/HomeBanking.Api.Tests && dotnet test"
echo "  - Run E2E Tests: cd tests/e2e && npm test"
