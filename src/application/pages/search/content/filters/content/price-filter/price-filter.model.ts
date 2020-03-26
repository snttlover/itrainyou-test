import { getMaxPrice, Price } from "@/application/lib/api/coach-max-price"
import { createUniversalStore } from "@/store"
import { createEffect } from "effector"

export const fetchMaxPriceFx = createEffect<void, Price>({
  handler: getMaxPrice
})

export const $maxPrice = createUniversalStore<number>(0)
  .on(fetchMaxPriceFx.doneData, (state, payload: Price) => +payload.maxCost)
  .reset(fetchMaxPriceFx)

