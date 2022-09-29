import type { Config } from 'jest'

const baseJestConfig: Config = {
  maxWorkers: '30%',
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/src/$1']
  },
  preset: 'ts-jest',
  runner: 'groups',
  testEnvironment: 'node',
  testTimeout: 12000
}

export default baseJestConfig
