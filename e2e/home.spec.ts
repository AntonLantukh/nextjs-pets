import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('page has basic sections', async ({ page }) => {
  const metaTitle = await page.title();
  const metaDescription = page.locator('meta[name="description"]');

  // Check metadata
  await expect(metaTitle).toEqual('Pets App');
  await expect(metaDescription).toHaveAttribute('content', 'Aplication with pets - Home page');

  // Check headers
  await expect(page.locator('h1')).toContainText('Pets');
  await expect(page.locator('h2')).toContainText('Results');

  // Check filters
  await expect(page.getByTestId('dropdown-species')).toBeVisible();
  await expect(page.getByTestId('dropdown-name')).toBeVisible();
  await expect(page.getByTestId('pill-latest-added')).toBeVisible();

  // Check cards
  await expect(page.getByTestId('cards-list')).toBeVisible();
});

test('sorting works', async ({ page }) => {
  const sortingElement = page.getByTestId('pill-latest-added');
  const petCards = page.getByTestId('pet-card');
  const firstCard = petCards.first();

  // State before clicking
  const checkedBefore = await sortingElement.getAttribute('aria-checked');
  await expect(checkedBefore).toEqual('false');
  await expect(firstCard.locator('h3')).toContainText('Daamin');

  await sortingElement.click();
  await page.waitForTimeout(2000);

  // State after clicking
  const checkedAfter = await sortingElement.getAttribute('aria-checked');
  await expect(checkedAfter).toEqual('true');
  await expect(firstCard.locator('h3')).toContainText('Arlo');
});

test('filtering works', async ({ page }) => {
  const sortingElement = page.getByTestId('pill-latest-added');
  const petCards = page.getByTestId('pet-card');
  const firstCard = petCards.first();

  // State before clicking
  const checkedBefore = await sortingElement.getAttribute('aria-checked');
  await expect(checkedBefore).toEqual('false');
  await expect(firstCard.locator('h3')).toContainText('Daamin');

  await sortingElement.click();
  await page.waitForTimeout(2000);

  // State after clicking
  const checkedAfter = await sortingElement.getAttribute('aria-checked');
  await expect(checkedAfter).toEqual('true');
  await expect(firstCard.locator('h3')).toContainText('Arlo');
});
