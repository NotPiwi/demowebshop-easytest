import { test, expect } from '@playwright/test';

test('TC01_Ecommerce_Register_Validation_ErrorMessages', async ({ page }) => {
    // Navegar a la pagina de registro
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Register' }).click();
    // Registrarse con un correo ya existente para verificar error
    await page.getByLabel('Male', { exact: true }).check();
    await page.getByLabel('First name:').fill('Juan');
    await page.getByLabel('Last name:').fill('Pérez');
    await page.getByLabel('Email:').fill('josepaez@gmail.com');
    await page.getByLabel('Password:', { exact: true }).fill('Password123');
    await page.getByLabel('Confirm password:').fill('Password123');
    await page.getByRole('button', { name: 'Register' }).click();
    // Assert de mensaje de error para correo existente
    const errorMessage = await page.locator('text=The specified email already exists');
    await expect(errorMessage).toBeVisible();
    // Borrar correo existente y registrar un nuevo correo, el Date.now le da un corre unico e irrepetible
    await page.getByLabel('Email:').fill('juan.perez' + Date.now() + '@test.com');
    await page.getByRole('button', { name: 'Register' }).click();
    // Assert para validar registro exitoso
    const successMessage = await page.locator('text=Your registration completed');
    await expect(successMessage).toBeVisible();
});