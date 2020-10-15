import { Coach, getCoaches, GetCoachesParamsTypes } from "@/lib/api/coach"
import { ServerParams } from "@/lib/effector"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { fetchMaxPriceFx } from "@/pages/search/content/filters/content/price-filter/price-filter.model"
import { createEffect, createEvent, forward, merge, sample } from "effector-root"
import { createStore } from "effector-root"
import { DurationType } from "@/lib/api/coach-sessions"
import { debounce, throttle } from "patronum"

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

const updateEvents = merge([addSearchPageQuery, removeSearchPageQuery])

sample({
  clock: updateEvents,
  source: $searchPageQuery,
  fn: query => ({ url: routeNames.search(), query }),
  target: navigatePush,
})

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

export const loadCoaches = createEvent()

sample({
  source: $searchPageQuery,
  clock: throttle({ source: loadCoaches, timeout: 100 }),
  target: fetchCoachesListFx,
})

export const pageLoaded = createEvent<ServerParams>()

forward({
  from: pageLoaded.map(params => params.query),
  to: [fetchCoachesListFx, setSearchPageQuery],
})

forward({
  from: pageLoaded,
  to: fetchMaxPriceFx,
})
