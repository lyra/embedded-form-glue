// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  expect: {
    timeout: 60 * 1000
  }
})
