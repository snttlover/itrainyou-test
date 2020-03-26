import { Coach, getCoaches, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { debounce } from "@/application/lib/helpers/debounce"
import { serverStarted } from "@/store"
import { createEffect, createEvent, forward } from "effector-next"
import { createStore } from "effector-next"
import Router from "next/router"

export const setSearchPageQuery = createEvent<GetCoachesParamsTypes>()
export const addSearchPageQuery = createEvent<GetCoachesParamsTypes>()
export const removeSearchPageQuery = createEvent<(keyof GetCoachesParamsTypes)[]>()

export const $searchPageQuery = createStore<GetCoachesParamsTypes>({})
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

// @ts-ignore
if (process.browser) {
  $searchPageQuery.updates.watch(
    debounce((query: GetCoachesParamsTypes) => {
      Router.push({ pathname: `/search`, query: { ...query } }, undefined, { shallow: true }).then(() => fetchCoachesListFx(query))
    }, 300)
  )
}

export const fetchCoachesListFx = createEffect<GetCoachesParamsTypes, Coach[]>({
  handler: getCoaches
})

export const $coachesList = createStore<Coach[]>([])
  .on(fetchCoachesListFx.doneData, (state, payload) => payload)
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
