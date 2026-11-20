import { test, expect, type Page } from '@playwright/test'

const examples = [
  { name: 'Angular', port: '9000' },
  { name: 'Ember', port: '9001' },
  { name: 'Ionic', port: '9002' },
  { name: 'React', port: '9003' },
  { name: 'Next', port: '9004' },
  { name: 'Svelte', port: '9005' },
  { name: 'Vue options API', port: '9006' },
  { name: 'Vue composition API', port: '9007' }
]

examples.forEach(example => {
  test.describe(`${example.name} example`, () => {
    test.beforeEach(async ({ page }, testInfo) => {
      await page.goto(`http://127.0.0.1:${example.port}/`)
      testInfo.setTimeout(60000)
    })

    test('Container for embedded form exists', async ({ page }) => {
      await expect(page.locator('#myPaymentForm')).toBeVisible()
    })

    test('Theme assets are included', async ({ page }) => {
      await expect(page.locator('head script#krglue-theme-js')).toBeAttached()
      await expect(page.locator('head link#krglue-theme-css')).toBeAttached()
    })

    test('Embedded form loads', async ({ page }) => {
      await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
      await expect(page.locator('krypton-toolbar')).toBeVisible()
    })

    test('Accepted test card payment is succesful', async ({ page }) => {
      await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
      await expect(page.locator('krypton-toolbar')).toBeVisible()

      // Select the test card
      await selectTestCard(page, 'visa:accepted')

      // Before clicking the button, check that the payment message is not visible
      await expect(
        page.locator('[data-test="payment-message"]')
      ).not.toContainText('Payment successful!')

      await page.locator('button.kr-payment-button').click()

      // After clicking the button, check that the payment message is visible
      await expect(page.locator('[data-test="payment-message"]')).toContainText(
        'Payment successful!'
      )
    })

    test('Refused test card payment should return an error', async ({
      page
    }) => {
      await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
      await expect(page.locator('krypton-toolbar')).toBeVisible()

      // Select the test card
      await selectTestCard(page, 'visa:refused')

      // Before clicking the button, check that the error is not visible
      await expect(
        page.locator('.kr-form-error.kr-form-error-visible')
      ).not.toBeVisible()

      await page.locator('button.kr-payment-button').click()

      // After clicking the button, check that the error is visible
      await expect(
        page.locator('.kr-form-error.kr-form-error-visible')
      ).not.toBeVisible()
    })
  })
})

async function selectTestCard(page: Page, cardId: string) {
  await page.evaluate(cardId => {
    const toolbarWindow = window as typeof window & {
      KR_TOOLBAR: { selectTestCard(cardId: string): void | Promise<void> }
    }
    return toolbarWindow.KR_TOOLBAR.selectTestCard(cardId)
  }, cardId)
}
