const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('https://fullstack-5.fly.dev')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText("Login to application")).toBeVisible()
  })
})
