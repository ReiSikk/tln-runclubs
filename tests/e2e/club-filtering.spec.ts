import { test, expect } from '@playwright/test';

test.describe('Club Filtering', () => {
  test('should filter clubs by city', async ({ page }) => {
    await page.goto('/');

    const allClubsSection = page.getByTestId('all-clubs-section');
    const clubLinks = allClubsSection.getByTestId('club-link');

    await expect(clubLinks.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    
    const initialCount = await clubLinks.count();
    
    const filterSelect = page.locator('[class*="select__trigger"]');
    await filterSelect.click();
    
    const tallinnOption = page.locator('[class*="select__option"]>span', { hasText: 'Tallinn' }).first();
    await expect(tallinnOption).toBeVisible();
    await tallinnOption.click({ force: true });
    
    // Wait for state update before checking heading
    await page.waitForTimeout(300);
    
    await expect(async () => {
      const heading = page.getByRole('heading', { name: /Run clubs in Tallinn/i });
      await expect(heading).toBeVisible();
    }).toPass({ timeout: 5000 });
    
    await expect(async () => {
      const filteredCount = await clubLinks.count();
      expect(filteredCount).toBeLessThan(initialCount);
    }).toPass({ timeout: 5000 });
  });

  test('should search clubs by name', async ({ page }) => {
    await page.goto('/');
    
    const allClubsSection = page.getByTestId('all-clubs-section');
    const clubLinks = allClubsSection.getByTestId('club-link');
    
    await expect(clubLinks.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    
    const initialCount = await clubLinks.count();
    
    const searchInput = page.getByRole('searchbox');
    await searchInput.clear();
    await searchInput.pressSequentially('Nõmme', { delay: 100 });
    
    await expect(async () => {
      const currentCount = await clubLinks.count();
      expect(currentCount).toBeLessThan(initialCount);
      expect(currentCount).toBeGreaterThan(0);
    }).toPass({ timeout: 5000 });
    
    const firstClubText = await clubLinks.first().textContent();
    expect(firstClubText?.toLowerCase()).toContain('nõmme');
  });

  test('should combine city filter and search', async ({ page }) => {
    await page.goto('/');

    const allClubsSection = page.getByTestId('all-clubs-section');
    const clubLinks = allClubsSection.getByTestId('club-link');
    
    await expect(clubLinks.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    
    const filterSelect = page.locator('[class*="select__trigger"]');
    await filterSelect.click();
    
    const tartuOption = page.locator('[class*="select__option"]>span', { hasText: 'Tartu' }).first();
    await expect(tartuOption).toBeVisible();
    await tartuOption.click({ force: true });
    
    // Critical: Wait for React state to propagate
    await page.waitForTimeout(500);
    
    await expect(async () => {
      const heading = page.getByRole('heading', { name: /Run clubs in Tartu/i });
      await expect(heading).toBeVisible();
    }).toPass({ timeout: 5000 });
    
    const searchInput = page.getByRole('searchbox');
    await searchInput.clear();
    await searchInput.pressSequentially('6:45', { delay: 100 });
    
    // Extra wait for search to process
    await page.waitForTimeout(300);
    
    await expect(async () => {
      const count = await clubLinks.count();
      expect(count).toBe(1);
    }).toPass({ timeout: 5000 });
    
    const resultText = await clubLinks.first().textContent();
    expect(resultText).toContain('6:45');
  });

  test('should show no results when filter returns nothing', async ({ page }) => {
    await page.goto('/');
    
    const allClubsSection = page.getByTestId('all-clubs-section');
    const clubLinks = allClubsSection.getByTestId('club-link');
    
    await expect(clubLinks.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    
    const searchInput = page.getByRole('searchbox');
    await searchInput.clear();
    await searchInput.pressSequentially('NonexistentClubName12345', { delay: 100 });
    
    await expect(async () => {
      const count = await clubLinks.count();
      expect(count).toBe(0);
    }).toPass({ timeout: 5000 });
  });
});