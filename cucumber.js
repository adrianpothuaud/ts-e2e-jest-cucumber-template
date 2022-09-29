module.exports = {
  default: {
    backtrace: true,
    forceExit: true,
    format: [],
    formatOptions: {},
    parallel: 3,
    paths: [
      './features/**/*.feature'
    ],
    publishQuiet: true,
    require: [
      './src/cucumber/support/*.ts',
      './src/cucumber/steps/**/*.ts'
    ],
    retry: 0
  }
}
