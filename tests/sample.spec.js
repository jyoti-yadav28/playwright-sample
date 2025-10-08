import test from '../lambdatest-setup'; 
import { expect } from '@playwright/test';

test('shop by category button has aria-expanded false', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await expect(page.getByRole('button', { name: 'Shop by Category' }))
    .toHaveAttribute('aria-expanded', 'false');
});
