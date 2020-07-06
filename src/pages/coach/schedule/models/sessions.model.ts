import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CoachSession, getCoachSessions } from "@/lib/api/coach-sessions"
import { removeCoachSession } from "@/lib/api/coaching-sessions/remove-coach-session"
import { date } from "@/lib/formatting/date"
import { $monthEndDate, $monthStartDate } from "@/pages/coach/schedule/models/calendar.model"
import { loadScheduleFx } from "@/pages/coach/schedule/models/schedule.model"
import { createGate } from "@/scope"
import { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, forward, restore, sample } from "effector-root"

type LoadSessionsParams = {
  from: string
  to: string
}

export const loadSessionsFx = createEffect({
  handler: ({ from, to }: LoadSessionsParams) => getCoachSessions("me", { start_date__gte: from, start_date__lte: to }),
})

const CANCEL = -1
export const removeSession = createEvent<number>()
export const removeSessionFx = createEffect({
  handler: (id: number) => {
    const answer = confirm("Вы точно хотите удалить сессию?")
    if (answer) return removeCoachSession(id)
    else return CANCEL
  },
})

const sessionRemoved = removeSessionFx.done.filter({ fn: data => data.result !== CANCEL })

forward({
  from: removeSession,
  to: removeSessionFx,
})

const removeSuccessMessage: Toast = { type: "info", text: "Сессия удалена" }
forward({
  from: sessionRemoved.map(_ => removeSuccessMessage),
  to: [toasts.remove, toasts.add],
})

const removeFailedMessage: Toast = { type: "error", text: "Вы не можете удалить сессию" }
forward({
  from: removeSessionFx.failData.map(_ => removeFailedMessage),
  to: [toasts.remove, toasts.add],
})

const $repeatedSessions = restore(
  loadScheduleFx.doneData.map(data => data.weekdaySlots),
  []
)
export const sessionAdded = createEvent<CoachSession>()
const $sessions = restore(loadSessionsFx.doneData, [])
  .on(sessionAdded, (sessions, session) => [...sessions, session])
  .on(sessionRemoved, (state, payload) => state.filter(session => session.id !== payload.params))

export const $allSessions = combine(
  { repeatedSessions: $repeatedSessions, sessions: $sessions },
  ({ repeatedSessions, sessions }) => ({
    repeatedSessions,
    sessions: sessions.map(session => ({
      id: session.id,
      sessionDurationType: session.durationType,
      startTime: date(session.startDatetime),
      endTime: date(session.startDatetime).add(parseInt(session.durationType.slice(1), 10), "minute"),
    })),
  })
)

export const CalendarGate = createGate()

sample({
  clock: CalendarGate.open,
  source: {
    from: $monthStartDate,
    to: $monthEndDate,
  },
  fn: ({ from, to }: { from: Dayjs; to: Dayjs }) => ({
    from: from.toISOString(),
    to: to.toISOString(),
  }),
  target: loadSessionsFx,
})
