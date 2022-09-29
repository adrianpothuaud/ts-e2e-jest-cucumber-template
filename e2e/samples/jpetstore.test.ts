import { EnhancedWebDriver } from '@/web/EnhancedWebDriver'
import { getEnhancedWebDriver } from '@/web/getEnhancedWebDriver'

/**
 * @group sample
 */
describe('E2E Sample Tests: JPetStore demo app (https://petstore.octoperf.com)', () => {
  let driver: EnhancedWebDriver

  beforeAll(async () => {
    driver = await getEnhancedWebDriver()
  })

  afterAll(async () => {
    await driver.baseWebDriver.quit()
  })

  it('* open demo application and enter the store', async () => {
    await driver.navTo('https://petstore.octoperf.com/')
    await driver.click('a[txt:Enter the Store]')
  })

  it('* goes to sign in page through the link on the header', async () => {
    await driver.click('div[#:MenuContent]->a[txt:Sign In]')
  })

  it('* fills login form', async () => {
    await driver.fill('input[n:username]', 'username')
    await driver.fill('input[n:password]', 'password')
    await driver.click('input[n:signon]')
  })

  it('* takes a screenshot', async () => {
    await driver.takePageScreenshot({ fileName: 'test', parentFolder: 'samples/jpetstore' })
  })
})
