import { $feeRatio, loadScheduleFx, updateScheduleFx } from "@/pages/coach/schedule/schedule.model"
import { combine, createEvent, createStore, forward, sample, merge } from "effector-root"
import { debounce, spread } from "patronum"

type Prices = {
  promo?: number
  price30?: number
  price45?: number
  price60?: number
  price90?: number
}

export const changePrices = createEvent<Prices>()
const setPrices = createEvent<Prices>()

const $promoPrice = createStore<number>(0)
const $30Price = createStore<number>(0)
const $45Price = createStore<number>(0)
const $60Price = createStore<number>(0)
const $90Price = createStore<number>(0)

const calculatePriceWithRatio = (price: number | null, ratio: number) => (price ? price + price * ratio : 0)

export const $prices = combine({
  promo: $promoPrice,
  D30: $30Price,
  D45: $45Price,
  D60: $60Price,
  D90: $90Price,
})

export const $pricesWithFeeForm = combine(
  {
    form: $prices,
    ratio: $feeRatio,
  },
  ({ form, ratio }) => ({
    promo: [form.promo, calculatePriceWithRatio(form.promo, ratio)],
    price30: [form.D30, calculatePriceWithRatio(form.D30, ratio)],
    price45: [form.D45, calculatePriceWithRatio(form.D45, ratio)],
    price60: [form.D60, calculatePriceWithRatio(form.D60, ratio)],
    price90: [form.D90, calculatePriceWithRatio(form.D90, ratio)],
  })
)

spread(merge([changePrices, setPrices]), {
  promo: $promoPrice,
  price30: $30Price,
  price45: $45Price,
  price60: $60Price,
  price90: $90Price,
})

forward({
  from: loadScheduleFx.doneData.map(data => ({
    price30: parseFloat(data.d30Price),
    price45: parseFloat(data.d45Price),
    price60: parseFloat(data.d60Price),
    price90: parseFloat(data.d90Price),
  })),
  to: setPrices,
})

sample({
  clock: debounce(changePrices, 500),
  source: $prices.map(form => ({
    d30Price: form.D30,
    d45Price: form.D45,
    d60Price: form.D60,
    d90Price: form.D90,
  })),
  target: updateScheduleFx,
})
