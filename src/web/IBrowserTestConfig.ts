import { EBrowsers } from '@/web/EBrowsers'
import { TBrowserLanguage } from '@/web/TBrowserLanguage'
import { TBrowserViewport } from '@/web/TBrowserViewport'

export interface IBrowserTestConfig {
  browser: EBrowsers
  headless: boolean
  language: TBrowserLanguage
  viewport: TBrowserViewport
}
