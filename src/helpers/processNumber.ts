export const processNumber = (num: number) => {
  const data = '000000'
  const numString = num.toString()

  const zerosToSubtract = Math.min(data.length, numString.length)

  const newData = data.slice(0, -zerosToSubtract)

  return (newData + numString).toString().split('')
}
