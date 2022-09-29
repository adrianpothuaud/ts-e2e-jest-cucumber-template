import { IWorldOptions, setWorldConstructor } from '@cucumber/cucumber'
import { AxiosResponse } from 'axios'

import { IEnhancedWebDriver } from '@/web/IEnhancedWebDriver'

interface CustomWorld {
  apiResponsesData: { [key: string]: AxiosResponse }
  webDriver: IEnhancedWebDriver | undefined
}

setWorldConstructor(function (this: CustomWorld, options: IWorldOptions) {

})
