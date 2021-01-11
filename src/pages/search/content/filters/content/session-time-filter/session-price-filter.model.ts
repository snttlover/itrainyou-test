import { createDomain, forward, sample, split } from "effector-root"
import { $searchPageQuery, addSearchPageQuery, removeSearchPageQuery } from "@/pages/search/coaches-search.model"
import { DurationType } from "@/lib/api/coach-sessions"

const priceFilterDomain = createDomain("price-filter")

const minutes: DurationType[] = ["D30", "D45", "D60", "D90"]

type PriceFilter = {
  key: DurationType
  text: string
  selected: boolean
}

const getDefault = (): PriceFilter[] =>
  minutes.map(key => ({
    key: key,
    text: `${+key.replace(/[A-Z]/gim, "")} мин`,
    selected: false,
  }))

const setPricesFromQueryString = priceFilterDomain.createEvent<string>()
export const toggleFilter = priceFilterDomain.createEvent<DurationType>()

export const $priceFilters = priceFilterDomain
  .createStore<PriceFilter[]>(getDefault())
  .on(setPricesFromQueryString, (state, payload) => {
    const selected = payload.split(",") as DurationType[]

    return state.map(filter => ({
      ...filter,
      selected: selected.includes(filter.key),
    }))
  })
  .on(toggleFilter, (state, payload) =>
    state.map(filter => ({
      ...filter,
      selected: filter.key === payload ? !filter.selected : filter.selected,
    }))
  )

const filterChanged = sample({
  clock: toggleFilter,
  source: $priceFilters,
  fn: source => source.filter(filter => filter.selected),
})

const { add, remove } = split(filterChanged, {
  add: filters => filters.length > 0,
  remove: filters => filters.length === 0,
})

forward({
  from: add.map(filters => ({ session_duration_types: filters.map(filter => filter.key).join(",") })),
  to: addSearchPageQuery,
})

forward({
  from: remove.map<["session_duration_types"]>(_ => ["session_duration_types"]),
  to: removeSearchPageQuery,
})

forward({
  from: $searchPageQuery.map(value => value.session_duration_types || ""),
  to: setPricesFromQueryString,
})
