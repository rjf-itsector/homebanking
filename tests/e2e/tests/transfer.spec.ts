import { test, expect } from '@playwright/test';

test.describe('Transfer Flow', () => {
  test('should successfully transfer funds between accounts', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Home Banking', level: 1 })).toBeVisible();

    // Get initial balances
    const johnBalance = await page.getByText('USD 5420.50').textContent();
    expect(johnBalance).toBeTruthy();

    // Fill in transfer form
    await page.getByLabel('From Account').selectOption({ index: 1 }); // John Doe
    await page.getByLabel('To Account').selectOption({ index: 2 }); // Jane Smith
    await page.getByLabel('Amount').fill('100');
    await page.getByLabel('Description').fill('Test transfer from E2E');

    // Submit transfer
    await page.getByRole('button', { name: 'Transfer' }).click();

    // Wait for success message
    await expect(page.getByText(/Transfer successful!/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Reference:/)).toBeVisible();

    // Verify form was reset
    await expect(page.getByLabel('Amount')).toHaveValue('');
    await expect(page.getByLabel('Description')).toHaveValue('');
  });

  test('should show error for invalid transfer', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Home Banking', level: 1 })).toBeVisible();

    // Try to submit without selecting accounts
    await page.getByLabel('Amount').fill('100');
    await page.getByLabel('Description').fill('Test transfer');
    await page.getByRole('button', { name: 'Transfer' }).click();

    // Should show validation error
    await expect(page.getByText('Please select both accounts')).toBeVisible();
  });

  test('should show error for insufficient funds', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Home Banking', level: 1 })).toBeVisible();

    // Fill in transfer form with amount exceeding balance
    await page.getByLabel('From Account').selectOption({ index: 3 }); // Bob Johnson (lowest balance)
    await page.getByLabel('To Account').selectOption({ index: 1 }); // John Doe
    await page.getByLabel('Amount').fill('99999');
    await page.getByLabel('Description').fill('Test transfer with insufficient funds');

    // Submit transfer
    await page.getByRole('button', { name: 'Transfer' }).click();

    // Should show error message
    await expect(page.getByText(/Insufficient funds/)).toBeVisible({ timeout: 10000 });
  });

  test('should show error for same account transfer', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Home Banking', level: 1 })).toBeVisible();

    // Select same account for both from and to
    await page.getByLabel('From Account').selectOption({ index: 1 }); // John Doe
    await page.getByLabel('To Account').selectOption({ index: 1 }); // John Doe
    await page.getByLabel('Amount').fill('100');
    await page.getByLabel('Description').fill('Test same account transfer');

    // Submit transfer
    await page.getByRole('button', { name: 'Transfer' }).click();

    // Should show validation error
    await expect(page.getByText('Cannot transfer to the same account')).toBeVisible();
  });
});
