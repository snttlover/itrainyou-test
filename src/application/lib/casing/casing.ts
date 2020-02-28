const isArray = <T>(a: any | T[]): a is T[] => {
  return Array.isArray(a)
}

const isObject = function(o: any): o is object {
  return o === Object(o) && !isArray(o) && typeof o !== "function"
}

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("_", "")
  })
}

export function keysToCamel(o: any): any {
  if (isObject(o)) {
    return Object.keys(o).reduce<any>((acc, key: string) => {
      acc[toCamel(key)] = keysToCamel((o as any)[key])
      return acc
    }, {})
  } else if (isArray(o)) {
    return o.map(keysToCamel)
  }

  return o
}
