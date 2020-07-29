import { UpdateCoachSchedule } from "@/lib/api/coaching-sessions/types"
import { $feeRatio, loadScheduleFx, updateScheduleFx } from "@/pages/coach/schedule/models/schedule.model"
import { combine, createEvent, createStore, forward, sample, merge, split } from "effector-root"
import { debounce, spread } from "patronum"

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

type ChangePriceEvent = { name: keyof Prices; value: number }

export const changePrice = createEvent<ChangePriceEvent>()
const setPrices = createEvent<Prices>()

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

forward({
  from: loadScheduleFx.doneData.map(data => ({
    d30Price: parseFloat(data.d30Price),
    d45Price: parseFloat(data.d45Price),
    d60Price: parseFloat(data.d60Price),
    d90Price: parseFloat(data.d90Price),
  })),
  to: setPrices,
})

const { d30Changed, d45Changed, d60Changed, d90Changed } = split(changePrice, {
  d30Changed: ({ name }) => name === "d30Price",
  d45Changed: ({ name }) => name === "d45Price",
  d60Changed: ({ name }) => name === "d60Price",
  d90Changed: ({ name }) => name === "d90Price",
})

sample({
  clock: merge([
    debounce(d30Changed, 500),
    debounce(d45Changed, 500),
    debounce(d60Changed, 500),
    debounce(d90Changed, 500),
  ]),
  source: $prices,
  fn: (_, { name, value }: ChangePriceEvent) => ({ [name]: value }),
  target: updateScheduleFx,
})
