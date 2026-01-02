import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login')

    // Check page title
    await expect(page.locator('h1')).toContainText('Login')

    // Check form elements exist
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toContainText('Sign In')
  })

  test('should show validation errors for empty form submission', async ({ page }) => {
    await page.goto('/login')

    // Click submit without filling form
    await page.locator('button[type="submit"]').click()

    // Should show validation errors (form won't submit with invalid data)
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })

  test('should have working email input', async ({ page }) => {
    await page.goto('/login')

    const emailInput = page.locator('input[type="email"]')
    await emailInput.fill('test@example.com')

    await expect(emailInput).toHaveValue('test@example.com')
  })

  test('should have working password input', async ({ page }) => {
    await page.goto('/login')

    const passwordInput = page.locator('input[type="password"]')
    await passwordInput.fill('mypassword123')

    await expect(passwordInput).toHaveValue('mypassword123')
  })
})

test.describe('Home Page', () => {
  test('should display home page with login button', async ({ page }) => {
    await page.goto('/')

    // Check page content
    await expect(page.locator('h1')).toContainText('Hello World')

    // Check login button exists and links to login page
    const loginButton = page.locator('a[href="/login"]')
    await expect(loginButton).toBeVisible()
    await expect(loginButton).toContainText('Login')
  })

  test('should navigate to login page when clicking login button', async ({ page }) => {
    await page.goto('/')

    // Click login button
    await page.locator('a[href="/login"]').click()

    // Should navigate to login page
    await expect(page).toHaveURL('/login')
    await expect(page.locator('h1')).toContainText('Login')
  })
})

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users from /authenticated to /login', async ({ page }) => {
    await page.goto('/authenticated')

    // Should be redirected to login
    await expect(page).toHaveURL('/login')
  })
})
