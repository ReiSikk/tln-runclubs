import { test, expect } from '@playwright/test';

test.describe('Club Filtering', () => {
  test('should filter clubs by city', async ({ page }) => {
    await page.goto('/');

    // Wait for clubs to load first
    await page.waitForSelector('[data-testid="club-link"]', { state: 'visible' });
    
    // Get initial club count
    const initialCount = await page.getByTestId('club-link').count();
    
    // Select a city filter
    const filterSelect = page.locator('[class*="select__trigger"]');
    await filterSelect.click();
    
    // Select Tallinn
    const option__tallinn = page.locator('[class*="select__option"]>span', { hasText: 'Tallinn' }).first();
    await option__tallinn.click();
    
    // Verify count changed
    const filteredCount = await page.getByTestId('club-link').count();
    expect(filteredCount).toBeLessThan(initialCount);
    
    // Verify title updated
    await expect(page.getByRole('heading', { name: /Run clubs in Tallinn/i })).toBeVisible();
  });

  test('should search clubs by name', async ({ page }) => {
    await page.goto('/');
    
    // Wait for initial clubs to load
    const clubLinks = page.getByTestId('club-link');
    await expect(clubLinks.first()).toBeVisible();
    
    const initialCount = await clubLinks.count();
    console.log('Initial clubs count:', initialCount);
    
    const searchInput = page.getByRole('searchbox');
    
    // For WebKit: clear first, then type slowly with pressSequentially
    await searchInput.clear();
    await searchInput.pressSequentially('Nõmme', { delay: 100 });
    
    // Wait for the count to change (filtered)
    await expect(async () => {
      const currentCount = await clubLinks.count();
      expect(currentCount).toBeLessThan(initialCount);
    }).toPass({ timeout: 5000 });
    
    const filteredCount = await clubLinks.count();
    console.log('Filtered clubs count:', filteredCount);
    
    expect(filteredCount).toBeGreaterThan(0);
    
    // Verify the visible club contains the search term
    const firstClubText = await clubLinks.first().textContent();
    console.log('First club text:', firstClubText);
    expect(firstClubText?.toLowerCase()).toContain('nõmme');
  });

  test('should combine city filter and search', async ({ page }) => {
    await page.goto('/');

    // Wait for clubs to load
    await page.waitForSelector('[data-testid="club-link"]', { state: 'visible' });
    
    // Open the filter dropdown
    const filterSelect = page.locator('[class*="select__trigger"]');
    await filterSelect.click();
    
    // Wait for dropdown to be visible
    await page.waitForSelector('[class*="select__option"]', { state: 'visible' });
    
    // Select Tartu city filter
    const option__tartu = page.locator('[class*="select__option"]>span', { hasText: 'Tartu' }).first();
    await option__tartu.click();
    
    // Wait for filter to apply
    await page.waitForTimeout(300);
    
    // Then search
    const searchInput = page.getByRole('searchbox');
    await searchInput.clear();
    await searchInput.pressSequentially('6:45', { delay: 100 });
    
    // Wait for search to apply
    await page.waitForTimeout(300);
    
    // Verify results
    const clubs = page.getByTestId('club-link');
    const count = await clubs.count();
    
    // Should have 0 or more results (might not have clubs matching "6:45" in Tartu)
    expect(count).toBe(1);
  });

  test('should show no results when filter returns nothing', async ({ page }) => {
    await page.goto('/');
    
    // Wait for clubs to load first
    await page.waitForSelector('[data-testid="club-link"]', { state: 'visible' });
    
    const searchInput = page.getByRole('searchbox');
    await searchInput.clear();
    await searchInput.pressSequentially('NonexistentClubName12345', { delay: 100 });
    
    // Wait for search to apply
    await page.waitForTimeout(500);
    
    // Verify no clubs shown
    const clubs = page.getByTestId('club-link');
    const count = await clubs.count();
    
    console.log('No results count:', count);
    expect(count).toBe(0);
  });
});