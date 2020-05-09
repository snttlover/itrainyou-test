import { createDomain, createEvent, createStore } from "effector-next"
import {
  $searchPageQuery,
  addSearchPageQuery,
  removeSearchPageQuery
} from "@/application/pages/search/coaches-search.model"
import { DurationType } from "@/application/lib/api/coach-sessions"

const priceFilterDomain = createDomain(`price-filter`)

const minutes: DurationType[] = [`D30`, `D45`, `D60`, `D90`]

type PriceFilter = {
  key: DurationType
  text: string
  selected: boolean
}

const getDefault = (): PriceFilter[] => minutes.map(key => ({
  key: key,
  text: `${+(key.replace(/[A-Z]/gmi, ``))} мин`,
  selected: false
}))

const setPricesFromQueryString = priceFilterDomain.createEvent<string>()
export const toggleFilter = priceFilterDomain.createEvent<DurationType>()

export const $priceFilters = priceFilterDomain.createStore<PriceFilter[]>(getDefault())
  .on(setPricesFromQueryString, (state, payload) => {
    const selected = payload.split(`,`) as DurationType[]

    return state.map(filter => ({
      ...filter,
      selected: selected.includes(filter.key)
    }))
  })
  .on(toggleFilter, (state, payload) => state.map(filter => ({
    ...filter,
    selected: filter.key === payload ? !filter.selected : filter.selected
  })))

toggleFilter.watch(() => {
  const filters = $priceFilters.getState().filter(filter => filter.selected)

  if (filters.length) {
    addSearchPageQuery({
      session_duration_types: filters.map(filter => filter.key).join(`,`)
    })
  } else {
    removeSearchPageQuery([`session_duration_types`])
  }
})

$searchPageQuery.watch((value) => setPricesFromQueryString(value.session_duration_types || ``))

