import { appDomain } from "@/application/store"

export const createQueryParamsStore = <T>({}) => {
  const addQueryParams = appDomain.createEvent<Partial<T>>()
  const setQueryParams = appDomain.createEvent<Partial<T>>()
  const removeQueryParams = appDomain.createEvent<keyof T | (keyof T)[]>()
  const resetQueryParams = appDomain.createEvent()

  const $queryParams = appDomain
    .createStore({})
    .on(setQueryParams, (state, payload) => payload)
    .on(addQueryParams, (state, payload) => ({
      ...state,
      ...payload
    }))
    .on(removeQueryParams, (state, payload) => {})
    .reset(resetQueryParams)

  return {
    $queryParams,
    addQueryParams,
    removeQueryParams,
    resetQueryParams
  }
}
