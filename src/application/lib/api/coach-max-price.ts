import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface Price {
  maxCost: number
}

export const getMaxPrice = () =>
  get<Price, {}>("https://dev.itrainyou.heksray.com/api/v1/web/coaches/max-cost/", {})
    .then(response => response.data)
    .then(keysToCamel)
