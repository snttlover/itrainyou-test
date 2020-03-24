const isArray = <T>(a: any | T[]): a is T[] => Array.isArray(a)
const isObject = (o: any): o is object => o === Object(o) && !isArray(o) && typeof o !== "function"
const toCamel = (s: string) => s.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace("_", ""))
const toSnake = (s: string) => s.replace(/(?:^|\.?)([A-Z])/g, (x, y) => "_" + y.toLowerCase()).replace(/^_/, "")

const transform = (func: (s: string) => string) => (o: any): any => {
  if (isObject(o)) {
    return Object.keys(o).reduce<any>((acc, key: string) => {
      acc[func(key)] = transform(func)((o as any)[key])
      return acc
    }, {})
  } else if (isArray(o)) {
    return o.map(transform(func))
  }

  return o
}

export const keysToCamel = transform(toCamel)
export const keysToSnake = transform(toSnake)
