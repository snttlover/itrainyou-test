import { Hint, getHints, GetHintsParamsTypes } from "@/lib/api/hint"
import { createDomain, forward, split } from "effector-root"
import {
  addSearchPageQuery,
  removeSearchPageQuery,
  resetSearchQuery,
  setSearchPageQuery,
} from "@/pages/search/coaches-search.model"

// coaches
const searchDomain = createDomain()

export const updateSearch = searchDomain.createEvent<string>()
export const $search = searchDomain
  .createStore("")
  .on(updateSearch, (_, search) => search)
  .on(setSearchPageQuery, (_, query) => query.search || "")
  .on(resetSearchQuery, () => "")

export const find = searchDomain.createEvent<string>()

const { remove, add } = split(find, {
  remove: payload => payload.length === 0,
  add: payload => payload.length > 0,
})

forward({
  from: find,
  to: updateSearch,
})

forward({
  from: remove.map<["search"]>(_ => ["search"]),
  to: removeSearchPageQuery,
})

forward({
  from: add.map(search => ({ search })),
  to: addSearchPageQuery,
})

export const fetchHintsList = searchDomain.createEffect<GetHintsParamsTypes, Hint[]>().use(params => getHints(params))

export const loadHints = searchDomain.createEvent<GetHintsParamsTypes>()

export const $hintsList = searchDomain
  .createStore<Hint[]>([])
  .on(fetchHintsList.doneData, (_, list) => list)


forward({
  from: updateSearch.map(search => ({ search })),
  to: loadHints,
})

forward({
  from: loadHints,
  to: fetchHintsList,
})
