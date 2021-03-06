import { Toast, toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CoachSession, getCoachSessions } from "@/lib/api/coach-sessions"
import { googleCalendarApi, endSyncCalendar, startSyncCalendar, CalendarEvents, deleteGoogleCalendar, getCalendarEvents } from "@/lib/api/coach/google-calendar/google-calendar-api"
import { removeCoachSession, removeCoachSessionRange } from "@/lib/api/coaching-sessions/remove-coach-session"
import { date } from "@/lib/formatting/date"
import {
  $monthEndDate,
  $monthStartDate,
  setCurrentMonth,
  showMobileSessionInfo,
  showVacationModal,
  showMobileFilterModal
} from "@/pages/coach/schedule/models/calendar.model"
import { createGate } from "@/scope"
import dayjs, { Dayjs } from "dayjs"
import {
  combine,
  createEffect,
  createEvent,
  forward,
  restore,
  sample,
  merge,
  attach,
  createStore,
  split,
  guard
} from "effector-root"
import { $sessionToDelete } from "@/pages/coach/schedule/models/remove-session.model"
import { AxiosError } from "axios"
import { loadScheduleFx, ScheduleGate } from "@/pages/coach/schedule/models/schedule/units"
import { DurationType } from "@/lib/api/coach-sessions"

type DateRange = {
  from: string
  to: string
}

export const loadSessionsFx = createEffect({
  handler: ({ from, to }: DateRange) => getCoachSessions("me", { start_date__gte: from, start_date__lte: to }),
})

export const loadCalendarEventsFx = createEffect({
  handler: ({ from, to }: DateRange) => getCalendarEvents({ start_date__gte: from, start_date__lte: to })
})

export const removeSessionsRangeFx = createEffect({
  handler: ({ from, to }: DateRange) => removeCoachSessionRange({ start_date: from, end_date: to }),
})

type SessionType = {
  googleEvent: boolean
  areAvailable: boolean
  client?: [any]
  id: number
  sessionDurationType?: DurationType
  startTime: Dayjs
  endTime: Dayjs
}

const CANCEL = -1
export const removeSession = createEvent<SessionType>()

$sessionToDelete.on(removeSession, (state, payload) => payload)

export const removeSessionFx = createEffect({
  handler: (params: SessionType) => removeCoachSession(params.id),
})

const sessionRemoved = removeSessionFx.done.filter({ fn: () => true })

forward({
  from: removeSession,
  to: removeSessionFx,
})

forward({
  from: sessionRemoved.map(_ => {
    const time = `${
      $sessionToDelete.getState().startTime.format("DD.MM.YY HH:mm")
    }-${
      $sessionToDelete.getState().endTime.format("HH:mm")
    }`
    return { type: "info", text: `???????????? ${time} ??????????????` } as Toast
  }),
  to: [toasts.remove, toasts.add, showMobileSessionInfo.prepend(() => false)],
})

const removeFailedMessage: Toast = {
  type: "error",
  text: "???????????? ?????? ?????????????????????????? ?? ???? ?????? ???????????? 24 ??????????. ???????????????????? ?? ?????????????????? ?????? ???????????? ????????????"
}

forward({
  from: removeSessionFx.failData.map(_ => removeFailedMessage),
  to: [toasts.remove, toasts.add],
})

const $repeatedSessions = restore(
  loadScheduleFx.doneData.map(data => data.weekdaySlots),
  []
)
export const sessionAdded = createEvent<CoachSession[]>()

type FilterByType = "no-filter" | "only-free" | "only-booked"
type FilterOptionsTypes = {
  value: FilterByType
  selected: boolean
  label: string
}

export const filterBy = createEvent<FilterByType>()
export const changeFilterView = createEvent<FilterByType>()

export const $filterOptions = createStore<FilterOptionsTypes[]>([{
  value: "no-filter",
  selected: true,
  label: "??????"
},
{
  value: "only-booked",
  selected: false,
  label: "??????????????????????????????"
},
{
  value: "only-free",
  selected: false,
  label: "????????????????????"
}])
  .on(merge([filterBy, changeFilterView]), (state, payload) => {
    const newState = [...state]
    const currentElementID = newState.findIndex(item => item.value === payload)
    newState.map((element, index) => {
      element.selected = index === currentElementID
    })
    return newState
  })


const $sessions = createStore<CalendarEvents>({sessions: [], googleCalendarEvents: []})
  .on(loadCalendarEventsFx.doneData, (state, response) => response)
  .on(sessionAdded, (state, session) =>
    ({googleCalendarEvents: state.googleCalendarEvents, sessions: [...state.sessions, ...session]}))
  .on(sessionRemoved, (state, payload) =>
    ({googleCalendarEvents: state.googleCalendarEvents, sessions: state.sessions.filter(session => session.id !== payload.params.id)}))

const changeFilteredSessions = createEvent<CalendarEvents>()
const $filteredSessions = createStore<CalendarEvents>({googleCalendarEvents: [], sessions: []})
  .on(changeFilteredSessions, (_, payload) => payload)

sample({
  clock: $sessions.updates,
  source: $filterOptions,
  fn: (filterOptions, sessions: CalendarEvents) => {
    const selected = filterOptions.find(item => item.selected)

    if (selected!.value === "no-filter") {
      return sessions
    } else if (selected!.value === "only-booked") {
      return {googleCalendarEvents: [], sessions: sessions.sessions.filter(session => !!session.clients.length)}
    } else if (selected!.value === "only-free") {
      return {googleCalendarEvents: [], sessions: sessions.sessions.filter(session => session.durationType === "PROMO")}
    }
    return sessions
  },
  target: changeFilteredSessions,
})

export const $showedSessions = combine(
  { repeatedSessions: $repeatedSessions, sessions: $filteredSessions },
  ({ repeatedSessions, sessions }) => {
    const usualEvents = sessions.sessions.map(session => ({
      googleEvent: false,
      areAvailable: !!session.clients.length,
      client: session.clients[0],
      id: session.id,
      sessionDurationType: session.durationType,
      startTime: date(session.startDatetime),
      endTime: date(session.endDatetime),
    }))

    const googleEvents = sessions.googleCalendarEvents.map(session => ({
      googleEvent: true,
      areAvailable: false,
      id: session.id,
      startTime: date(session.startDatetime),
      endTime: date(session.endDatetime),
    }))

    const mergedSessions = [...usualEvents,...googleEvents]

    return {
      repeatedSessions,
      sessions: mergedSessions,
    }
  }
)

sample({
  clock: filterBy,
  source: $sessions,
  fn: (sessions: CalendarEvents, filterBy) => {
    if (filterBy === "no-filter") {
      return sessions
    } else if (filterBy === "only-booked") {
      return {googleCalendarEvents: [], sessions: sessions.sessions.filter(session => !!session.clients.length)}
    } else if (filterBy === "only-free") {
      return {googleCalendarEvents: [], sessions: sessions.sessions.filter(session => session.durationType === "PROMO")}
    }
    return sessions
  },
  target: changeFilteredSessions,
})

export const CalendarGate = createGate()
const loadSessions = createEvent()

export const loadSessionsWithParamsFx = attach({
  effect: loadCalendarEventsFx,
  source: {
    from: $monthStartDate,
    to: $monthEndDate,
  },
  mapParams: (_, { from, to }) => {
    const weekBefore = from.subtract(1, "week")
    const weekAfter = to.add(1, "week")
    return {
      from: weekBefore.toISOString().substring(0, 10),
      to: weekAfter.toISOString().substring(0, 10),
    }
  },
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

const removeRangeSuccessMessage: Toast = { type: "info", text: "?????????????? ??????????????" }
forward({
  from: removeSessionsRangeFx.done.map(_ => removeRangeSuccessMessage),
  to: [toasts.remove, toasts.add, loadSessions.prepend(_ => {}), showVacationModal.prepend(() => false)],
})

const removeRangeFailMessage: Toast = { type: "error", text: "???????????? ?????? ????????????????" }
forward({
  from: removeSessionsRangeFx.failData.map(_ => removeRangeFailMessage),
  to: [toasts.remove, toasts.add, loadSessions.prepend(_ => {})],
})

export const $syncedEmail = createStore<string | null>("").on(loadScheduleFx.doneData,(state, payload) => payload.googleCalendarEmail)
export const getRefreshToken = createEvent<any>()

const addGoogleCalendarFx = createEffect({
  handler: (params: {code: string}) => googleCalendarApi(params)
})

forward({
  from: getRefreshToken,
  to: addGoogleCalendarFx,
})

const addGoogleCalendarFailMessage: Toast = { type: "error", text: "???????????? ?????????????? ?????? ???????????????? ?? ?????????????? ??????????" }
const googleFailed = createEvent()

guard({
  source: addGoogleCalendarFx.failData,
  filter: (error) => (error as AxiosError)?.response?.data.code === "CALENDAR_ALREADY_USED" && (error as AxiosError)?.response?.status === 400,
  target: googleFailed,
})

forward({
  from: googleFailed.map(_ => addGoogleCalendarFailMessage),
  to: [toasts.remove, toasts.add],
})

export const syncGoogleCalendar = createEvent<"synchronize" | "desynchronize">()
export const deleteSynchronization = createEvent()

const startCalendarSyncFx = createEffect<"synchronize" | "desynchronize", void, AxiosError>({
  handler: () => startSyncCalendar()
})

const deleteGoogleCalendarFx = createEffect({
  handler: () => deleteGoogleCalendar()
})

const endCalendarSyncFx = createEffect<"synchronize" | "desynchronize", void, AxiosError>({
  handler: () => endSyncCalendar()
})

export const $isSynced = createStore<"synced" | "unsynced">("unsynced")
  .on(loadScheduleFx.doneData,(state, payload) => payload.isGoogleCalendarSync ? "synced" : "unsynced")
  .on(startCalendarSyncFx.done,(state,payload) => "synced")
  .on(endCalendarSyncFx.done,(state,payload) => "unsynced")

export const $isGoogleCalendarAdded = createStore(false).on(loadScheduleFx.doneData,(state, payload) => payload.isGoogleCalendarAdded)

split({
  source: syncGoogleCalendar,
  match: {
    synchronize: (payload: "synchronize" | "desynchronize") => payload === "synchronize",
    desynchronize: (payload: "synchronize" | "desynchronize") => payload === "desynchronize",
  },
  cases: {
    synchronize: startCalendarSyncFx,
    desynchronize: endCalendarSyncFx,
  }
})

forward({
  from: deleteSynchronization,
  to: deleteGoogleCalendarFx,
})

forward({
  from: merge([
    loadSessions,
    setCurrentMonth,
    CalendarGate.open,
    addGoogleCalendarFx.done,
    startCalendarSyncFx.done,
    endCalendarSyncFx.done,
    deleteGoogleCalendarFx.done]),
  to: loadSessionsWithParamsFx,
})

forward({
  from: merge([
    ScheduleGate.open,
    addGoogleCalendarFx.done,
    startCalendarSyncFx.done,
    endCalendarSyncFx.done,
    deleteGoogleCalendarFx.done]),
  to: loadScheduleFx,
})
