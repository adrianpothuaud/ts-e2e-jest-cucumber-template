import { Options } from 'selenium-webdriver/firefox'

import { IBrowserTestConfig } from '@/web/IBrowserTestConfig'
import { getLanguageParams } from '@/web/configure/getLanguageParams'
import { getViewportHeightForViewportName } from '@/web/configure/getViewportHeightForViewportName'
import { getViewportWidthForViewportName } from '@/web/configure/getViewportWidthForViewportName'

export const getFirefoxOptions = ({ headless, language, viewport }: IBrowserTestConfig): Options => {
  const { acceptLang, lang } = getLanguageParams(language)
  const options = new Options()
    .headless()
    .setPreference('intl.accept_languages', `${lang},${acceptLang}`)
    .windowSize({ height: getViewportHeightForViewportName(viewport), width: getViewportWidthForViewportName(viewport) })
  return options
}
