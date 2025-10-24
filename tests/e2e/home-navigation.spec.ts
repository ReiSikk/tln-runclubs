// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://runclubs.ee/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Run Clubs Estonia/);
});

test('navigate to first available run club page - alternative', async ({ page }) => {
  await page.goto('https://runclubs.ee/');

  // Wait for any club links to appear
  await page.waitForSelector('a[href*="/runclubs/"]', { state: 'visible' });

  // Get all club links
  const clubLinks = page.locator('a[href*="/runclubs/"]');
  
  // Verify at least one club exists
  await expect(clubLinks.first()).toBeVisible();

    // Click the first club link
  await clubLinks.first().click();

  // Wait for navigation
  await page.waitForURL(/\/runclubs\/.+/);

  // Verify we're on a single club page
  expect(page.url()).toMatch(/\/runclubs\/[^/]+$/);
  
  // Check that a heading exists (any club name)
  await expect(page.locator('h1, h2').first()).toBeVisible();
});

test('tally form links should work', async ({ page, context }) => {
  await page.goto('https://runclubs.ee/');

  // Find all links to Tally forms
  const tallyLinks = page.locator('a[href*="tally.so"]');
  
  // Verify at least one Tally link exists
  const tallyCount = await tallyLinks.count();
  expect(tallyCount).toBeGreaterThan(0);

  // Get the first Tally link
  const firstTallyLink = tallyLinks.first();
  await expect(firstTallyLink).toBeVisible();

  // Verify the link has correct attributes
  const href = await firstTallyLink.getAttribute('href');
  expect(href).toContain('tally.so');

  // Verify it opens in new tab
  const target = await firstTallyLink.getAttribute('target');
  expect(target).toBe('_blank');

  // Click and wait for new page to open
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    firstTallyLink.click()
  ]);

  // Wait for the new page to load
  await newPage.waitForLoadState('domcontentloaded');

  // Verify we're on Tally domain
  expect(newPage.url()).toContain('tally.so');

  // Close the new tab
  await newPage.close();
});
