import { Coach, getCoaches, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { appDomain } from "@/application/store"
import { forward, merge } from "effector"
import { $isServer } from "@/application/store"
import { serializeQuery } from "@app/lib/formatting/serialize-query"

// coaches
const searchPageDomain = appDomain.createDomain()

export const setSearchPageQuery = appDomain.createEvent<GetCoachesParamsTypes>()
export const addSearchPageQuery = appDomain.createEvent<GetCoachesParamsTypes>()
export const removeSearchPageQuery = appDomain.createEvent<(keyof GetCoachesParamsTypes)[]>()

export const $searchPageQuery = appDomain
  .createStore<GetCoachesParamsTypes>({})
  .on(setSearchPageQuery, (_, query) => query)
  .on(addSearchPageQuery, (state, query: GetCoachesParamsTypes) => {
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

const watchedEvents = merge([addSearchPageQuery, removeSearchPageQuery])

$searchPageQuery.watch(watchedEvents, query => {
  if ($isServer.getState()) {
    const history = require(`@/client`).history
    history.navigate(`/search?${serializeQuery(query)}`, { replace: true }).then(() => fetchCoachesListFx(query))
  }
})

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

export class DelayedNavigation {
  private interval: any
  navigate(params: GetCoachesParamsTypes, interval: number) {
    clearInterval(this.interval)
    this.interval = setTimeout(() => addSearchPageQuery(params), interval)
  }
}
