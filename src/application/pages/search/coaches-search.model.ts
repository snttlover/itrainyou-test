import { Coach, getCoaches, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { appDomain } from "@/application/store"
import { debounce } from "@app/lib/helpers/debounce"
import { navigate } from "@app/lib/navigation"
import { forward, merge } from "effector"
import { globalHistory } from "@reach/router"
import { serializeQuery } from "@app/lib/formatting/serialize-query"
import { getWindowQuery } from "@app/lib/helpers/getWindowQuery"

// coaches
const searchPageDomain = appDomain.createDomain()

export const setSearchPageQuery = appDomain.createEvent<GetCoachesParamsTypes>()
export const addSearchPageQuery = appDomain.createEvent<GetCoachesParamsTypes>()
export const removeSearchPageQuery = appDomain.createEvent<(keyof GetCoachesParamsTypes)[]>()

export const $searchPageQuery = appDomain
  .createStore<GetCoachesParamsTypes>({})
  .on(setSearchPageQuery, (_, query) => query)
  .on(addSearchPageQuery, (state, query) => {
    return {
      ...state,
      ...query
    }
  })
  .on(removeSearchPageQuery, (state, keys) => {
    keys.forEach(key => {
      delete state[key]
    })
    return { ...state }
  })

globalHistory.listen(() => {
  const query = getWindowQuery() as GetCoachesParamsTypes
  setSearchPageQuery(query)
  fetchCoachesListFx(query)
})

const watchedEvents = merge([addSearchPageQuery, removeSearchPageQuery])

$searchPageQuery.watch(
  watchedEvents,
  debounce((query: GetCoachesParamsTypes) => {
    navigate(`/search?${serializeQuery(query)}`).then(() => fetchCoachesListFx(query))
  }, 300)
)

export const fetchCoachesListFx = searchPageDomain
  .createEffect<GetCoachesParamsTypes, Coach[]>()
  .use(params => getCoaches(params))

export const loadCoaches = searchPageDomain.createEvent<GetCoachesParamsTypes>()

export const $coachesList = searchPageDomain
  .createStore<Coach[]>([])
  .on(fetchCoachesListFx.doneData, (state, payload) => payload)
  .reset(fetchCoachesListFx)

export const $coachesListLoading = searchPageDomain
  .createStore(true)
  .on(fetchCoachesListFx, () => true)
  .on(fetchCoachesListFx.finally, () => false)

forward({
  from: loadCoaches,
  to: fetchCoachesListFx
})
