import { ICustomSelectorItem } from '@/web/ICustomSelectorItem'

const itemHasAtLeastOneAttr = (item: ICustomSelectorItem): boolean => {
  if (item.class !== undefined) return true
  else if (item.containsClass !== undefined) return true
  else if (item.id !== undefined) return true
  else if (item.name !== undefined) return true
  else if (item.placeholder !== undefined) return true
  else if (item.text !== undefined) return true
  else if (item.textContains !== undefined) return true
  else if (item.type !== undefined) return true
  else if (item.value !== undefined) return true
  else if (item.valueContains !== undefined) return true
  return false
}

export const buildXPathFromCustomSelectorItems = (items: ICustomSelectorItem[]): string => {
  const builtXPath = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const unitXPath = ['//']

    // start with the tag
    if (item.tag !== undefined) unitXPath.push(item.tag)
    else unitXPath.push('*')

    // if other attributes
    if (itemHasAtLeastOneAttr(item)) {
      unitXPath.push('[')

      // handle attributes
      let alreadyAddedAttribute = false

      // id first
      if (item.id !== undefined) {
        unitXPath.push(`@id='${item.id}'`)
        alreadyAddedAttribute = true
      }

      // exact class name
      if (item.class !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`@class='${item.class}'`)
        alreadyAddedAttribute = true
      }

      // contains class
      if (item.containsClass !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`contains(@class, '${item.containsClass}')`)
        alreadyAddedAttribute = true
      }

      // name
      if (item.name !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`@name='${item.name}'`)
        alreadyAddedAttribute = true
      }

      // exact text
      if (item.text !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`text()='${item.text}'`)
        alreadyAddedAttribute = true
      }

      // text contains
      if (item.textContains !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`contains(text(), '${item.textContains}')`)
        alreadyAddedAttribute = true
      }

      // exact placeholder
      if (item.placeholder !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`@placeholder='${item.placeholder}'`)
        alreadyAddedAttribute = true
      }

      // exact typedefs
      if (item.type !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`@type='${item.type}'`)
        alreadyAddedAttribute = true
      }

      // exact value
      if (item.value !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`@value='${item.value}'`)
        alreadyAddedAttribute = true
      }

      // value contains
      if (item.valueContains !== undefined) {
        if (alreadyAddedAttribute) unitXPath.push(' and ')
        unitXPath.push(`contains(@value, '${item.valueContains}')`)
        alreadyAddedAttribute = true
      }

      unitXPath.push(']')
    }

    builtXPath.push(unitXPath.join(''))
  }

  const finalXPath = builtXPath.join('')
  return finalXPath
}

const transformStringAttributeToCustomSelectorAttribute = (strAttr: string): string => {
  return {
    '#': 'id',
    '*.': 'containsClass',
    '*txt': 'textContains',
    '*val': 'valueContains',
    '.': 'class',
    n: 'name',
    txt: 'text',
    type: 'type',
    val: 'value'
  }[strAttr] ?? strAttr
}

const transformStringItemAttribute = (notParsedAttr: string): ICustomSelectorItem => {
  const [key, value] = notParsedAttr.split(':')
  const refinedKey = transformStringAttributeToCustomSelectorAttribute(key)
  return { [refinedKey]: value }
}

const transformCustomSelectorStringToItems = (selectorString: string): ICustomSelectorItem[] => {
  const notParsedItems = selectorString.split('->')
  const parsedItems: ICustomSelectorItem[] = []
  for (let notParsedItemsIndex = 0; notParsedItemsIndex < notParsedItems.length; notParsedItemsIndex++) {
    let notParsedItem = notParsedItems[notParsedItemsIndex]
    let parsedItem: ICustomSelectorItem = {}
    let hasTag = false
    if (notParsedItem.includes('[')) {
      if (notParsedItem.includes(']')) {
        const openingBracketIndex = notParsedItem.indexOf('[')
        if (openingBracketIndex > 0) {
          hasTag = true
          const tag = notParsedItem.split('[')[0]
          parsedItem.tag = tag
          notParsedItem = notParsedItem.replace(`${tag}[`, '[')
        }
        if (notParsedItem.includes(',')) {
          const notParsedAttrs = notParsedItem
            .split('[')[hasTag ? 1 : 0]
            .split(']')[0]
            .split(',')
          for (let attrIndex = 0; attrIndex < notParsedAttrs.length; attrIndex++) {
            const notParsedAttr = notParsedAttrs[attrIndex]
            parsedItem = { ...parsedItem, ...transformStringItemAttribute(notParsedAttr) }
          }
        } else {
          const notParsedAttrs = notParsedItem
            .replace('[', '')
            .replace(']', '')
          parsedItem = { ...parsedItem, ...transformStringItemAttribute(notParsedAttrs) }
        }
      } else {
        throw new Error('malformed custom selector string, closing ] is missing for item: ' + notParsedItem)
      }
    } else { // should be only a tag
      parsedItem.tag = notParsedItem
    }
    // refine some shortcuts
    // tags shortcuts
    if (parsedItem.tag !== undefined) {
      parsedItem.tag = {
        btn: 'button',
        d: 'div'
      }[parsedItem.tag] ?? parsedItem.tag
    }

    parsedItems.push(parsedItem)
  }
  return parsedItems
}

export const buildXPathFromCustomSelectorString = (item: string): string => {
  const parsedItems = transformCustomSelectorStringToItems(item)
  const finalXPath = buildXPathFromCustomSelectorItems(parsedItems)
  return finalXPath
}
