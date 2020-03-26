import { getMaxPrice, Price } from "@/application/lib/api/coach-max-price"
import { appDomain } from "@/application/store"
import { forward } from "effector"

// coaches
const priceFilterDomain = appDomain.createDomain()

export const fetchMaxPriceFx = priceFilterDomain.createEffect<void, Price>({
  handler: getMaxPrice
})

export const loadMaxPrice = priceFilterDomain.createEvent()

export const $maxPrice = priceFilterDomain
  .createStore<number>(0)
  .on(fetchMaxPriceFx.doneData, (state, payload: Price) => +payload.maxCost)
  .reset(fetchMaxPriceFx)

$maxPrice.watch(console.log)

forward({
  from: loadMaxPrice,
  to: fetchMaxPriceFx
})
