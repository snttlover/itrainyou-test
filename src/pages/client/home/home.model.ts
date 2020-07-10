import { ClientSession, getClientSessions } from "@/lib/api/client-session"
import { Coach, getRecommendations } from "@/lib/api/coach"
import { date } from "@/lib/formatting/date"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"

export const loadRecommendationsFx = createEffect({
  handler: ({ page }: { page: number }) => getRecommendations({ page, page_size: 5 }),
})

export const loadActiveSessionsFx = createEffect({
  handler: () => getClientSessions({ active: true }),
})

export const loadTodaySessionsFx = createEffect({
  handler: () => getClientSessions({}),
})

export const $recommendationsCount = createStore<number>(100).on(
  loadRecommendationsFx.doneData,
  (state, payload) => payload.count
)

export const $recommendations = createStore<Coach[]>([]).on(loadRecommendationsFx.doneData, (state, payload) => [
  ...state,
  ...payload.results,
])

const $recommendationsLoadFailed = createStore(false).on(loadRecommendationsFx.fail, () => true)

export const $isHasMoreRecommendations = combine(
  { count: $recommendationsCount, recommendations: $recommendations, isFailed: $recommendationsLoadFailed },
  ({ count, recommendations, isFailed }) => {
    return !isFailed && count !== recommendations.length
  }
)

export const $activeSessions = createStore<ClientSession[]>([]).on(
  loadActiveSessionsFx.doneData,
  (state, payload) => payload.results
)
export const $todaySessions = createStore<ClientSession[]>([]).on(
  loadTodaySessionsFx.doneData,
  (state, payload) => payload.results
)

export const mounted = createEvent()
export const loadMore = createEvent()

const guardedLoadMore = guard({
  source: loadMore,
  filter: loadRecommendationsFx.pending.map(pending => !pending),
})

const $currentPage = createStore(0).on(loadRecommendationsFx.done, (_, payload) => payload.params.page)

sample({
  source: $currentPage,
  clock: guardedLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadRecommendationsFx,
})

forward({
  from: mounted,
  to: [loadActiveSessionsFx, loadTodaySessionsFx, loadMore],
})
