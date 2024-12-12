import { test, expect } from '@playwright/test';

test('test-simple-login', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('alvarocalleros44@gmail.com');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('SecurePass123');
  await page.getByRole('button', { name: 'Log in' }).click();
  //Assert para validar con la referencia que el correo (cuenta) sea visible en la pantalla :)
  const successReference = await page.locator('text=alvarocalleros44@gmail.com');
  await expect(successReference).toBeVisible();
});