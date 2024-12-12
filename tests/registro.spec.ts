import { test, expect } from '@playwright/test';

test('TC02_Ecommerce_Register_AlwaysExecutable', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByLabel('Male', { exact: true }).check();
    await page.getByLabel('First name:').fill('Carlos');
    await page.getByLabel('Last name:').fill('Martínez');
    await page.getByLabel('Email:').fill('carlos.martinez' + Date.now() + '@test.com');
    //registrar un nuevo correo, el Date.now le da un corre unico e irrepetible
    await page.getByLabel('Password:', { exact: true }).fill('SecurePass123');
    await page.getByLabel('Confirm password:').fill('SecurePass123');
    await page.getByRole('button', { name: 'Register' }).click();
    // Assert para validar registro exitoso
    const successMessage = await page.locator('text=Your registration completed');
    await expect(successMessage).toBeVisible();
});