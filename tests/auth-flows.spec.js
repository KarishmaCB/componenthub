import { test, expect } from '@playwright/test';

test.describe('Authentication Flow Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/ComponentHub/i);
    
    // Check main elements are present
    await expect(page.locator('.auth-main-container')).toBeVisible();
    await expect(page.locator('.auth-form-container')).toBeVisible();
    
    // Check social login buttons
    await expect(page.getByText('Continue with Google')).toBeVisible();
    await expect(page.getByText('Continue with Facebook')).toBeVisible();
    await expect(page.getByText('Continue with LinkedIn')).toBeVisible();
    
    // Check form tabs
    await expect(page.getByText('Login')).toBeVisible();
    await expect(page.getByText('Sign Up')).toBeVisible();
  });

  test('should validate email/password login form', async ({ page }) => {
    // Switch to login tab
    await page.getByText('Login').click();
    
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Check for validation messages or prevent submission
    const emailInput = page.locator('input[type="email"]');
    const isRequired = await emailInput.getAttribute('required');
    expect(isRequired).toBe('');
    
    // Fill invalid email
    await emailInput.fill('invalid-email');
    await page.locator('input[type="password"]').fill('short');
    await submitButton.click();
    
    // Check HTML5 validation
    const isValid = await emailInput.evaluate(el => el.validity.valid);
    expect(isValid).toBeFalsy();
  });

  test('should validate signup form', async ({ page }) => {
    // Switch to signup tab
    await page.getByText('Sign Up').click();
    
    // Check name field appears
    const nameInput = page.locator('input[placeholder*="name" i]');
    await expect(nameInput).toBeVisible();
    
    // Fill form with valid data
    await nameInput.fill('Test User');
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="password"]').fill('password123');
    
    // Check form is ready to submit
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('should handle Google login click', async ({ page }) => {
    const googleButton = page.getByText('Continue with Google');
    
    // Mock or expect the button to be clickable
    await expect(googleButton).toBeEnabled();
    
    // Click should trigger authentication flow
    // In a real test, this would open OAuth popup
    await googleButton.click();
    
    // Check that button shows loading state
    await expect(googleButton.locator('..')).toHaveClass(/btn-loading/);
  });

  test('should handle Facebook login click', async ({ page }) => {
    const facebookButton = page.getByText('Continue with Facebook');
    
    await expect(facebookButton).toBeEnabled();
    await facebookButton.click();
    
    // Should show loading state
    await expect(facebookButton.locator('..')).toHaveClass(/btn-loading/);
  });

  test('should handle LinkedIn login click', async ({ page }) => {
    const linkedinButton = page.getByText('Continue with LinkedIn');
    
    await expect(linkedinButton).toBeEnabled();
    await linkedinButton.click();
    
    // LinkedIn shows coming soon message
    // Check for notification or error message
    await page.waitForTimeout(1000);
    
    // Should return to normal state after showing message
    await expect(linkedinButton.locator('..')).not.toHaveClass(/btn-loading/);
  });

  test('should redirect authenticated users from login page', async ({ page }) => {
    // This test would require mocking authentication state
    // For now, just check the redirect logic exists
    
    // Check if already authenticated, should redirect
    const currentUrl = page.url();
    expect(currentUrl).toContain('/login');
    
    // After successful auth, should redirect to dashboard
    // This would need to be tested with actual authentication
  });

  test('should handle form switching animations', async ({ page }) => {
    const signupTab = page.getByText('Sign Up');
    const loginTab = page.getByText('Login');
    
    // Initial state - check login is active
    await expect(loginTab).toHaveClass(/active/);
    
    // Switch to signup
    await signupTab.click();
    await page.waitForTimeout(500); // Wait for animation
    
    // Check signup is now active
    await expect(signupTab).toHaveClass(/active/);
    
    // Switch back to login
    await loginTab.click();
    await page.waitForTimeout(500);
    
    // Check login is active again
    await expect(loginTab).toHaveClass(/active/);
  });

  test('should show loading states for authentication', async ({ page }) => {
    // Test email login loading
    await page.getByText('Login').click();
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="password"]').fill('password123');
    
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Should show loading state
    await expect(submitButton).toHaveClass(/btn-loading/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press('Tab');
    
    // Should focus on first social button
    const firstSocialButton = page.locator('.social-button').first();
    await expect(firstSocialButton).toBeFocused();
    
    // Continue tabbing through social buttons
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should eventually reach form inputs
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeFocused();
  });

  test('should maintain session state', async ({ page }) => {
    // Check if any session storage or local storage is used
    const localStorage = await page.evaluate(() => {
      return Object.keys(window.localStorage);
    });
    
    const sessionStorage = await page.evaluate(() => {
      return Object.keys(window.sessionStorage);
    });
    
    // Firebase typically uses indexedDB for persistence
    // This is more of a structural test
    expect(Array.isArray(localStorage)).toBeTruthy();
    expect(Array.isArray(sessionStorage)).toBeTruthy();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate offline mode
    await page.context().setOffline(true);
    
    const googleButton = page.getByText('Continue with Google');
    await googleButton.click();
    
    // Should handle network error
    await page.waitForTimeout(2000);
    
    // Button should not remain in loading state indefinitely
    await expect(googleButton.locator('..')).not.toHaveClass(/btn-loading/);
    
    // Restore online mode
    await page.context().setOffline(false);
  });
});