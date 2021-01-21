import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CoachSession, getCoachSessions } from "@/lib/api/coach-sessions"
import { removeCoachSession, removeCoachSessionRange } from "@/lib/api/coaching-sessions/remove-coach-session"
import { date } from "@/lib/formatting/date"
import { $monthEndDate, $monthStartDate, setCurrentMonth } from "@/pages/coach/schedule/models/calendar.model"
import { loadScheduleFx } from "@/pages/coach/schedule/models/schedule.model"
import { createGate } from "@/scope"
import dayjs, { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, forward, restore, sample, merge, attach } from "effector-root"

type DateRange = {
  from: string
  to: string
}

export const loadSessionsFx = createEffect({
  handler: ({ from, to }: DateRange) => getCoachSessions("me", { start_date__gte: from, start_date__lte: to }),
})

export const removeSessionsRangeFx = createEffect({
  handler: ({ from, to }: DateRange) => removeCoachSessionRange({ start_date: from, end_date: to }),
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

const removeFailedMessage: Toast = {
  type: "error",
  text: "Сессия уже забронирована и до нее меньше 24 часов. Обратитесь в поддержку для отмены сессии"
}
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
const loadSessions = createEvent()

export const loadSessionsWithParamsFx = attach({
  effect: loadSessionsFx,
  source: combine(
    {
      from: $monthStartDate,
      to: $monthEndDate,
    },
    ({ from, to }) => ({
      from: from.toISOString(),
      to: to.toISOString(),
    })
  ),
  mapParams: (_, data) => ({ ...data }),
})


/*export const loadSessionsWithParamsFx = attach({
  effect: loadSessionsFx,
  // @ts-ignore
  source: combine(
    {
      from: $monthStartDate,
      to: $monthEndDate,
    },
    ({ from, to }) => {
      console.log("from and to", from,to)
      return {
        from: from,
        to: to,
      }}
  ),
  mapParams: (_, data) => ({ ...data }),
})*/

forward({
  from: merge([loadSessions, setCurrentMonth, CalendarGate.open]),
  to: loadSessionsWithParamsFx,
})

export type PickerDate = Dayjs | null
export type DateArray = [PickerDate, PickerDate]

export const changePickedDeleteRange = createEvent<DateArray>()
export const $pickedDeleteRange = restore<DateArray>(changePickedDeleteRange, [null, null])

export const $deleteButtonIsDisabled = $pickedDeleteRange.map(dates => !dates[0] || !dates[1])

forward({
  from: CalendarGate.close,
  to: changePickedDeleteRange.prepend(() => [null, null]),
})

export const removeSessionsRange = createEvent<DateArray>()

forward({
  from: removeSessionsRange.map(range => ({
    from: dayjs(range[0] || undefined).format("YYYY-MM-DD"),
    to: dayjs(range[1] || undefined).format("YYYY-MM-DD"),
  })),
  to: removeSessionsRangeFx,
})

const removeRangeSuccessMessage: Toast = { type: "info", text: "Успешно удалено" }
forward({
  from: removeSessionsRangeFx.done.map(_ => removeRangeSuccessMessage),
  to: [toasts.remove, toasts.add, loadSessions.prepend(_ => {})],
})

const removeRangeFailMessage: Toast = { type: "error", text: "Ошибка при удалении" }
forward({
  from: removeSessionsRangeFx.failData.map(_ => removeRangeFailMessage),
  to: [toasts.remove, toasts.add, loadSessions.prepend(_ => {})],
})
