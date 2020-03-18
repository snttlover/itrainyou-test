import { keysToCamel } from "@/application/lib/casing/casing"
import { get } from "@/application/lib/network/network"

export interface Category {
  id: number
  name: string
  icon: string
  description: string
}

interface Pagination<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export const getCategories = () =>
  get<Pagination<Category>, {}>("http://142.93.228.206:8006/api/v1/web/categories/", {})
    .then(response => response.data)
    .then(keysToCamel)
