import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'
import { until, WebDriver, WebElement } from 'selenium-webdriver'
import slugify from 'slugify'

import { testInputsPath, testScreenshotsPath } from '@/fsutils/paths'
import { sleep } from '@/utils/sleep'
import { IScreenshotConfig } from '@/web/IScreenshotConfig'
import { DEFAULT_CONDITION_TIMEOUT, DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT } from '@/web/configure/defaults'
import { By } from '@/web/enhance/By'

export class EnhancedWebDriver {
  baseWebDriver: WebDriver

  constructor (baseWebDriver: WebDriver) {
    this.baseWebDriver = baseWebDriver
  }

  async click (selector: string): Promise<void> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(selector))
    )
    await targetElement.click()
  }

  async fill (selector: string, text: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT): Promise<void> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(selector)),
      waitForElementTimeout
    )
    await targetElement.sendKeys(text)
  }

  async find (selector: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT): Promise<WebElement> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(selector)),
      waitForElementTimeout
    )
    return targetElement
  }

  async navTo (url: string): Promise<void> {
    await this.baseWebDriver.get(url)
    await sleep(1)
  }

  async takePageScreenshot (screenshotConfig: IScreenshotConfig): Promise<void> {
    const image = await this.baseWebDriver.takeScreenshot()
    const imageFolderPath = screenshotConfig.parentFolder !== undefined ? path.join(testScreenshotsPath, screenshotConfig.parentFolder) : testScreenshotsPath
    mkdirp.sync(imageFolderPath)
    const slug = slugify(screenshotConfig.fileName)
    const imagePath = path.join(imageFolderPath, slug + '.png')
    fs.writeFileSync(imagePath, image, 'base64')
  }

  /**
   * Upload a file to a file input
   * @param inputSelector
   * @param filePathFromTestInputs
   * @param waitForElementTimeout
   */
  async uploadFile (inputSelector: string, filePathFromTestInputs: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT): Promise<void> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(inputSelector)),
      waitForElementTimeout
    )
    await targetElement.sendKeys(
      path.join(
        testInputsPath,
        filePathFromTestInputs
      )
    )
  }

  async waitForElementBgColor (selector: string, bgColor: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT, waitForConditionTimeout: number = DEFAULT_CONDITION_TIMEOUT): Promise<void> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(selector)),
      waitForElementTimeout
    )
    await this.baseWebDriver.wait(
      async () => {
        const currentColor = await targetElement.getCssValue('background-color')
        return currentColor === bgColor
      },
      waitForConditionTimeout
    )
  }

  async waitForElementNotVisible (selector: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT, waitForConditionTimeout: number = DEFAULT_CONDITION_TIMEOUT): Promise<void> {
    try {
      await this.baseWebDriver.wait(
        async () => {
          try {
            const targetElement = await this.baseWebDriver.wait(
              until.elementLocated(By.customString(selector)),
              waitForElementTimeout
            )
            const currentlyVisible = await targetElement.isDisplayed()
            return !currentlyVisible
          } catch (e) {
            return true
          }
        },
        waitForConditionTimeout
      )
    } catch (e) {
      throw new Error(`Failed method WAIT UNTILNOT VISIBLE with selector: ${selector} and timeout: ${waitForConditionTimeout}`)
    }
  }

  async waitForElementText (selector: string, text: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT, waitForConditionTimeout: number = DEFAULT_CONDITION_TIMEOUT): Promise<void> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(selector)),
      waitForElementTimeout
    )
    await this.baseWebDriver.wait(
      async () => {
        const currentText = await targetElement.getText()
        return currentText.includes(text)
      },
      waitForConditionTimeout
    )
  }

  async waitForElementVisible (selector: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT, waitForConditionTimeout: number = DEFAULT_CONDITION_TIMEOUT): Promise<void> {
    try {
      await this.baseWebDriver.wait(
        async () => {
          try {
            const targetElement = await this.baseWebDriver.wait(
              until.elementLocated(By.customString(selector)),
              waitForElementTimeout
            )
            const currentlyVisible = await targetElement.isDisplayed()
            return currentlyVisible
          } catch (e) {
            return false
          }
        },
        waitForConditionTimeout
      )
    } catch (e) {
      throw new Error(`Failed method WAIT UNTIL VISIBLE with selector: ${selector} and timeout: ${waitForConditionTimeout}`)
    }
  }

  async waitForInputValue (selector: string, value: string, waitForElementTimeout: number = DEFAULT_WAIT_FOR_ELEMENT_TIMEOUT, waitForConditionTimeout: number = DEFAULT_CONDITION_TIMEOUT): Promise<void> {
    const targetElement = await this.baseWebDriver.wait(
      until.elementLocated(By.customString(selector)),
      waitForElementTimeout
    )
    await this.baseWebDriver.wait(
      async () => {
        const currentValue = await targetElement.getAttribute('value')
        return currentValue === value
      },
      waitForConditionTimeout
    )
  }

  async waitForUrl (url: string, waitForConditionTimeout: number = DEFAULT_CONDITION_TIMEOUT): Promise<void> {
    try {
      await this.baseWebDriver.wait(until.urlIs(url), waitForConditionTimeout)
    } catch (e) {
      throw new Error(`Failed method WAIT FOR URL with url: ${url} and timeout: ${waitForConditionTimeout}`)
    }
  }
}
