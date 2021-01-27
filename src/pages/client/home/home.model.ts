import { getClientSessions } from "@/lib/api/client-session"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { Coach, getRecommendations } from "@/lib/api/coach"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"
import { logout } from "@/lib/network/token"

export const loadRecommendationsFx = createEffect({
  handler: ({ page }: { page: number }) => getRecommendations({ page, page_size: 5 }),
})

export const loadActiveSessionsFx = createEffect({
  handler: () => getClientSessions({ active: true, excludePast: true }),
})

export const loadTodaySessionsFx = createEffect({
  handler: () => getClientSessions({ excludePast: true }),
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

export const $activeSessions = createStore<DashboardSession[]>([]).on(
  loadActiveSessionsFx.doneData,
  (state, payload) => payload.results
)
export const $todaySessions = createStore<DashboardSession[]>([]).on(
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
