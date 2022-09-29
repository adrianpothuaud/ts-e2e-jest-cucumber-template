import { env } from '@/env'
import { IBrowserTestConfig } from '@/web/IBrowserTestConfig'

export const getDefaultBrowserTestConfigFromEnv = (): IBrowserTestConfig => {
  return {
    browser: env.browserName,
    headless: env.headless,
    language: env.language,
    viewport: env.viewport
  }
}
