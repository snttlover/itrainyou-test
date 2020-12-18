
export function parseFloatToString(value: string | number |  null):string | number {
  if (value === null) return ""
  // @ts-ignore
  const returnedValue = parseFloat(value)
  return returnedValue
}