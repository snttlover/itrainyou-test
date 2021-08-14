import { PrimitiveType } from "@/shared/lib/types"

interface URLSearchClass {
  new (init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams
}

const parseQueryStringFactory = (URLSearch: URLSearchClass) => <T = Record<string, string>>(string: string): T => {
  const searchParams = new URLSearch(string)
  const obj: T = {} as T

  searchParams.forEach((value, key) => {
    obj[key] = value
  })

  return obj
}

const createQueryStringFactory = (URLSearch: URLSearchClass) => <T extends Record<string, PrimitiveType | null | undefined>>(obj?: T): string => {
  if (!obj) return ""
  const stringValuesObject: Record<string, string> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (!value) {
      continue
    }

    stringValuesObject[key] = value.toString()
  }

  const searchParams = new URLSearch(stringValuesObject)
  const searchParamsString = searchParams.toString()

  return searchParamsString.length > 0 ? `?${searchParamsString}` : searchParamsString
}

export const parseQueryString =
  process.env.BUILD_TARGET === "client"
    ? parseQueryStringFactory(window.URLSearchParams)
    : parseQueryStringFactory(require("url").URLSearchParams)

export const createQueryString =
  process.env.BUILD_TARGET === "client"
    ? createQueryStringFactory(window.URLSearchParams)
    : createQueryStringFactory(require("url").URLSearchParams)
