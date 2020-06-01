export interface Pagination<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export type Sex = 'M' | 'F'
