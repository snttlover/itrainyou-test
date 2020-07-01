import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { InferStoreType } from "@/lib/types/effector"
import { combine, createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { debounce, spread } from "patronum"

export const changePrice = createEvent<{
  promo?: number[]
  price30?: number[]
  price45?: number[]
  price60?: number[]
  price90?: number[]
}>()

const $promoPrice = createStore<number[]>([])
const $30Price = createStore<number[]>([])
const $45Price = createStore<number[]>([])
const $60Price = createStore<number[]>([])
const $90Price = createStore<number[]>([])

export const $priceForm = combine({
  promo: $promoPrice,
  price30: $30Price,
  price45: $45Price,
  price60: $60Price,
  price90: $90Price,
})

spread(changePrice, {
  promo: $promoPrice,
  price30: $30Price,
  price45: $45Price,
  price60: $60Price,
  price90: $90Price,
})

export const updatePriceFx = createEffect({
  handler: (data: InferStoreType<typeof $priceForm>) => {
    console.log(data)
  },
})

const successMessage: Toast = {
  type: "info",
  text: "Цены сохранены",
}

forward({
  from: updatePriceFx.doneData.map(_ => successMessage),
  to: [toasts.remove, toasts.add],
})

sample({
  clock: debounce(changePrice, 500),
  source: $priceForm,
  target: updatePriceFx,
})
