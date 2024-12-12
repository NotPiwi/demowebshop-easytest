import { test, expect } from '@playwright/test';

test('test-PURCHASE', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('alvarocalleros44@gmail.com');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('SecurePass123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Electronics' }).first().click();
  await page.getByRole('heading', { name: 'Cell phones' }).getByRole('link').click();
  await page.getByRole('link', { name: 'Phone Cover', exact: true }).click();
  await page.getByLabel('Qty:').click();
  await page.getByLabel('Qty:').fill('2');
  await page.locator('#add-to-cart-button-80').click();
  await page.getByRole('link', { name: 'Shopping cart' }).click();
  await page.locator('#termsofservice').check();
  await page.locator('.checkout-buttons').click();
  for (let i = 0; i < 5; i++) { //aqui hice un ciclo porque eran 5 "Continue" seguidos
    await page.locator('//input[@value="Continue"]').nth(i).click();
  }
  await page.getByRole('button', { name: 'Confirm' }).click();
  const successPurchase = await page.locator('text=Your order has been successfully processed!');
  await expect(successPurchase).toBeVisible();
});