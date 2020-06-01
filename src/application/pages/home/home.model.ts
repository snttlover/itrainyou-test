import { Coach, getRecommendations, RecommendationsParamsTypes } from "@/application/lib/api/coach"
import { Pagination } from "@/application/lib/api/interfaces/utils.interface"
import { createEffect, createEvent, createStore, forward } from "effector-next"

const loadRecommendationsFx = createEffect<RecommendationsParamsTypes, Pagination<Coach>>({
  handler: (params: RecommendationsParamsTypes) => getRecommendations(params),
})

const loadRecommendationsFx = createEffect<RecommendationsParamsTypes, Pagination<Coach>>({
  handler: (params: RecommendationsParamsTypes) => getRecommendations(params),
})

export const $recommendations = createStore<Coach[]>([]).on(
  loadRecommendationsFx.doneData,
  (state, payload) => payload.results
)

export const mounted = createEvent()

forward({
  from: mounted.map(() => ({ page: 1, page_size: 3 })),
  to: loadRecommendationsFx,
})

forward()
