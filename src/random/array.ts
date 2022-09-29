export const getRandomArrayItem = <CustomType>(array: CustomType[]): CustomType => array[Math.floor(Math.random() * array.length)]
