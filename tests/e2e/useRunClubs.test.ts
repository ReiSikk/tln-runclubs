import { test, expect } from '@playwright/test';

test.describe('useRunClubs Hook', () => {
  test('should return clubs data', async ({ page }) => {
    await page.goto('/');
    
    // Wait for clubs to load
    const clubLinks = page.getByTestId('club-link');
    await expect(clubLinks.first()).toBeVisible({ timeout: 10000 });
    
    // Verify clubs are returned
    const count = await clubLinks.count();
    console.log('Clubs count:', count);
    expect(count).toBeGreaterThan(0);
  });
});