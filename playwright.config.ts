// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  expect: {
    timeout: 30 * 1000
  }
})
