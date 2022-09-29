import { getAnyRandomCases } from '@/random/cases'

export const getRandomPassword = (): string => {
  return getAnyRandomCases(12)
}
