import { Builder, WebDriver } from 'selenium-webdriver'
import 'chromedriver'
import 'geckodriver'

import { sleep } from '@/utils/sleep'
import { EBrowsers } from '@/web/EBrowsers'
import { IBrowserTestConfig } from '@/web/IBrowserTestConfig'
import { getChromeOptions } from '@/web/configure/getChromeOptions'
import { getFirefoxOptions } from '@/web/configure/getFirefoxOptions'

export const getWebDriver = async (webDriverConfig: IBrowserTestConfig): Promise<WebDriver> => {
  let driver

  if (webDriverConfig.browser === EBrowsers.CHROME) {
    const options = getChromeOptions(webDriverConfig)
    driver = await new Builder().forBrowser(EBrowsers.CHROME).setChromeOptions(options).build()
  } else {
    const options = getFirefoxOptions(webDriverConfig)
    driver = await new Builder().forBrowser(EBrowsers.FIREFOX).setFirefoxOptions(options).build()
  }

  await sleep(1)

  return driver
}
