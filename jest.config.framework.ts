import type { Config } from 'jest'

import baseJestConfig from './jest.config'

const frameworkJestConfig: Config = {
  ...baseJestConfig,
  collectCoverage: true,
  testMatch: ['<rootDir>/tests/**/*.test.ts']
}

export default frameworkJestConfig
