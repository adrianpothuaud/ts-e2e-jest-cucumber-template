import { Chance } from 'chance'

export const getRandomFullName = (): string => {
  return new Chance().name()
}
