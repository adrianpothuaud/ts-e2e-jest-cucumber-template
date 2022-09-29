import * as dotenv from 'dotenv'

import { EBrowsers } from '@/web/EBrowsers'
import { TBrowserLanguage } from '@/web/TBrowserLanguage'
import { TBrowserViewport } from '@/web/TBrowserViewport'

dotenv.config()

export interface IEnv {
  browserName: EBrowsers
  headless: boolean
  language: TBrowserLanguage
  seleniumHubHost: string | null
  seleniumHubPort: string | null
  viewport: TBrowserViewport
}

export const env: IEnv = {
  browserName: (process.env.WEB_BROWSER_NAME != null) ? process.env.WEB_BROWSER_NAME as EBrowsers : EBrowsers.CHROME,
  headless: (process.env.WEB_BROWSER_HEADLESS != null) ? JSON.parse(process.env.WEB_BROWSER_HEADLESS) : true,
  language: (process.env.WEB_BROWSER_LANGUAGE as TBrowserLanguage) ?? 'english',
  seleniumHubHost: (process.env.SELENIUM_HUB_HOST != null) ? process.env.SELENIUM_HUB_HOST : null,
  seleniumHubPort: (process.env.SELENIUM_HUB_PORT != null) ? process.env.SELENIUM_HUB_PORT : null,
  viewport: (process.env.WEB_BROWSER_VIEWPORT as TBrowserViewport) ?? 'macbook-pro'
}
