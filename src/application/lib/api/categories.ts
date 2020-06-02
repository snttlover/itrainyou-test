import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface Category {
  id: number
  name: string
  icon: string
  description: string
}

export const getCategories = () =>
  get<Category[]>(`${process.env.BACKEND_URL}/api/v1/web/categories/`)
    .then(response => response.data)
    .then(keysToCamel)
