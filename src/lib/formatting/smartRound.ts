export const smartRound = (
  value?: number, 
  separator?: string
): string => {
  if (!value) return ""

  const preparedValue = value.toFixed(1)

  return Number.isInteger(Number(preparedValue)) 
    ? preparedValue[0]
    : preparedValue.replace(".", separator || ",")
} 