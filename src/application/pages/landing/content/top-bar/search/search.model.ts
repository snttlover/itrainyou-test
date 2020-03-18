import { Hint, getHints, GetHintsParamsTypes } from "@/application/lib/api/hint"
import { appDomain } from "@/application/store"
import { forward } from "effector"
import { addSearchPageQuery, removeSearchPageQuery } from "@app/pages/search/coaches-search.model"

// coaches
const searchDomain = appDomain.createDomain()

export const updateSearch = appDomain.createEvent<string>()
export const $search = searchDomain.createStore(``).on(updateSearch, (_, search) => search)

updateSearch.watch((search: string) => loadHints({ search }))

export const find = appDomain.createEvent<string>()

find.watch((search: string) => {
  updateSearch(search)
  if (search) {
    addSearchPageQuery({ search })
  } else {
    removeSearchPageQuery([`search`])
  }
})

export const fetchHintsList = searchDomain.createEffect<GetHintsParamsTypes, Hint[]>().use(params => getHints(params))

export const loadHints = searchDomain.createEvent<GetHintsParamsTypes>()

export const $hintsList = searchDomain
  .createStore<Hint[]>([])
  .on(fetchHintsList.doneData, (_, list) => list)
  .reset(fetchHintsList)

export const $searchLoading = searchDomain
  .createStore(false)
  .on(fetchHintsList.finally, () => false)
  .on(fetchHintsList, () => true)

forward({
  from: loadHints,
  to: fetchHintsList
})
