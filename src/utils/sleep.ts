export const sleep = async (seconds: number): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000 * seconds)
  })
}
