import type { Config } from 'jest'

import baseJestConfig from './jest.config'

const e2eJestConfig: Config = {
  ...baseJestConfig,
  testMatch: ['<rootDir>/e2e/**/*.test.ts']
}

export default e2eJestConfig
