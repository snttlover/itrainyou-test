export interface Pagination<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export type Sex = 'M' | 'F'

export type ISODate = string

export type Day = string // YYYY-MM-DD string
