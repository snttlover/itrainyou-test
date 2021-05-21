import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export type PriceRangesType = {
      id: number
      rangeFrom: number
      rangeTo: number
      selected: boolean
}

export const getPriceRanges = () =>
  get<PriceRangesType[], void>(`${config.BACKEND_URL}/api/v1/web/price-ranges/`)
    .then(response => response.data)
    .then(keysToCamel)