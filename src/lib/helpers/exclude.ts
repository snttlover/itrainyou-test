export const excludeKeys = (obj: any, items: (keyof typeof obj)[]) => {
  const result = { ...obj }
  items.forEach(key => {
    delete result[key]
  })
  return result
}
