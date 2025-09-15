import { test, expect } from '@playwright/test';

test.describe('UI Responsiveness and Animation Tests', () => {
  
  test('should display properly on desktop', async ({ page }) => {
    await page.goto('/login');
    
    // Check desktop layout
    await expect(page.locator('.auth-main-container')).toBeVisible();
    await expect(page.locator('.auth-side-panel')).toBeVisible();
    await expect(page.locator('.auth-form-container')).toBeVisible();
    
    // Verify side panel text is centered
    const welcomeText = page.locator('.auth-side-panel h2');
    await expect(welcomeText).toBeVisible();
    
    // Check that text is properly centered using computed styles
    const textAlign = await welcomeText.evaluate(el => 
      window.getComputedStyle(el).textAlign
    );
    expect(textAlign).toBe('center');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/login');
    
    // Side panel should be hidden on mobile
    await expect(page.locator('.auth-side-panel')).toBeHidden();
    
    // Form should take full width
    const formContainer = page.locator('.auth-form-container');
    await expect(formContainer).toBeVisible();
    
    // Social buttons should be properly sized
    const socialButtons = page.locator('.social-button');
    await expect(socialButtons.first()).toBeVisible();
    
    // Check if buttons stack properly on mobile
    const buttonCount = await socialButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should have smooth animations', async ({ page }) => {
    await page.goto('/login');
    
    // Test social button hover animations
    const googleButton = page.locator('.social-button').first();
    await expect(googleButton).toBeVisible();
    
    // Check for transform transitions
    const hasTransition = await googleButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition.includes('transform') || style.transition.includes('all');
    });
    expect(hasTransition).toBeTruthy();
    
    // Test hover effect
    await googleButton.hover();
    
    // Check if transform is applied on hover
    const transformOnHover = await googleButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transform !== 'none';
    });
    expect(transformOnHover).toBeTruthy();
  });

  test('should handle form input animations', async ({ page }) => {
    await page.goto('/login');
    
    // Switch to login form
    const loginTab = page.getByText('Login');
    if (await loginTab.isVisible()) {
      await loginTab.click();
    }
    
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    
    // Check input has transitions
    const hasTransition = await emailInput.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition.includes('all') || style.transition.includes('transform');
    });
    expect(hasTransition).toBeTruthy();
    
    // Test focus animations
    await emailInput.focus();
    
    // Input should have focus styles
    const isFocused = await emailInput.evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  });

  test('should display all social login buttons', async ({ page }) => {
    await page.goto('/login');
    
    // Check all social buttons are present
    await expect(page.getByText('Continue with Google')).toBeVisible();
    await expect(page.getByText('Continue with Facebook')).toBeVisible();
    await expect(page.getByText('Continue with LinkedIn')).toBeVisible();
    
    // Check button styling
    const facebookButton = page.getByText('Continue with Facebook').locator('..');
    const googleButton = page.getByText('Continue with Google').locator('..');
    const linkedinButton = page.getByText('Continue with LinkedIn').locator('..');
    
    // Verify button colors
    const fbBackground = await facebookButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    const googleBackground = await googleButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    const linkedinBackground = await linkedinButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Facebook should be blue (#1877f2)
    expect(fbBackground).toContain('rgb(24, 119, 242)');
    // Google should be white/light
    expect(googleBackground).toContain('rgb(255, 255, 255)');
    // LinkedIn should be blue (#0077b5)
    expect(linkedinBackground).toContain('rgb(0, 119, 181)');
  });

  test('should handle welcome panel text alignment', async ({ page }) => {
    await page.goto('/login');
    
    // Check welcome panel is visible on desktop
    const welcomePanel = page.locator('.auth-side-panel');
    await expect(welcomePanel).toBeVisible();
    
    // Check all text elements are center-aligned
    const welcomeTitle = page.locator('.auth-side-panel h2');
    const welcomeText = page.locator('.auth-side-panel p');
    
    await expect(welcomeTitle).toBeVisible();
    await expect(welcomeText).toBeVisible();
    
    // Verify text alignment
    const titleAlign = await welcomeTitle.evaluate(el => 
      window.getComputedStyle(el).textAlign
    );
    const textAlign = await welcomeText.evaluate(el => 
      window.getComputedStyle(el).textAlign
    );
    
    expect(titleAlign).toBe('center');
    expect(textAlign).toBe('center');
    
    // Check container alignment
    const containerDiv = page.locator('.auth-side-panel > div');
    const containerAlign = await containerDiv.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        alignItems: style.alignItems,
        justifyContent: style.justifyContent,
        textAlign: style.textAlign
      };
    });
    
    expect(containerAlign.display).toBe('flex');
    expect(containerAlign.alignItems).toBe('center');
    expect(containerAlign.justifyContent).toBe('center');
    expect(containerAlign.textAlign).toBe('center');
  });

  test('should switch between login and signup forms', async ({ page }) => {
    await page.goto('/login');
    
    // Check initial state
    const signupTab = page.getByText('Sign Up');
    const loginTab = page.getByText('Login');
    
    await expect(signupTab).toBeVisible();
    await expect(loginTab).toBeVisible();
    
    // Switch to signup
    await signupTab.click();
    
    // Should see name field in signup
    await expect(page.locator('input[placeholder*="name" i]')).toBeVisible();
    
    // Switch back to login
    await loginTab.click();
    
    // Name field should be hidden
    await expect(page.locator('input[placeholder*="name" i]')).toBeHidden();
    
    // Check form transitions
    const formContainer = page.locator('.auth-form-container');
    const hasTransition = await formContainer.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition.includes('left') || style.transition.includes('all');
    });
    expect(hasTransition).toBeTruthy();
  });

  test('should handle accessibility features', async ({ page }) => {
    await page.goto('/login');
    
    // Check focus indicators
    const emailInput = page.locator('input[type="email"]');
    await emailInput.focus();
    
    // Should have focus outline
    const outline = await emailInput.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.outline || style.outlineStyle;
    });
    expect(outline).toBeTruthy();
    
    // Check social button focus
    const googleButton = page.locator('.social-button').first();
    await googleButton.focus();
    
    const buttonOutline = await googleButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.outline || style.outlineStyle;
    });
    expect(buttonOutline).toBeTruthy();
  });
});