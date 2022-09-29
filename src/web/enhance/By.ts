import { By as SelBy } from 'selenium-webdriver'

import { buildXPathFromCustomSelectorString } from '@/web/enhance/xPathUtils'

export const By = {
  customString: (customStringSelector: string): SelBy => SelBy.xpath(buildXPathFromCustomSelectorString(customStringSelector))
}
