import { Options } from 'selenium-webdriver/chrome'

import { IBrowserTestConfig } from '@/web/IBrowserTestConfig'
import { getLanguageParams } from '@/web/configure/getLanguageParams'
import { getViewportHeightForViewportName } from '@/web/configure/getViewportHeightForViewportName'
import { getViewportWidthForViewportName } from '@/web/configure/getViewportWidthForViewportName'

export const getChromeOptions = ({ headless, language, viewport }: IBrowserTestConfig): Options => {
  const { acceptLang, countryCode, lang } = getLanguageParams(language)
  const options = new Options()
    .addArguments(
      `--accept-lang=${acceptLang}`,
      `--default-country-code=${countryCode}`,
      `--lang=${lang}`,
      `--window-size=${getViewportWidthForViewportName(viewport)},${getViewportHeightForViewportName(viewport)}`
    )
  if (headless) options.addArguments('--headless')
  return headless ? options.headless() : options
}
