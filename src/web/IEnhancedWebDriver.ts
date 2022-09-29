import { ThenableWebDriver } from 'selenium-webdriver'

export interface IEnhancedWebDriver extends ThenableWebDriver {
  click: (selector: string) => Promise<void>
  find: (selector: string) => Promise<void>
  fill: (selector: string, textToFill: string) => Promise<void>
  navTo: (url: string) => Promise<void>
  waitForUrl: (url: string) => Promise<void>
  waitUntilVisible: (selector: string) => Promise<void>
}
