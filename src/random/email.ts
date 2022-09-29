import { getRandomDigits } from '@/random/digits'

export const getRandomEmailBasedOn = (baseEmail: string): string => {
  return baseEmail.replace('@', `+${getRandomDigits(6)}@`)
}
