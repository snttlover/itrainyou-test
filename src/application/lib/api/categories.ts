import { keysToCamel } from "@app/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface Category {
  id: number
  name: string
  icon: string
  description: string
}

export const getCategories = () =>
  get<Category[]>("http://142.93.228.206:8006/api/v1/web/categories/")
    .then(response => response.data)
    .then(keysToCamel)
