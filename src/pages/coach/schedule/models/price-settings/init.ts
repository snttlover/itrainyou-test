import { toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"
import { forward, merge, sample, split } from "effector-root"
import { debounce } from "patronum"
import {
  $prices,
  changePrice,
  ChangePriceEvent,
  savePricesFx,
  setPrices,
  successMessage
} from "@/pages/coach/schedule/models/price-settings/units"
import { loadScheduleFx } from "@/pages/coach/schedule/models/schedule/units"

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
  d30Changed: ({ name, value}) => name === "d30Price" && !!value,
  d45Changed: ({ name, value}) => name === "d45Price" && !!value,
  d60Changed: ({ name, value}) => name === "d60Price" && !!value,
  d90Changed: ({ name, value}) => name === "d90Price" && !!value,
})

forward({
  from: savePricesFx.doneData.map(_ => successMessage),
  to: [toasts.remove, toasts.add],
})

sample({
  clock: merge([
    debounce({ source: d30Changed, timeout: 500 }),
    debounce({ source: d45Changed, timeout: 500 }),
    debounce({ source: d60Changed, timeout: 500 }),
    debounce({ source: d90Changed, timeout: 500 }),
  ]),
  source: $prices,
  fn: (_, { name, value }: ChangePriceEvent) => ({ [name]: value }),
  target: savePricesFx,
})
