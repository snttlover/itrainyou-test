import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-next"
import { DashboardSession, getDashboardSessions } from "@/application/lib/api/coach/get-dashboard-sessions"
import dayjs from "dayjs"

import {
  DashboardNewestParticipant,
  getDashboardNewestParticipants,
} from "@/application/lib/api/coach/get-dashboard-newest-participants"

export const loadParticipantsFx = createEffect({
  handler: ({ page }: { page: number }) => getDashboardNewestParticipants({ page, pageSize: 5 }),
})

export const loadActiveSessionsFx = createEffect({
  handler: () => getDashboardSessions({ active: true }),
})

export const loadTodaySessionsFx = createEffect({
  handler: () => getDashboardSessions({ date: dayjs().format(`YYYY-MM-DD`) }),
})

export const $newestParticipantsCount = createStore<number>(100).on(
  loadParticipantsFx.doneData,
  (state, payload) => payload.count
)

export const $newestParticipants = createStore<DashboardNewestParticipant[]>([]).on(
  loadParticipantsFx.doneData,
  (state, payload) => [...state, ...payload.results]
)

const $newestParticipantsLoadFailed = createStore(false).on(loadParticipantsFx.fail, () => true)

export const $isHasMoreParticipants = combine(
  { count: $newestParticipantsCount, newestParticipants: $newestParticipants, isFailed: $newestParticipantsLoadFailed },
  ({ count, newestParticipants, isFailed }) => {
    return !isFailed && count !== newestParticipants.length
  }
)

export const $coachSessionsPageLoading = combine(
  loadActiveSessionsFx.pending,
  loadTodaySessionsFx.pending,
  (isActiveSessionsLoading, isTodaySessionsLoading) => isActiveSessionsLoading || isTodaySessionsLoading
)

export const $activeCoachSessions = createStore<DashboardSession[]>([]).on(
  loadActiveSessionsFx.doneData,
  (state, payload) => payload
)
export const $todayCoachSessions = createStore<DashboardSession[]>([]).on(
  loadTodaySessionsFx.doneData,
  (state, payload) => payload
)

export const mounted = createEvent()
export const loadMoreParticipants = createEvent()

const guardedParticipantsLoadMore = guard({
  source: loadMoreParticipants,
  filter: loadParticipantsFx.pending.map(pending => !pending),
})

const $participantsCurrentPage = createStore(0).on(loadParticipantsFx.done, (_, payload) => payload.params.page)

sample({
  source: $participantsCurrentPage,
  clock: guardedParticipantsLoadMore,
  fn: source => ({ page: source + 1 }),
  target: loadParticipantsFx,
})

forward({
  from: mounted,
  to: [loadActiveSessionsFx, loadTodaySessionsFx, loadMoreParticipants],
})
