import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface CategoryResponse {
  id: number
  name: string
  icon: string
  description: string
}

export const getCategories = () =>
  get<CategoryResponse[]>("https://dev.itrainyou.heksray.com/api/v1/web/categories/")
    .then(response => response.data)
    .then(keysToCamel)
