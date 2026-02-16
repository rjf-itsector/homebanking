import { test, expect } from '@playwright/test';

test.describe('Home Banking Dashboard', () => {
  test('dashboard loads and displays accounts', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Home Banking/);

    // Check main heading
    await expect(page.getByRole('heading', { name: 'Home Banking' })).toBeVisible();

    // Check that account cards are displayed
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Jane Smith')).toBeVisible();
    await expect(page.getByText('Bob Johnson')).toBeVisible();

    // Check that account numbers are visible
    await expect(page.getByText('ACC-1001')).toBeVisible();
    await expect(page.getByText('ACC-1002')).toBeVisible();
    await expect(page.getByText('ACC-1003')).toBeVisible();
  });

  test('transaction list displays transactions', async ({ page }) => {
    await page.goto('/');

    // Check transactions table heading
    await expect(page.getByRole('heading', { name: 'Recent Transactions' })).toBeVisible();

    // Check that table headers are present
    await expect(page.getByText('Date')).toBeVisible();
    await expect(page.getByText('Description')).toBeVisible();
    await expect(page.getByText('Category')).toBeVisible();
    await expect(page.getByText('Type')).toBeVisible();
    await expect(page.getByText('Amount')).toBeVisible();

    // Check that transactions are displayed (at least one transaction row)
    const tableRows = page.locator('tbody tr');
    await expect(tableRows.first()).toBeVisible();
    
    // Check for category badges
    await expect(page.locator('.inline-flex.items-center.rounded-full').first()).toBeVisible();
  });

  test('transfer form validation', async ({ page }) => {
    await page.goto('/');

    // Find the transfer form
    await expect(page.getByRole('heading', { name: 'Transfer Funds' })).toBeVisible();

    // Try to submit without filling the form
    const transferButton = page.getByRole('button', { name: 'Transfer' });
    await transferButton.click();

    // Should show validation error
    await expect(page.getByText(/Please select both accounts/)).toBeVisible();
  });

  test('complete transfer flow', async ({ page }) => {
    await page.goto('/');

    // Fill the transfer form
    const fromAccountSelect = page.locator('#fromAccount');
    const toAccountSelect = page.locator('#toAccount');
    const amountInput = page.locator('#amount');
    const descriptionInput = page.locator('#description');

    await fromAccountSelect.selectOption({ index: 1 }); // Select first account
    await toAccountSelect.selectOption({ index: 2 }); // Select second account
    await amountInput.fill('50.00');
    await descriptionInput.fill('Test transfer');

    // Submit the form
    const transferButton = page.getByRole('button', { name: 'Transfer' });
    await transferButton.click();

    // Wait for success message
    await expect(page.getByText(/Transfer successful/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Reference:/)).toBeVisible();
  });
});
