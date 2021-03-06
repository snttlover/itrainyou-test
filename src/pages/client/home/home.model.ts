import { getClientSessions } from "@/lib/api/client-session"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { Coach, getRecommendations } from "@/lib/api/coach"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-root"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"

export const STORAGE_KEY = "show_informer"

const checkUserFx = createEffect({
  handler: () => {
    const stringData = localStorage.getItem(STORAGE_KEY)
    return stringData
  }
})

export const $informerShowed = createStore(true)
  .on(checkUserFx.doneData, (state,payload) => !payload)

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

export const $hasFreeSessions = createStore(false)
  .on(getMyUserApiFx.fx.doneBody, (_, payload) => payload.client ? payload.client.hasFreeSessions : false)

export const $freeSessionsStatus = createStore("")
  .on(getMyUserApiFx.fx.doneBody, (_, payload) => payload.client ? payload.client.freeSessionUnavailableReason : "")

export const $recommendations = createStore<Coach[]>([]).on(loadRecommendationsFx.doneData, (state, payload) => [
  ...state,
  ...payload.results,
]).reset([homePageMounted,freeSessionsPageMounted])


const $recommendationsLoadFailed = createStore(false).on(loadRecommendationsFx.fail, () => true)
  .reset([homePageMounted,freeSessionsPageMounted])

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
  .reset([homePageMounted,freeSessionsPageMounted])

export const $upcomingSessions = createStore<DashboardSession[]>([]).on(
  loadUpcomingSessionsFx.doneData,
  (state, payload) => payload.results
).reset([homePageMounted,freeSessionsPageMounted])

const guardedLoadMore = guard({
  source: loadMore,
  filter: loadRecommendationsFx.pending.map(pending => !pending),
})

const $currentPage = createStore(0)
  .on(loadRecommendationsFx.done, (_, payload) => payload.params.page)
  .reset([homePageMounted,freeSessionsPageMounted])

sample({
  source: $currentPage,
  clock: guardedLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadRecommendationsFx,
})

forward({
  from: [homePageMounted, freeSessionsPageMounted],
  to: [loadActiveSessionsFx, loadUpcomingSessionsFx, loadMore, getMyUserApiFx.fx],
})

forward({
  from: homePageMounted,
  to: checkUserFx,
})
