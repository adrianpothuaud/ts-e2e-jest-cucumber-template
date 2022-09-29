import { EnhancedWebDriver } from '@/web/EnhancedWebDriver'
import { getEnhancedWebDriver } from '@/web/getEnhancedWebDriver'

/**
 * @group sample
 */
describe('E2E Sample Tests: Yahoo', () => {
  let driver: EnhancedWebDriver

  beforeAll(async () => {
    driver = await getEnhancedWebDriver()
  })

  afterAll(async () => {
    await driver.baseWebDriver.quit()
  })

  it('* open yahoo home page', async () => {
    await driver.navTo('https://yahoo.com/')
  })

  it('* takes a screenshot', async () => {
    await driver.takePageScreenshot({ fileName: 'test', parentFolder: 'samples/yahoo' })
  })
})
