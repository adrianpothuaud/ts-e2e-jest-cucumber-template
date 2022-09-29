import { EBrowserViewports } from '@/web/EBrowserViewports'
import { TBrowserViewport } from '@/web/TBrowserViewport'

export const getViewportWidthForViewportName = (viewportName: TBrowserViewport): number => {
  return {
    [EBrowserViewports.IMAC_24]: 1920,
    [EBrowserViewports.IPHONE_8]: 375,
    [EBrowserViewports.MACBOOK_AIR_11]: 1366,
    [EBrowserViewports.MACBOOK_PRO_13]: 2560
  }[viewportName]
}
