import { getRandomArrayItem } from './array'

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const getRandomDigit = (): string => {
  return getRandomArrayItem(digits)
}

export const getRandomDigits = (size: number): string => {
  const final = []
  for (let i = 0; i < size; i++) {
    final.push(getRandomDigit())
  }
  return final.join('')
}
