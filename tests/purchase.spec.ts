import { test, expect } from '@playwright/test';

test('test-PURCHASE', async ({ page }) => {
  //Productos a añadir al carrito
  const products = [
    { brand: 'Apple', color: 'White' },
    { brand: 'Apple', color: 'Black' },
    { brand: 'Apple', color: 'Blue' },
    { brand: 'Apple', color: 'Yellow' },
    { brand: 'Samsung', color: 'White' },
    { brand: 'Samsung', color: 'Black' },
    { brand: 'Samsung', color: 'Blue' },
    { brand: 'Samsung', color: 'Yellow' },
  ];

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
  
  //Ciclo para añadir cada producto al carrito
  for (const product of products) {
    const brandDropdown = await page.locator('select[id="product_attribute_80_2_37"]');
    await brandDropdown.selectOption(product.brand);
    const colorDropdown = await page.locator('select[id="product_attribute_80_1_38"]');
    await colorDropdown.selectOption(product.color);
    await page.locator('#add-to-cart-button-80').click();
    expect(await page.waitForSelector('text=The product has been added to your shopping cart', { state: 'visible' })).toBeTruthy();
  }
  await page.getByRole('link', { name: 'Shopping cart' }).first().click();
  await page.locator('#termsofservice').check();
  await page.locator('.checkout-buttons').click();
  for (let i = 0; i < 5; i++) { //aqui hice un ciclo porque eran 5 "Continue" seguidos
    await page.locator('//input[@value="Continue"]').nth(i).click();
  }
  await page.getByRole('button', { name: 'Confirm' }).click();
  const successPurchase = await page.locator('text=Your order has been successfully processed!');
  await expect(successPurchase).toBeVisible();
});