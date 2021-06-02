import { getClientSessions } from "@/lib/api/client-session"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { Coach, getRecommendations } from "@/lib/api/coach"
import { combine, createEffect, createEvent, createStore, forward, guard, sample, restore } from "effector-root"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"
import { keysToCamel } from "@/lib/network/casing"
import { loginFx } from "@/pages/auth/pages/login/login.model"


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

export const homePageMounted = createEvent()
export const freeSessionsPageMounted = createEvent()

export const loadMore = createEvent()

const userDoneData = getMyUserFx.doneData.map<GetMyUserResponse>(data => keysToCamel(data.data))
export const $hasFreeSessions = createStore(false).on(userDoneData, (_,payload) => payload.client.hasFreeSessions)

export const $recommendations = createStore<Coach[]>([]).on(loadRecommendationsFx.doneData, (state, payload) => [
  ...state,
  ...payload.results,
]).reset(homePageMounted)


const $recommendationsLoadFailed = createStore(false).on(loadRecommendationsFx.fail, () => true)
  .reset(homePageMounted)

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
  .reset(homePageMounted)

export const $upcomingSessions = createStore<DashboardSession[]>([]).on(
  loadUpcomingSessionsFx.doneData,
  (state, payload) => payload.results
).reset(homePageMounted)

const guardedLoadMore = guard({
  source: loadMore,
  filter: loadRecommendationsFx.pending.map(pending => !pending),
})

const $currentPage = createStore(0)
  .on(loadRecommendationsFx.done, (_, payload) => payload.params.page)
  .reset(homePageMounted)

sample({
  source: $currentPage,
  clock: guardedLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadRecommendationsFx,
})

forward({
  from: homePageMounted,
  to: [loadActiveSessionsFx, loadUpcomingSessionsFx, loadMore],
})


forward({
  from: freeSessionsPageMounted,
  to: [
    loadActiveSessionsFx,
    loadUpcomingSessionsFx,
    loadMore,
  ],
})

forward({
  from: loginFx.done,
  to: getMyUserFx,
})
