import { getMaxPrice, Price } from "@/application/lib/api/coach-max-price"
import { serverStarted } from "@/store"
import { createStore, createEffect, forward } from "effector-next"

export const fetchMaxPriceFx = createEffect<void, Price>({
  handler: getMaxPrice
})

export const $maxPrice = createStore<number>(0)
  .on(fetchMaxPriceFx.doneData, (state, payload: Price) => +payload.maxCost)
  .reset(fetchMaxPriceFx)

forward({
  from: serverStarted,
  to: fetchMaxPriceFx
})
