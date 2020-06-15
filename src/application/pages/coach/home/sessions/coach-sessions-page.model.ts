import { date } from "@/application/lib/formatting/date"
import { combine, createEffect, createEvent, createStore, forward, guard, sample } from "effector-next"
import { DashboardSession, getDashboardSessions } from "@/application/lib/api/coach/get-dashboard-sessions"

import {
  DashboardNewestParticipant,
  getDashboardNewestParticipants,
} from "@/application/lib/api/coach/get-dashboard-newest-participants"

export const loadParticipantsFx = createEffect({
  handler: ({ page }: { page: number }) => getDashboardNewestParticipants({ page, pageSize: 5 }),
})

export const loadTodaySessionsFx = createEffect({
  handler: () => getDashboardSessions({ date: date().format(`YYYY-MM-DD`) }),
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

export const $coachSessionsPageLoading = loadTodaySessionsFx.pending.map(status => status)

const $coachSessions = createStore<DashboardSession[]>([]).on(loadTodaySessionsFx.doneData, (state, payload) => payload)

const changeTickTime = createEvent<Date>()
const $tickTime = createStore(new Date()).on(changeTickTime, (_, newDate) => newDate)

if (process.browser) {
  setInterval(() => changeTickTime(new Date()), 1000)
}

export const $activeCoachSessions = combine($tickTime, $coachSessions, (time, sessions) =>
  sessions.filter(session => date(time).isAfter(date(session.startDatetime)))
)

export const $todayCoachSessions = combine($tickTime, $coachSessions, (time, sessions) =>
  sessions.filter(session => date(time).isBefore(date(session.startDatetime)))
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
  to: [loadTodaySessionsFx, loadMoreParticipants],
})
