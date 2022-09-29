import type { Config } from 'jest'

const baseJestConfig: Config = {
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/src/$1'],
  },
  preset: 'ts-jest',
  runner: 'groups',
  testEnvironment: 'node'
}

export default baseJestConfig
