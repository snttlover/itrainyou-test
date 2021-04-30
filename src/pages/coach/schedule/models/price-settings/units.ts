import { attach, combine, createEvent, createStore } from "effector-root"
import { UpdateCoachSchedule } from "@/lib/api/coaching-sessions/types"
import { Toast } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { $feeRatio, updateScheduleFx } from "@/pages/coach/schedule/models/schedule/units"

export type Prices = {
  promo?: number
  d30Price?: number
  d45Price?: number
  d60Price?: number
  d90Price?: number
}

type Price = {
  name: keyof Prices
  key: string
  isLoading: boolean
  value: number
}

export type ChangePriceEvent = { name: keyof Prices; value: number }
export const changePrice = createEvent<ChangePriceEvent>()
export const setPrices = createEvent<Prices>()
export const $prices = createStore<Price[]>([
  {
    name: "promo",
    key: "promo",
    isLoading: false,
    value: 0,
  },
  {
    name: "d30Price",
    key: "D30",
    isLoading: false,
    value: 0,
  },
  {
    name: "d45Price",
    key: "D45",
    isLoading: false,
    value: 0,
  },
  {
    name: "d60Price",
    key: "D60",
    isLoading: false,
    value: 0,
  },
  {
    name: "d90Price",
    key: "D90",
    isLoading: false,
    value: 0,
  },
])
  .on(setPrices, (prices, newPrices) => prices.map(price => ({ ...price, value: newPrices[price.name] || 0 })))
  .on(changePrice, (state, { name, value }) =>
    state.map(price => ({ ...price, value: price.name === name ? value : price.value }))
  )
  .on(updateScheduleFx, (state, params) => {
    const keys = Object.keys(params)
    return state.map(price => ({
      ...price,
      isLoading: keys.includes(price.name) ? true : price.isLoading,
    }))
  })
  .on(updateScheduleFx.finally, (state, { params }) => {
    const keys = Object.keys(params)
    return state.map(price => ({
      ...price,
      isLoading: keys.includes(price.name) ? false : price.isLoading,
    }))
  })
export const $pricesWithFee = combine($prices, $feeRatio, (prices, feeRatio) =>
  prices.map(price => ({ ...price, valueWithFee: price ? price.value + price.value * feeRatio : 0 }))
)
export const savePricesFx = attach({
  effect: updateScheduleFx,
  mapParams: (params: UpdateCoachSchedule) => params,
})
export const successMessage: Toast = {
  type: "info",
  text: "Цены сохранены",
}