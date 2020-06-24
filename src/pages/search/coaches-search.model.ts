import { Coach, getCoaches, GetCoachesParamsTypes } from "@/lib/api/coach"
import { ServerParams } from "@/lib/effector"
import { debounce } from "@/lib/helpers/debounce"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/routes"
import { createEffect, createEvent, forward, merge } from "effector-root"
import { createStore } from "effector-root"
import { DurationType } from "@/lib/api/coach-sessions"

export const setSearchPageQuery = createEvent<GetCoachesParamsTypes>()
export const addSearchPageQuery = createEvent<GetCoachesParamsTypes>()
export const removeSearchPageQuery = createEvent<(keyof GetCoachesParamsTypes)[]>()
export const resetSearchQuery = createEvent()

export const $searchPageQuery = createStore<GetCoachesParamsTypes>({})
  .on(setSearchPageQuery, (_, query) => ({ ...query }))
  .on(addSearchPageQuery, (state, query) => {
    return {
      ...state,
      ...query,
    }
  })
  .on(removeSearchPageQuery, (state, keys) => {
    keys.forEach(key => {
      delete state[key]
    })
    return { ...state }
  })
  .reset(resetSearchQuery)

if (typeof window !== "undefined") {
  const updateEvents = merge([addSearchPageQuery, removeSearchPageQuery])
  $searchPageQuery.watch(
    updateEvents,
    debounce((query: GetCoachesParamsTypes) => {
      navigatePush({ url: routeNames.search(), query })
    }, 300)
  )
}

export const fetchCoachesListFx = createEffect<GetCoachesParamsTypes, Coach[]>({
  handler: getCoaches,
})

export const $coachesList = createStore<Coach[]>([])
  .on(fetchCoachesListFx.doneData, (state, payload) => {
    const query = $searchPageQuery.getState()
    return payload.map(coach => {
      const prices = coach.prices

      if (query.session_duration_types) {
        const durationTypes = decodeURI(query.session_duration_types).split(`,`) as DurationType[]
        Object.keys(prices).map(key => {
          // @ts-ignore
          if (!durationTypes.includes(key)) {
            // @ts-ignore
            prices[key] = null
          }
        })
      }

      if (query.price__gte) {
        Object.keys(prices).map(key => {
          // @ts-ignore
          if (+prices[key] < +query.price__gte) {
            // @ts-ignore
            prices[key] = null
          }
        })
      }

      if (query.price__lte) {
        Object.keys(prices).map(key => {
          // @ts-ignore
          if (+prices[key] > +query.price__lte) {
            // @ts-ignore
            prices[key] = null
          }
        })
      }

      return {
        ...coach,
        prices,
      }
    })
  })
  .reset(fetchCoachesListFx)

export const serverStartedQueryParams = createEvent<ServerParams>()

forward({
  from: serverStartedQueryParams.map(params => params.query),
  to: [fetchCoachesListFx, setSearchPageQuery],
})
