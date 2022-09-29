import { EBrowserViewports } from '@/web/EBrowserViewports'
import { TBrowserViewport } from '@/web/TBrowserViewport'

export const getViewportHeightForViewportName = (viewportName: TBrowserViewport): number => {
  return {
    [EBrowserViewports.IMAC_24]: 1200,
    [EBrowserViewports.IPHONE_8]: 667,
    [EBrowserViewports.MACBOOK_AIR_11]: 768,
    [EBrowserViewports.MACBOOK_PRO_13]: 1600
  }[viewportName]
}
