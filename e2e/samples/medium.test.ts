import { EnhancedWebDriver } from '@/web/EnhancedWebDriver'
import { getEnhancedWebDriver } from '@/web/getEnhancedWebDriver'

/**
 * @group sample
 */
describe('E2E Sample Tests: Medium', () => {
  let driver: EnhancedWebDriver

  beforeAll(async () => {
    driver = await getEnhancedWebDriver()
  })

  afterAll(async () => {
    await driver.baseWebDriver.quit()
  })

  it('* open medium home page', async () => {
    await driver.navTo('https://medium.com/')
  })

  it('* takes a screenshot', async () => {
    await driver.takePageScreenshot({ fileName: 'test', parentFolder: 'samples/medium' })
  })
})
