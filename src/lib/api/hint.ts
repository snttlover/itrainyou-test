import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface Hint {
  id: number
  value: string
}

interface Pagination<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export interface GetHintsParamsTypes {
  search?: string
}

export const getHints = (params: GetHintsParamsTypes) =>
  get<Pagination<Hint>, GetHintsParamsTypes>(`${config.BACKEND_URL}/api/v1/web/search-hints/`, params)
    .then(response => response.data)
    .then(data => data.results)
    .then(keysToCamel)
