import { Coach, getCoaches, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { appDomain } from "@/application/store"
import { debounce } from "@app/lib/helpers/debounce"
import { navigate } from "@app/lib/navigation"
import { forward, merge } from "effector"
import { globalHistory } from "@reach/router"
import { serializeQuery } from "@app/lib/formatting/serialize-query"
import { getWindowQuery } from "@app/lib/helpers/getWindowQuery"
import { scopeBind } from "effector/fork"

// coaches
const searchPageDomain = appDomain.createDomain()

export const setSearchPageQuery = searchPageDomain.createEvent<GetCoachesParamsTypes>()
export const addSearchPageQuery = searchPageDomain.createEvent<GetCoachesParamsTypes>()
export const removeSearchPageQuery = searchPageDomain.createEvent<(keyof GetCoachesParamsTypes)[]>()

export const $searchPageQuery = searchPageDomain
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

if (!process.isServer) {
  $searchPageQuery.watch(
    debounce((query: GetCoachesParamsTypes) => {
      navigate(`/search?${serializeQuery(query)}`).then(() => fetchCoachesListFx(query))
    }, 300)
  )
}

export const fetchCoachesListFx = searchPageDomain
  .createEffect<GetCoachesParamsTypes, Coach[]>({
    handler: getCoaches
  })

export const loadCoaches = searchPageDomain.createEvent<GetCoachesParamsTypes>()

export const $coachesList = searchPageDomain
  .createStore<Coach[]>([])
  .on(fetchCoachesListFx.doneData, (state, payload) => payload)
  .reset(fetchCoachesListFx)

forward({
  from: loadCoaches,
  to: fetchCoachesListFx
})
