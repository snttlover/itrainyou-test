import { Coach, getCoaches, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { debounce } from "@/application/lib/helpers/debounce"
import { serverStarted } from "@/store"
import { createEffect, createEvent, forward, merge } from "effector-next"
import { createStore } from "effector-next"
import Router from "next/router"
import { DurationType } from "@/application/lib/api/coach-sessions"

export const setSearchPageQuery = createEvent<GetCoachesParamsTypes>()
export const addSearchPageQuery = createEvent<GetCoachesParamsTypes>()
export const removeSearchPageQuery = createEvent<(keyof GetCoachesParamsTypes)[]>()
export const resetSearchQuery = createEvent()

export const $searchPageQuery = createStore<GetCoachesParamsTypes>({})
  .on(setSearchPageQuery, (_, query) => ({ ...query }))
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
  .reset(resetSearchQuery)

if (process.browser) {
  const updateEvents = merge([addSearchPageQuery, removeSearchPageQuery])
  $searchPageQuery.watch(
    updateEvents,
    debounce((query: GetCoachesParamsTypes) => {
      Router.push(
        { pathname: `/search`, query: { ...query } },
        { pathname: "/search", query: { ...query } }
      )
    }, 300)
  )
}

export const fetchCoachesListFx = createEffect<GetCoachesParamsTypes, Coach[]>({
  handler: getCoaches
})

export const $coachesList = createStore<Coach[]>([])
  .on(fetchCoachesListFx.doneData, (state, payload) => {
    const query = $searchPageQuery.getState()
    return payload.map(coach => {
      const prices = coach.prices

      if (query.session_duration_types) {
        const durationTypes = decodeURI(query.session_duration_types).split(`,`) as DurationType[]
        Object.keys(prices).map((key) => {
          // @ts-ignore
          if (!durationTypes.includes(key)) {
            // @ts-ignore
            prices[key] = null
          }
        })
      }

      if (query.nearest_session_date__gte) {
        Object.keys(prices).map((key) => {
          // @ts-ignore
          if (prices[key] < +query.nearest_session_date__gte) {
            // @ts-ignore
            prices[key] = null
          }
        })
      }

      if (query.nearest_session_date__lte) {
        Object.keys(prices).map((key) => {
          // @ts-ignore
          if (prices[key] > +query.nearest_session_date__lte) {
            // @ts-ignore
            prices[key] = null
          }
        })
      }

      return {
        ...coach,
        prices
      }
    })
  })
  .reset(fetchCoachesListFx)

const serverStartedQueryParams = serverStarted.map(({ query }) => query)

forward({
  from: serverStartedQueryParams,
  to: fetchCoachesListFx
})

forward({
  from: serverStartedQueryParams,
  to: setSearchPageQuery
})
