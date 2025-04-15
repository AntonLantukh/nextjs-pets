import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('page has basic sections', async ({ page }) => {
  const metaTitle = await page.title();
  const metaDescription = page.locator('meta[name="description"]');

  await expect(metaTitle).toEqual('Pets App');
  await expect(metaDescription).toHaveAttribute('content', 'Aplication with pets - Home page');

  await expect(page.locator('h1')).toContainText('Pets');
  await expect(page.locator('h2')).toContainText('Results');

  await expect(page.getByTestId('select-species')).toBeVisible();
  await expect(page.getByTestId('select-name')).toBeVisible();
  await expect(page.getByTestId('pill-latest-added')).toBeVisible();

  await expect(page.getByTestId('cards-list')).toBeVisible();
});

test('sorting works', async ({ page }) => {
  const skeleton = page.getByTestId('pets-skeleton');
  const sortingElement = page.getByTestId('pill-latest-added');
  const petCards = page.getByTestId('pet-card');
  const firstCard = petCards.first();

  const checkedBefore = await sortingElement.getAttribute('aria-checked');
  await expect(checkedBefore).toEqual('false');
  await expect(firstCard.locator('h3')).toContainText('Daamin');

  await sortingElement.click();
  await page.waitForURL(/sortBy=dateAdded&order=desc/);
  await expect(skeleton).toHaveCount(0);

  const checkedAfter = await sortingElement.getAttribute('aria-checked');
  await expect(checkedAfter).toEqual('true');
  await expect(firstCard.locator('h3')).toContainText('Mac');
});

test('filtering works', async ({ page }) => {
  const skeleton = page.getByTestId('pets-skeleton');
  const selectElement = page.getByTestId('select-species').getByRole('combobox');
  const selectElementOptions = page.getByTestId('select-species').getByRole('listbox');
  const petCards = page.getByTestId('pet-card');
  const firstCard = petCards.first();

  await expect(selectElement.getByText('Species')).toBeVisible();
  await expect(firstCard.locator('h3')).toContainText('Daamin');

  await selectElement.click();
  await expect(selectElementOptions).toBeVisible();
  await selectElementOptions.getByText('Dog').click();
  await selectElement.click();

  await page.waitForURL(/species=dog/);
  await expect(skeleton).toHaveCount(0);

  await expect(selectElement.getByText('Selected: Dog')).toBeVisible();
  await expect(firstCard.locator('h3')).toContainText('Dan');
});
