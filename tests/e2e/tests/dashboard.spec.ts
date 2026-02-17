import { test, expect } from '@playwright/test';

test.describe('Home Banking Dashboard', () => {
  test('should load the dashboard and display accounts', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle('Home Banking');

    // Check heading
    await expect(page.getByRole('heading', { name: 'Home Banking', level: 1 })).toBeVisible();

    // Check that 3 account cards are displayed by their headings
    await expect(page.getByRole('heading', { name: 'John Doe', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jane Smith', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bob Johnson', level: 3 })).toBeVisible();

    // Check that account balances are displayed
    await expect(page.getByText('USD 5420.50')).toBeVisible();
    await expect(page.getByText('USD 12750.00')).toBeVisible();
    await expect(page.getByText('USD 3200.75')).toBeVisible();
  });

  test('should display transaction list', async ({ page }) => {
    await page.goto('/');

    // Check transactions heading
    await expect(page.getByRole('heading', { name: 'Recent Transactions', level: 2 })).toBeVisible();

    // Check that table headers are visible using column headers
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Description' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Category' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Type' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Amount' })).toBeVisible();

    // Check that at least one transaction is visible
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(20);
  });

  test('should display transfer form', async ({ page }) => {
    await page.goto('/');

    // Check transfer form heading
    await expect(page.getByRole('heading', { name: 'Transfer Funds', level: 3 })).toBeVisible();

    // Check form fields
    await expect(page.getByLabel('From Account')).toBeVisible();
    await expect(page.getByLabel('To Account')).toBeVisible();
    await expect(page.getByLabel('Amount')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Transfer' })).toBeVisible();
  });
});
