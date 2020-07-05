export type CursorPaginationRequest = {
  cursor?: string | null
  pageSize: number
}

export interface CursorPagination<T> {
  next: string | null
  previous: string | null
  results: T[]
}

export interface Pagination<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export type Sex = 'M' | 'F'

export type ISODate = string

export type Day = string // YYYY-MM-DD string
