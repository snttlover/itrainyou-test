import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { createSession } from "@/lib/api/coaching-sessions/create-session"
import { date } from "@/lib/formatting/date"
import { $allSessions, sessionAdded } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, restore, sample } from "effector-root"

export const showAddSessionModal = createEvent<void | boolean>()
export const $isAddSessionModalShowed = createStore<boolean>(false).on(
  showAddSessionModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })

export const showMobileSessionInfo = createEvent<void | boolean>()
export const $isMobileSessionInfoShowed = createStore<boolean>(false).on(
  showMobileSessionInfo,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })

export const setAddSessionDate = createEvent<Dayjs>()
export const $sessionDate = restore(setAddSessionDate, date())

export const $durationList = createStore<{ label: string; value: DurationType }[]>([
  { label: "30 минут", value: "D30" },
  { label: "45 минут", value: "D45" },
  { label: "60 минут", value: "D60" },
  { label: "90 минут", value: "D90" },
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

const $daySessions = combine($allSessions, $sessionDate, (allSessions, dat) =>
  allSessions.sessions.filter(
    session => date(dat).isSame(session.startTime, "d") || date(dat).isSame(session.endTime, "d")
  )
)

export type StartTimeChanged = {
  id: number
  startTime: string | null
  duration: DurationType
  price: number
}

export const addSessionToForm = createEvent()
export const deleteSessionToForm = createEvent<number>()

export const getStartTimeOptions = createEvent<number>()

export const formSessionDurationChanged = createEvent<StartTimeChanged>()
export const formSessionStartDatetimeChanged = createEvent<StartTimeChanged>()

export const $formSessionsData = createStore<StartTimeChanged[]>([{id: 1, startTime: null, duration: "D30", price: 0}])
  .on(formSessionStartDatetimeChanged, (state, payload) => {
    const newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], startTime: payload.startTime, price: payload.price }
    return newState
  })
  .on(formSessionDurationChanged, (state, payload) => {
    const newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], duration: payload.duration, price: payload.price}
    return newState
  })
  .on(addSessionToForm,(state) => {
    const id = state.length + 1
    return [...state, {id, startTime: null, duration: "D30", price: 0}]
  })
  .on(deleteSessionToForm, (state, payload) =>
    state.filter(item => item.id !== payload))
  .on(showAddSessionModal, (state, payload) => payload ? state : [{id: 1, duration: "D30", startTime: null, price: 0}])

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

const $startDatetimeIsCorrect = $formSessionsData.map(times => times.reduce((isFilled, time)=> {
  if (isFilled) return isFilled
  return (!!time.startTime)
}, false))


const $priceIsCorrect = $formSessionsData.map(times => times.reduce((isFilled, time)=> {
  if (isFilled) return isFilled
  return (!!time.price)
}, false))

/*const $priceIsCorrect = combine($startDatetime, $durationListTest, (dates, prices) => {
  if (!!prices) {
    const emptyPrices = prices.filter(item => item.price === 0)
    console.log("lul", emptyPrices)
    const isCorrect =  emptyPrices.reduce((hasEmpty, item) => {
      if (hasEmpty)  {
        return hasEmpty
      }
      else {
        const test = dates.reduce((acc, currentValue) => {
          if (acc) return acc
          return currentValue.duration === item.value
        }, false)
        console.log("test",test)
        return test
      }
    }, false)
    return isCorrect
  } else {
    return false
  }
})*/

export const addSessions = createEvent()

//export const $form = combine($startDatetime, $duration, (startDatetime, duration)=> ({ startDatetime: startDatetime, durationType: duration }))

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

const failToastMessage: Toast = { type: "error", text: "Ошибка создания сессии" }
forward({
  from: createSessionsFx.fail.map(_ => failToastMessage),
  to: [toasts.remove, toasts.add],
})

export const $isCreateButtonDisabled = combine(
  $startDatetimeIsCorrect,
  $durationIsCorrect,
  $priceIsCorrect,
  createSessionsFx.pending,
  (dateTimeCorrect, durationCorrect, priceCorrect, pending) => !dateTimeCorrect || !durationCorrect || !priceCorrect  || pending
)

/*const $canBeCreated = combine(
  $startDatetimeIsCorrect,
  $durationIsCorrect,
  createSessionsFx.pending,
  (dateTimeCorrect, durationCorrect, pending) => dateTimeCorrect && durationCorrect && !pending
)*/

/*sample({
  clock: guard({ source: addSessions, filter: $canBeCreated }),
  source: {
    form: $form,
    date: $sessionDate,
  },
  fn: ({ form, date }) => {
    const [hour, minute] = form.startDatetime.split(":")
    const datetime = date.set("h", parseInt(hour, 10)).set("m", parseInt(minute, 10)).second(0).millisecond(0)
    return { ...form, startDatetime: datetime.toISOString() }
  },
  target: createSessionsFx,
})*/


sample({
  clock: addSessions,
  source: {
    sessions: $formSessionsData,
    date: $sessionDate,
  },
  fn: ({ sessions, date }) => {
    const sepparatedHourMinutes = sessions.map(session => session.startTime!.split(":"))

    const dateTimes = sepparatedHourMinutes.map(time =>
      date.set("h", parseInt(time[0], 10)).set("m", parseInt(time[1], 10)).second(0).millisecond(0).toISOString())

    const durations = sessions.map(session => session.duration)

    return dateTimes.map((time, index) => ({ startDatetime: time, durationType: durations[index] }))
  },
  target: createSessionsFx,
})