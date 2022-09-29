import path from 'path'

export const projectRootPath = path.dirname(path.dirname(__dirname))

export const testInputsPath = path.join(projectRootPath, 'test-inputs')
export const testOutputsPath = path.join(projectRootPath, 'test-outputs')

export const testReportsPath = path.join(testOutputsPath, 'reports')
export const testScreenshotsPath = path.join(testOutputsPath, 'screenshots')
