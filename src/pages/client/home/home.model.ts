import { getClientSessions } from "@/lib/api/client-session"
import { getTabs, getFreeSessionsList } from "@/lib/api/free-sessions/free-sessions"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { Coach, getRecommendations } from "@/lib/api/coach"
import { attach, combine, createEffect, createEvent, createStore, forward, guard, sample, restore } from "effector-root"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"
import { logout } from "@/lib/network/token"
import { keysToCamel } from "@/lib/network/casing"
import { $monthEndDate, $monthStartDate } from "@/pages/coach/schedule/models/calendar.model"


type DateRange = {
  from: string
  to: string
}

export const loadRecommendationsFx = createEffect({
  handler: ({ page }: { page: number }) => getRecommendations({ page, page_size: 15 }),
})

export const getFreeSessionsFx = createEffect({
  handler: ({ from, to }: DateRange) => getFreeSessionsList({ start_date__gte: from, start_date__lte: to })
})

export const getTabsFX = createEffect({
  handler: getTabs,
})

export const getFreeSessionsWithParamsFx = attach({
  effect: getFreeSessionsFx,
  // @ts-ignore
  source: combine(
    {
      from: $monthStartDate,
      to: $monthEndDate,
    },
    ({ from, to }) => {
      // @ts-ignore
      if( isNaN(from) || isNaN(to) ) {
        return {
          from: true,
          to: true,
        }
      }
      else {
        const weekBefore = from.subtract(1, "week")
        const weekAfter = to.add(1, "week")
        return {
          from: weekBefore.toISOString().substring(0, 10),
          to: weekAfter.toISOString().substring(0, 10),
        }
      }}
  ),
  mapParams: (_, data) => ({ ...data }),
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

export const $tabs = createStore(null)
  .on(getTabsFX.doneData, (state, payload) => {

  })

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
    getTabsFX,
    getFreeSessionsWithParamsFx,
  ],
})
