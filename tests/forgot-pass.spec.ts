import { test, expect } from '@playwright/test';

test('test-recover-pass', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.getByLabel('Your email address:').click();
  await page.getByLabel('Your email address:').fill('manuelito756091224@gmail.com');
  await page.getByRole('button', { name: 'Recover' }).click();
  //Assert para verificar que la recuperacion de contraseña puede proceder
  const recoveryReference = await page.locator('text=Email with instructions has been sent to you.');
  await expect(recoveryReference).toBeVisible();
});