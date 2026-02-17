# Home Banking Monorepo

A full-stack home banking application featuring ASP.NET Core 9 API backend and React frontend with TypeScript.

> **✅ Application Verified**: See [VERIFICATION.md](docs/VERIFICATION.md) for screenshots and proof that the application has been built, tested, and is fully functional.

## 🏗️ Architecture

This monorepo contains:

- **API** (`src/api`): ASP.NET Core 9 Web API with EF Core InMemory database
- **Frontend** (`src/web`): React + Vite + TypeScript with Tailwind CSS and shadcn/ui
- **Tests**: 
  - API unit tests with xUnit (`tests/HomeBanking.Api.Tests`)
  - E2E tests with Playwright (`tests/e2e`)

## ✨ Features

### Backend API
- ASP.NET Core 9 Web API controllers
- Entity Framework Core InMemory database
- Account and Transaction entities
- Seeded with 3 accounts and 20 transactions
- Scalar OpenAPI documentation
- Health check endpoint
- CORS enabled for frontend

### Frontend
- React 18 with Vite and TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Dark theme UI
- Account balance cards display
- Transactions table with category badges
- Transfer form with validation
- Responsive design

### Testing
- 9 xUnit tests for API endpoints
- Playwright E2E tests covering:
  - Dashboard load
  - Transaction list display
  - Transfer form validation
  - Complete transfer flow

## 🚀 Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js 20+
- npm or yarn

### Development with DevContainer (Recommended)

Open this repository in GitHub Codespaces or VS Code with Dev Containers extension. All dependencies will be installed automatically.

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rjf-itsector/homebanking.git
   cd homebanking
   ```

2. **Run the API**
   ```bash
   cd src/api/HomeBanking.Api
   dotnet restore
   dotnet run
   ```
   API will be available at `http://localhost:5000`
   Scalar API documentation at `http://localhost:5000/scalar/v1`

3. **Run the Frontend**
   ```bash
   cd src/web
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

4. **Run API Tests**
   ```bash
   cd tests/HomeBanking.Api.Tests
   dotnet test
   ```

5. **Run E2E Tests**
   ```bash
   cd tests/e2e
   npm install
   npx playwright install chromium
   npm test
   ```

## 📁 Project Structure

```
homebanking/
├── .devcontainer/          # DevContainer configuration
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── src/
│   ├── api/
│   │   └── HomeBanking.Api/
│   │       ├── Controllers/    # API controllers
│   │       ├── Data/          # Database context
│   │       └── Models/        # Entity models
│   └── web/
│       └── src/
│           ├── components/    # React components
│           ├── services/      # API service layer
│           └── types/         # TypeScript types
└── tests/
    ├── HomeBanking.Api.Tests/ # xUnit API tests
    └── e2e/                   # Playwright E2E tests
```

## 🧪 Testing

### API Tests
All API endpoints are tested with xUnit:
- Account retrieval (all accounts and by ID)
- Transaction retrieval (all and filtered by account)
- Transfer functionality with validation

### E2E Tests
Playwright tests cover the complete user journey:
- Dashboard loads with account cards
- Transaction list displays correctly
- Transfer form validation works
- Successful money transfer flow

## 🔄 CI/CD

GitHub Actions workflow runs on every pull request:
1. API unit tests
2. Frontend build validation
3. E2E tests with full application stack

## 🛠️ Technologies

### Backend
- ASP.NET Core 9
- Entity Framework Core InMemory
- Scalar (OpenAPI documentation)

### Frontend
- React 18
- Vite 5
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons

### Testing
- xUnit (.NET)
- Playwright (E2E)

## 📝 API Endpoints

- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions?accountId={id}` - Get transactions by account
- `POST /api/transactions/transfer` - Transfer funds between accounts
- `GET /health` - Health check endpoint
- `GET /openapi/v1.json` - OpenAPI specification
- `GET /scalar/v1` - Interactive API documentation

## 🎨 UI Features

- **Dark Theme**: Modern dark UI optimized for readability
- **Account Cards**: Display account holder, balance, and account number
- **Transaction Table**: Sortable table with category badges and color-coded amounts
- **Transfer Form**: Validated form with real-time feedback
- **Responsive**: Works on desktop and mobile devices

## 📄 License

MIT License

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

All pull requests trigger the CI pipeline automatically.