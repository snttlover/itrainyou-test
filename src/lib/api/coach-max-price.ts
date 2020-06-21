import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface Price {
  maxCost: number
}

export const getMaxPrice = () =>
  get<Price, {}>(`${config.BACKEND_URL}/api/v1/web/coaches/max-cost/`, {})
    .then(response => response.data)
    .then(keysToCamel)
