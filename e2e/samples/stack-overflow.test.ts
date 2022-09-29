import { EnhancedWebDriver } from '@/web/EnhancedWebDriver'
import { getEnhancedWebDriver } from '@/web/getEnhancedWebDriver'

/**
 * @group sample
 */
describe('E2E Sample Tests: Stack Overflow', () => {
  let driver: EnhancedWebDriver

  beforeAll(async () => {
    driver = await getEnhancedWebDriver()
  })

  afterAll(async () => {
    await driver.baseWebDriver.quit()
  })

  it('* open stack overflow home page', async () => {
    await driver.navTo('https://stackoverflow.com/')
  })

  it('* takes a screenshot', async () => {
    await driver.takePageScreenshot({ fileName: 'test', parentFolder: 'samples/stack-overflow' })
  })
})
