import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { createSession } from "@/lib/api/coaching-sessions/create-session"
import { date } from "@/lib/formatting/date"
import { $showedSessions, sessionAdded } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, restore, sample } from "effector-root"
import { $prices } from "@/pages/coach/schedule/models/price-settings/units"
import { showAddSessionModal } from "@/pages/coach/schedule/models/calendar.model"

export const setMobileInfo = createEvent<{
  googleEvent: boolean
  areAvailable: boolean
  client?: [any]
  id: number
  sessionDurationType?: "D30" | "D45" | "D60" | "D90"
  startTime: Dayjs
  endTime: Dayjs
}>()

export const $mobileEventInfo = restore<{
  googleEvent: boolean
  areAvailable: boolean
  client?: [any]
  id: number
  sessionDurationType?: "D30" | "D45" | "D60" | "D90"
  startTime: Dayjs
  endTime: Dayjs
}>(setMobileInfo, {
  googleEvent: false,
  areAvailable: true,
  id: 0,
  startTime: date(),
  endTime: date(),})

export const setAddSessionDate = createEvent<Dayjs>()
export const $sessionDate = restore(setAddSessionDate, date())

export const $durationList = createStore<{ label: string; value: DurationType }[]>([
  { label: "30 минут", value: "D30" },
  { label: "45 минут", value: "D45" },
  { label: "60 минут", value: "D60" },
  { label: "90 минут", value: "D90" },
  { label: "% промо", value: "PROMO" },
])

export const $durationOptions = $durationList.map((durations) => {
  // ToDo: переписать логику, чтобы отдавать только те duration, которые не налезут на существующие сессии
  return durations
})

const $allTimesOptions = createStore(
  Array.from(Array(24).keys())
    .map(hour => Array.from(Array(4).keys()).map(mod => ({ hour, min: mod * 15 })))
    .flat()
)

const $daySessions = combine($showedSessions, $sessionDate, (allSessions, dat) =>
  allSessions.sessions.filter(
    session => date(dat).isSame(session.startTime, "d") || date(dat).isSame(session.endTime, "d")
  )
)

export type StartTimeChanged = {
  id: number
  startTime: string | null
  duration: DurationType
}

export const addSessionToForm = createEvent()
export const deleteSessionToForm = createEvent<number>()

export const getStartTimeOptions = createEvent<number>()

export const formSessionDurationChanged = createEvent<StartTimeChanged>()
export const formSessionStartDatetimeChanged = createEvent<StartTimeChanged>()

export const $formSessionsData = createStore<StartTimeChanged[]>([{id: 1, startTime: null, duration: "D30"}])
  .on(formSessionStartDatetimeChanged, (state, payload) => {
    const newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], startTime: payload.startTime}
    return newState
  })
  .on(formSessionDurationChanged, (state, payload) => {
    const newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], duration: payload.duration}
    return newState
  })
  .on(addSessionToForm,(state) => {
    const id = state.length + 1
    return [...state, {id, startTime: null, duration: "D30"}]
  })
  .on(deleteSessionToForm, (state, payload) =>
    state.filter(item => item.id !== payload))
  .on(showAddSessionModal, (state, payload) => payload ? state : [{id: 1, duration: "D30", startTime: null}])

const $formSessions = combine(
  {sessionDate: $sessionDate, formSessionsData: $formSessionsData},
  ({sessionDate, formSessionsData}) => {

    formSessionsData = formSessionsData.filter(({startTime}) => !!startTime)

    return formSessionsData.map(({startTime, duration, id}) => {
      const parts = startTime!.split(":")
      const hour = parseInt(parts[0], 10)
      const min = parseInt(parts[1], 10)

      const _startTime = date(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)
      const endTime = _startTime.add(parseInt(duration.slice(1), 10), "minute")

      return {
        id: id,
        startTime: _startTime,
        endTime,
        duration
      }
    })

  }
)

export const $startTimeOptions = createStore([{label: "00:00", value: "00:00"}])

sample({
  clock: getStartTimeOptions,
  source: combine(
    {
      allTimesOptions: $allTimesOptions,
      sessionDate: $sessionDate,
      existedSessions: $daySessions,
      formSessionsData: $formSessionsData,
      formSessions: $formSessions,
    }),
  target: $startTimeOptions,
  fn: (
    {
      allTimesOptions,
      sessionDate,
      existedSessions,
      formSessionsData,
      formSessions
    },
    sessionId
  ) => {
    const now = date()

    const existedAndFormSessions = [...existedSessions, ...formSessions.filter(session => session.id != sessionId)]

    return allTimesOptions
      .filter(({ hour, min }) => {
        const startDatetimeOption = date(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)

        const lastSessionDataDuration = formSessionsData[formSessionsData.length - 1].duration.slice(1)
        const endDateTimeOption = startDatetimeOption.add(parseInt(lastSessionDataDuration, 10), "minute")

        const isCollideWithExistSessions = existedAndFormSessions.reduce((isCollide, session) => {
          if (isCollide) return isCollide

          return (
            startDatetimeOption.isBetween(session.startTime.subtract(1, "ms"), session.endTime) ||
            endDateTimeOption.isBetween(session.startTime.subtract(1, "ms"), session.endTime)
          )
        }, false)

        const isAfterThanNow = startDatetimeOption.isAfter(now)
        return isAfterThanNow && !isCollideWithExistSessions
      })
      .map(item => ({
        label: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
        value: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
      }))
  }
})

const $durationIsCorrect = $formSessionsData.map(times => times.reduce((isFilled, time)=> {
  if (isFilled) return isFilled
  return (!!time.duration)
}, false))


const $startDatetimeIncorrect = createStore(true)
  .on($formSessionsData,(state,payload) => payload.filter(item => item.startTime === null).length > 0)

const $priceIsCorrect = combine(
  {formSessionsData: $formSessionsData, prices: $prices},
  ({formSessionsData, prices}) => {
    const sessionDurations = formSessionsData.map(sessionData => sessionData.duration)
    return sessionDurations.reduce((isPriceSet, duration) => {
      if (!isPriceSet) return false

      return !!(prices.find(price => price.key === duration)?.value || duration === "PROMO")
    }, true)
  })

export const addSessions = createEvent()

export const createSessionsFx = createEffect({
  handler: createSession,
})

forward({
  from: createSessionsFx.doneData,
  to: sessionAdded,
})

const successToastMessage: Toast = { type: "info", text: "Сессия создана" }
forward({
  from: createSessionsFx.done.map(_ => successToastMessage),
  to: [toasts.remove, toasts.add, showAddSessionModal.prepend(_ => false)],
})

const failToastMessage: Toast = { type: "error", text: "Невозможно создать сессию. Слот уже занят в вашем календаре" }
forward({
  from: createSessionsFx.fail.map(_ => failToastMessage),
  to: [toasts.remove, toasts.add],
})

export const $isCreateButtonDisabled = combine(
  $startDatetimeIncorrect,
  $durationIsCorrect,
  $priceIsCorrect,
  createSessionsFx.pending,
  (dateTimeInCorrect, durationCorrect, priceCorrect, pending) => dateTimeInCorrect || !durationCorrect || !priceCorrect  || pending
)

sample({
  clock: addSessions,
  source: {
    sessionsData: $formSessionsData,
    date: $sessionDate,
  },
  fn: ({ sessionsData, date }) => {
    sessionsData  = sessionsData.filter(({startTime}) => !!startTime)

    const separatedHourMinutes = sessionsData.map(session => session.startTime!.split(":"))

    const dateTimes = separatedHourMinutes.map(time =>
      date.set("h", parseInt(time[0], 10)).set("m", parseInt(time[1], 10)).second(0).millisecond(0).toISOString())

    const durations = sessionsData.map(session => session.duration)

    return dateTimes.map((time, index) => ({ startDatetime: time, durationType: durations[index] }))
  },
  target: createSessionsFx,
})