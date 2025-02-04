import { test, expect } from '@playwright/test'

test.describe(`Sample embedded examples`, () => {
  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
  })

  test('KR.addForm minimal', async ({ page }) => {
    await page.goto(`http://127.0.0.1:8080/tests/views/addFormMinimal.html`)
    await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
    await expect(page.locator('#krtoolbar')).toBeVisible()

    await expect(page.locator('.kr-payment-button')).toBeVisible()
    await expect(page.locator('.kr-payment-button')).toContainText('PAY')
  })

  test('KR.attachForm minimal', async ({ page }) => {
    await page.goto(`http://127.0.0.1:8080/tests/views/attachFormMinimal.html`)
    await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
    await expect(page.locator('#krtoolbar')).toBeVisible()

    await expect(page.locator('.kr-payment-button')).toBeVisible()
    await expect(page.locator('.kr-payment-button')).toContainText('PAY')
  })

  test('KR.attachForm reload', async ({ page }) => {
    await page.goto(`http://127.0.0.1:8080/tests/views/attachFormReload.html`)
    await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
    await expect(page.locator('#krtoolbar')).toBeVisible()

    await expect(page.locator('.kr-payment-button')).toBeVisible()
    await expect(page.locator('.kr-payment-button')).toContainText('PAY')
  })

  test('KR.attachForm invalid endpoint domain', async ({ page }) => {
    await page.goto(`http://127.0.0.1:8080/tests/views/attachFormInvalid.html`)
    await expect(page.locator('#test-error')).toBeVisible()

    await expect(page.locator('#test-error')).toContainText(
      '[~~CHANGE_ME_ENDPOINT~~] is not a valid endpoint domain'
    )
  })

  test('KR.attachForm invalid public key', async ({ page }) => {
    await page.goto(
      `http://127.0.0.1:8080/tests/views/attachFormInvalidPublicKey.html`
    )
    await expect(page.locator('#test-error')).toBeVisible()

    await expect(page.locator('#test-error')).toContainText(
      '[testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5] is not a valid public key'
    )
  })

  test('KR.attachForm + domain without protocol', async ({ page }) => {
    await page.goto(
      `http://127.0.0.1:8080/tests/views/attachFormDomainWithoutProtocol.html`
    )
    await expect(page.locator('#test-error')).toBeVisible()

    await expect(page.locator('#test-error')).toContainText(
      '[api.lyra.com] is not a valid endpoint domain'
    )
  })

  test('KR.attachForm minimal + publicKey update', async ({ page }) => {
    await page.goto(`http://127.0.0.1:8080/tests/views/attachFormMinimal.html`)
    await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
    await expect(page.locator('#krtoolbar')).toBeVisible()

    await expect(page.locator('.kr-payment-button')).toBeVisible()
    await expect(page.locator('.kr-payment-button')).toContainText('PAY')

    const currentPK = await page.evaluate(async () => {
      return KR.$store.state.publicKey
    })
    await expect(currentPK).toBe(
      '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5'
    )

    await page.evaluate(async () => {
      await KRGlue.loadLibrary('https://api.lyra.com', 'INVALID_PUBLIC_KEY')
    })

    const updatedPK = await page.evaluate(async () => {
      return KR.$store.state.publicKey
    })
    await expect(updatedPK).toBe('INVALID_PUBLIC_KEY')
  })

  test('KR.loadLibrary + mutliple times', async ({ page }) => {
    const logs = []
    page.on('pageerror', exception => {
      logs.push(exception)
    })
    page.on('console', async msg => {
      logs.push(msg)
    })
    await page.goto(`http://127.0.0.1:8080/tests/views/loadLibrary.html`)
    await expect(page.locator('.kr-app-container')).toHaveCount(1)

    await expect(logs.length).toBe(0)
  })
})
