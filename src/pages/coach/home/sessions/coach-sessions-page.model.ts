import { date } from "@/lib/formatting/date"
import { combine, createEffect, createEvent, createStore, forward, restore } from "effector-root"
import { getDashboardSessions } from "@/lib/api/coach/get-dashboard-sessions"

import {
  DashboardNewestParticipant,
  getDashboardNewestParticipants,
} from "@/lib/api/coach/get-dashboard-newest-participants"
import { createPagination } from "@/feature/pagination"
import { getMyUserFx } from "@/lib/api/users/get-my-user"

const resetCoachSessionList =  createEvent()

export const newestParticipants = createPagination<DashboardNewestParticipant>({
  fetchMethod: getDashboardNewestParticipants,
})

forward({
  from: resetCoachSessionList,
  to: newestParticipants.methods.reset
})

export const loadTodaySessionsFx = createEffect({
  handler: () => getDashboardSessions({ excludePast: true }),
})

export const $coachSessionsPageLoading = loadTodaySessionsFx.pending.map(status => status)

const $coachSessions = restore(loadTodaySessionsFx.doneData, []).reset(resetCoachSessionList)

const changeTickTime = createEvent<Date>()
const $tickTime = createStore(new Date()).on(changeTickTime, (_, newDate) => newDate)

if (process.env.BUILD_TARGET === "client") {
  setInterval(() => changeTickTime(new Date()), 1000)
}

export const $activeCoachSessions = combine($tickTime, $coachSessions, (time, sessions) =>
  sessions.filter(session => date(time).isBetween(date(session.startDatetime), date(session.endDatetime)))
)

export const $todayCoachSessions = combine($tickTime, $coachSessions, (time, sessions) =>
  sessions.filter(session => date(time).isBefore(date(session.startDatetime)))
)

export const mounted = createEvent()

forward({
  from: mounted,
  to: [loadTodaySessionsFx, newestParticipants.methods.loadMore],
})

export const $coachStore = createStore(false).on(getMyUserFx.doneData, (state, {data}: any) => {
  return !!data?.coach?.schedule?.weekday_slots
})
