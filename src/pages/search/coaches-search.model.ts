import { Coach, getCoaches, GetCoachesParamsTypes } from "@/lib/api/coach"
import { ServerParams } from "@/lib/effector"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { fetchMaxPriceFx } from "@/pages/search/content/filters/content/price-filter/price-filter.model"
import { combine, createEffect, createEvent, forward, merge, sample } from "effector-root"
import { createStore } from "effector-root"
import { DurationType } from "@/lib/api/coach-sessions"
import { debounce, throttle } from "patronum"
import { $isLoggedIn } from "@/feature/user/user.model"

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

      if (query.session_duration_types && query.session_duration_types !== "PROMO") {
        // Если идет фильтрация по длительности сессии, то показываем только цены, соответстующие фильтрации
        // Исключение - фильтрация по типу PROMO (бесплатные сессии)
        const durationTypes = decodeURI(query.session_duration_types).split(",") as DurationType[]
        Object.keys(prices).map(key => {
          if (!durationTypes.includes((key as DurationType))) {
            prices[key] = null
          }
        })
      }

      if (query.price__gte) {
        Object.keys(prices).map(key => {
          // @ts-ignore
          if (+prices[key] < +query.price__gte) {
            prices[key] = null
          }
        })
      }

      if (query.price__lte) {
        Object.keys(prices).map(key => {
          // @ts-ignore
          if (+prices[key] > +query.price__lte) {
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
  from: pageLoaded,
  to: fetchMaxPriceFx,
})

sample({
  source: $isLoggedIn,
  clock: pageLoaded,
  fn: (isLoggedIn, { params }): GetCoachesParamsTypes => {
    if (!isLoggedIn) {
      const coachFilterParams = {...params}
      delete coachFilterParams.session_duration_types
      return {...coachFilterParams, promo_and_paid_sessions: true, }
    }
    return params
  },
  target: fetchCoachesListFx,
})
