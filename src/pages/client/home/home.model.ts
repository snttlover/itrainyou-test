import { getClientSessions } from "@/lib/api/client-session"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { Coach, getRecommendations } from "@/lib/api/coach"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"
import { logout } from "@/lib/network/token"
import { keysToCamel } from "@/lib/network/casing"

export const loadRecommendationsFx = createEffect({
  handler: ({ page }: { page: number }) => getRecommendations({ page, page_size: 15 }),
})

export const loadActiveSessionsFx = createEffect({
  handler: () => getClientSessions({ active: true, excludePast: true }),
})

export const loadUpcomingSessionsFx = createEffect({
  handler: () => getClientSessions({ excludePast: true }),
})

export const $recommendationsCount = createStore<number>(100).on(
  loadRecommendationsFx.doneData,
  (state, payload) => payload.count
)

export const mounted = createEvent()
export const loadMore = createEvent()

const userDoneData = getMyUserFx.doneData.map<GetMyUserResponse>(data => keysToCamel(data.data))
export const $hasFreeSessions = createStore(false).on(userDoneData, (_,payload) => payload.client.hasFreeSessions)

export const $recommendations = createStore<Coach[]>([]).on(loadRecommendationsFx.doneData, (state, payload) => [
  ...state,
  ...payload.results,
]).reset(mounted)


const $recommendationsLoadFailed = createStore(false).on(loadRecommendationsFx.fail, () => true)
  .reset(mounted)

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
  .reset(mounted)

export const $upcomingSessions = createStore<DashboardSession[]>([]).on(
  loadUpcomingSessionsFx.doneData,
  (state, payload) => payload.results
).reset(mounted)

const guardedLoadMore = guard({
  source: loadMore,
  filter: loadRecommendationsFx.pending.map(pending => !pending),
})

const $currentPage = createStore(0)
  .on(loadRecommendationsFx.done, (_, payload) => payload.params.page)
  .reset(mounted)

sample({
  source: $currentPage,
  clock: guardedLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadRecommendationsFx,
})

forward({
  from: mounted,
  to: [loadActiveSessionsFx, loadUpcomingSessionsFx, loadMore],
})
