import { test, expect } from '@playwright/test';

test.describe('Visual Authentication Tests', () => {
  
  test('should load login page and verify visual elements', async ({ page }) => {
    await page.goto('/login');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for visual comparison
    await expect(page).toHaveScreenshot('login-page-full.png', { 
      fullPage: true,
      animations: 'disabled' 
    });
    
    // Check that all major components are visible
    await expect(page.locator('.auth-main-container')).toBeVisible();
    
    // Verify the welcome panel text alignment
    const welcomePanel = page.locator('.auth-side-panel');
    if (await welcomePanel.isVisible()) {
      // Check text center alignment
      const welcomeTitle = page.locator('.auth-side-panel h2');
      const titleAlignment = await welcomeTitle.evaluate(el => 
        window.getComputedStyle(el).textAlign
      );
      expect(titleAlignment).toBe('center');
      
      console.log('✅ Welcome panel text is properly centered');
    }
    
    // Check social buttons are visible and properly styled
    const socialButtons = [
      { text: 'Continue with Google', color: 'rgb(255, 255, 255)' },
      { text: 'Continue with Facebook', color: 'rgb(24, 119, 242)' },
      { text: 'Continue with LinkedIn', color: 'rgb(0, 119, 181)' }
    ];
    
    for (const button of socialButtons) {
      const buttonElement = page.getByText(button.text);
      await expect(buttonElement).toBeVisible();
      
      const bgColor = await buttonElement.locator('..').evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBe(button.color);
    }
    
    console.log('✅ All social buttons are properly styled');
    
    // Test animation properties
    const firstSocialButton = page.locator('.social-button').first();
    const hasTransition = await firstSocialButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition.includes('transform') || style.transition.includes('all');
    });
    expect(hasTransition).toBeTruthy();
    
    console.log('✅ Social buttons have smooth transitions');
  });
  
  test('should test responsive behavior', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    
    // Side panel should be hidden
    await expect(page.locator('.auth-side-panel')).toBeHidden();
    
    // Form should be visible and centered
    await expect(page.locator('.auth-form-container')).toBeVisible();
    
    // Take mobile screenshot
    await expect(page).toHaveScreenshot('login-page-mobile.png', { 
      fullPage: true,
      animations: 'disabled' 
    });
    
    console.log('✅ Mobile responsiveness working correctly');
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Take tablet screenshot
    await expect(page).toHaveScreenshot('login-page-tablet.png', { 
      fullPage: true,
      animations: 'disabled' 
    });
    
    console.log('✅ Tablet responsiveness working correctly');
  });
  
  test('should test form switching via side panels', async ({ page }) => {
    await page.goto('/login');
    
    // Check initial state - should be login form
    const formTitle = page.locator('.auth-title');
    await expect(formTitle).toBeVisible();
    
    let titleText = await formTitle.textContent();
    console.log('Initial form state:', titleText);
    
    // Look for side panel buttons to switch forms
    const sidePanelButtons = page.locator('.auth-side-panel button');
    const buttonCount = await sidePanelButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Click the first side panel button to switch forms
    const firstButton = sidePanelButtons.first();
    await firstButton.click();
    await page.waitForTimeout(800); // Wait for animation
    
    // Check if title changed
    const newTitleText = await formTitle.textContent();
    console.log('After clicking side panel button:', newTitleText);
    expect(newTitleText).not.toBe(titleText);
    
    // Check if name field appears in signup mode
    const nameField = page.locator('input[placeholder*="name" i]');
    if (newTitleText.includes('Join')) {
      await expect(nameField).toBeVisible();
      console.log('✅ Name field visible in signup form');
    }
    
    console.log('✅ Form switching via side panels working');
  });
  
  test('should verify text alignment fixes', async ({ page }) => {
    await page.goto('/login');
    
    // Check both welcome panels for proper text alignment
    const welcomePanels = await page.locator('.auth-side-panel').count();
    expect(welcomePanels).toBeGreaterThan(0);
    
    // Test first panel
    const firstPanelTitle = page.locator('.auth-side-panel h2').first();
    const firstPanelText = page.locator('.auth-side-panel p').first();
    
    await expect(firstPanelTitle).toBeVisible();
    await expect(firstPanelText).toBeVisible();
    
    // Verify text alignment
    const titleAlign = await firstPanelTitle.evaluate(el => 
      window.getComputedStyle(el).textAlign
    );
    const textAlign = await firstPanelText.evaluate(el => 
      window.getComputedStyle(el).textAlign
    );
    
    expect(titleAlign).toBe('center');
    expect(textAlign).toBe('center');
    
    console.log('✅ Welcome panel text alignment is correctly centered');
  });
});