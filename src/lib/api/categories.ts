import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface SessionCategory {
  id: number
  name: string
  icon: string
  description: string
}

export const getCategories = () =>
  get<SessionCategory[]>(`${config.BACKEND_URL}/api/v1/web/categories/`)
    .then(response => response.data)
    .then(keysToCamel)
