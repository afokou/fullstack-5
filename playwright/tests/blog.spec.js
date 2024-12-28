const { test, expect, beforeEach, describe } = require('@playwright/test')

const initialUsers = [
  {
    username: 'michaelchan',
    name: 'Michael Chan',
    password: 'testpassword',
  },
  {
    username: 'edsgerw.dijkstra',
    name: 'Edsger W. Dijkstra',
    password: 'testpassword',
  },
]

describe('Blog app', () => {
  beforeEach(async ({ request }) => {
    // Clear the backend and add initial users to ensure tests are consistent
    // Make a POST request to /reset
    await request.post('https://fullstack-4.fly.dev/reset')
    // Make a POST request to /api/users
    await request.post('https://fullstack-4.fly.dev/api/users', {
      data: initialUsers[0],
    })
    await request.post('https://fullstack-4.fly.dev/api/users', {
      data: initialUsers[1],
    })
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('https://fullstack-5.fly.dev')
    await expect(page.getByText("Login to application")).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('https://fullstack-5.fly.dev')
      await page.fill('input[name="Username"]', 'michaelchan')
      await page.fill('input[name="Password"]', 'testpassword')
      await page.click('button[type=submit]')
      await expect(page.getByText('Michael Chan logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('https://fullstack-5.fly.dev')
      await page.fill('input[name="Username"]', 'michaelchan')
      await page.fill('input[name="Password"]', 'wrongpassword')
      await page.click('button[type=submit]')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('https://fullstack-5.fly.dev')
      await page.fill('input[name="Username"]', 'michaelchan')
      await page.fill('input[name="Password"]', 'testpassword')
      await page.click('button[type=submit]')
      await expect(page.getByText('Michael Chan logged in')).toBeVisible()
    })

    test('a new blog can be created and liked', async ({ page }) => {
      await page.click('text="new blog"')
      await page.fill('input[name="Title"]', 'Test blog')
      await page.fill('input[name="Url"]', 'https://testurl.com')
      await page.click('button[type=submit]')
      await expect(page.getByText('Test blog')).toBeVisible()

      // Check that the new blog can be liked
      await page.click('text="view"')
      await page.click('text="like"')
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a new blog can be deleted', async ({ page }) => {
      await page.click('text="new blog"')
      await page.fill('input[name="Title"]', 'Test blog')
      await page.fill('input[name="Url"]', 'https://testurl.com')
      await page.click('button[type=submit]')
      await expect(page.getByText('Test blog')).toBeVisible()

      // Check that the new blog can be deleted
      await page.click('text="view"')
      page.on('dialog', dialog => dialog.accept());
      await page.click('text="remove"')
      await expect(page.getByText('Test blog')).not.toBeVisible()
    })

    test('other user cannot see the remove button', async ({ page }) => {
      // Create blog by the original user
      await page.click('text="new blog"')
      await page.fill('input[name="Title"]', 'Test blog')
      await page.fill('input[name="Url"]', 'https://testurl.com')
      await page.click('button[type=submit]')
      await expect(page.getByText('Test blog')).toBeVisible()

      // Check that the other user cannot see the delete button
      // Log out and log in as the other user
      await page.click('text="logout"')
      await page.fill('input[name="Username"]', 'edsgerw.dijkstra')
      await page.fill('input[name="Password"]', 'testpassword')
      await page.click('button[type=submit]')

      // Check that the delete button is not visible
      await page.click('text="view"')
      await expect(page.getByText('remove')).not.toBeVisible()
    });
  })
})
