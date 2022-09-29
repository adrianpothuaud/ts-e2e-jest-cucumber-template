import { EnhancedWebDriver } from '@/web/EnhancedWebDriver'
import { IBrowserTestConfig } from '@/web/IBrowserTestConfig'
import { getDefaultBrowserTestConfigFromEnv } from '@/web/configure/getDefaultBrowserTestConfigFromEnv'
import { getWebDriver } from '@/web/getWebDriver'

export const getEnhancedWebDriver = async (webDriverConfiguration: IBrowserTestConfig = getDefaultBrowserTestConfigFromEnv()): Promise<EnhancedWebDriver> => {
  const driver = await getWebDriver(webDriverConfiguration)
  const enhancedWebDriver = new EnhancedWebDriver(driver)
  return enhancedWebDriver
}
