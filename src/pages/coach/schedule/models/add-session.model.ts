import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { createSession } from "@/lib/api/coaching-sessions/create-session"
import { date } from "@/lib/formatting/date"
import { $prices } from "@/pages/coach/schedule/models/price-settings.model"
import { $allSessions, sessionAdded } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { combine, createEvent, sample, restore, createStore, createEffect, guard, forward } from "effector-root"

export const setModalShow = createEvent<void | boolean>()
export const $isAddSessionModalShowed = createStore<boolean>(false).on(
  setModalShow,
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

export const $durationListTest = $prices.map((prices,state) =>
  prices.map(item => {
    if (item.key === "D30") {
      return { label: "30 минут", value: "D30", price: item.value }
    }
    if (item.key === "D45") {
      return { label: "45 минут", value: "D45", price: item.value }
    }
    if (item.key === "D60") {
      return { label: "60 минут", value: "D60", price: item.value }
    }
    if (item.key === "D90") {
      return { label: "90 минут", value: "D90", price: item.value }
    }
    return null
  }).filter(item => item !== null)
)

export const $durationOptions = combine($durationList, $prices, (list, prices) => {
  const keys = prices.filter(({ value }) => Boolean(value)).map(({ key }) => key)

  return list.filter(({ value }) => keys.includes(value))
})

const $timesOptions = createStore(
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
  startTime: string | null
  duration: DurationType | null
  id: number
  price: number
}

export const durationChanged = createEvent<StartTimeChanged>()
//const $duration = restore(durationChanged, "D30")
/*const $duration = createStore<StartTimeChanged[]>([{id: 1, duration: "D30"}]).on(durationChanged, (state,payload) => {
  console.log("durationChanged",payload)
  const currentElement = state.filter(item => item.id === payload.id)
  const changedElement = {...currentElement, duration: payload.duration}
  return state.splice(state.indexOf(currentElement), 1, changedElement)
})*/

export const addNewTimesToDialog = createEvent()
export const deleteTimeFromDialog = createEvent<number>()

export const startDatetimeChanged = createEvent<StartTimeChanged>()
//const $startDatetime = restore<string>(startDatetimeChanged, "00:00")

export const $startDatetime = createStore<StartTimeChanged[]>([{id: 1, startTime: null, duration: "D30", price: 0}])
  .on(startDatetimeChanged, (state,payload) => {
    let newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], startTime: payload.startTime, price: payload.price }
    return newState
  })
  .on(durationChanged, (state,payload) => {
    let newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], duration: payload.duration, price: payload.price}
    return newState})
  .on(addNewTimesToDialog,(state,payload) => {
    const lastItem = state[state.length - 1]
    return state.concat({id: lastItem.id + 1, duration: "D30", startTime: null, price: 0})})
  .on(deleteTimeFromDialog, (state,payload) =>
    state.filter(item => item.id !== payload))
  .on(setModalShow, (state, payload) => payload ? state : [{id: 1, duration: "D30", startTime: null, price: 0}])

startDatetimeChanged.watch(payload => console.log("date changed", payload))
durationChanged.watch(payload => console.log("duration changed", payload))
$startDatetime.watch(payload => console.log("dates store",payload))

/*const $durationIsCorrect = combine($durationOptions, $duration, (opts, selected) =>
  opts.map(({ value }) => value).includes(selected)
)*/

const $durationIsCorrect = createStore(false)

/*const $priceForDurationIsCorrect = combine($prices, $duration, (prices, durationList) => {
  const test = prices.map(({ value }) => value)
})*/

//const endTime = pickedSessions.map(item => optionTime.add(parseInt(selectedDuration.slice(1), 10), "minute"))

export const $startDatetimeOptions = combine(
  { opts: $timesOptions, sessionDate: $sessionDate, sessions: $daySessions, formSessions: $startDatetime },
  ({ opts, sessionDate, sessions, formSessions }) => {
    const now = date()

    return opts
      .filter(({ hour, min }) => {
        /*const optionTime = date(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)

        const endTimes = formSessions.map(item =>
          optionTime.add(parseInt(item.duration.slice(1), 10), "minute"))

        const isAfterThanNow = optionTime.isAfter(now)
        const isCollideWithExistSessions = sessions.reduce((isCollide, session) => {
          if (isCollide) return isCollide
          return (
            optionTime.isBetween(session.startTime.subtract(1, "ms"), session.endTime) ||
            endTimes.map(time => time.isBetween(session.startTime.subtract(1, "ms"), session.endTime))
              .filter(time => time === false).length > 0
          )
        }, false)

        return isAfterThanNow && !isCollideWithExistSessions*/
        const optionTimeSession = date(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)
        const endTime = optionTimeSession.add(parseInt(formSessions[0].duration.slice(1), 10), "minute")


       // const endTimes = !!formSessions[0].duration ? optionTimeSession.add(parseInt(formSessions[0].duration.slice(1), 10), "minute") : null

        /*const isCollideWithExistSessions = formSessions.reduce((formCollide, formSession) => {
          if (formCollide) {
            return formCollide
          } else {
            return sessions.reduce((isCollide, session) => {
              if (isCollide) {
                return isCollide
              } else {
                // @ts-ignore
                const endTimeSession = optionTime.add(parseInt(formSession.duration.slice(1), 10), "minute")
                const optionTimeFormSession = date(formSession).set("h", hour).set("m", min).set("s", 0).set("ms", 0)
                const optionTimeSession = date(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)
                return (
                  optionTimeSession.isBetween(session.startTime.subtract(1, "ms"), session.endTime) ||
                  endTimeSession.isBetween(session.startTime.subtract(1, "ms"), session.endTime)
                  // про шлые сессии !!formSession && endTimeSession.isBetween(formSession.startTime.subtract(1, "ms"), session.endTime)
                )
              }
            }, false)
          }
        }, false)*/

        const isCollideWithExistSessions = sessions.reduce((isCollide, session) => {
          if (isCollide) return isCollide
          return (
            optionTimeSession.isBetween(session.startTime.subtract(1, "ms"), session.endTime) ||
            endTime.isBetween(session.startTime.subtract(1, "ms"), session.endTime)
          )
        }, false)

        const isAfterThanNow = optionTimeSession.isAfter(now)

        return isAfterThanNow && !isCollideWithExistSessions
      })
      .map(item => ({
        label: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
        value: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
      }))
  }
)
//reset(durationChanged)

/*export const $startDatetimeOptions = combine(
  { opts: $timesOptions, sessionDate: $sessionDate, sessions: $daySessions, selectedDuration: $duration },
  ({ opts, sessionDate, sessions, selectedDuration }) => {
    const now = date()

    return opts
      .filter(({ hour, min }) => {
        const optionTime = date(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)
        const endTime = optionTime.add(parseInt(selectedDuration.slice(1), 10), "minute")

        const isAfterThanNow = optionTime.isAfter(now)
        const isCollideWithExistSessions = sessions.reduce((isCollide, session) => {
          if (isCollide) return isCollide
          return (
            optionTime.isBetween(session.startTime.subtract(1, "ms"), session.endTime) ||
            endTime.isBetween(session.startTime.subtract(1, "ms"), session.endTime)
          )
        }, false)

        return isAfterThanNow && !isCollideWithExistSessions
      })
      .map(item => ({
        label: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
        value: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
      }))
  }
)*/

/*const $startDatetimeIsCorrect = combine($startDatetimeOptions, $startDatetime, (opts, selected) =>
  opts.map(({ value }) => value).includes(selected)
)*/

const $startDatetimeIsCorrect = createStore(false)

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
  to: [toasts.remove, toasts.add, setModalShow.prepend(_ => false)],
})

const failToastMessage: Toast = { type: "error", text: "Ошибка создания сессии" }
forward({
  from: createSessionsFx.fail.map(_ => failToastMessage),
  to: [toasts.remove, toasts.add],
})

export const $isCreateButtonDisabled = combine(
  $startDatetimeIsCorrect,
  $durationIsCorrect,
  createSessionsFx.pending,
  (dateTimeCorrect, durationCorrect, pending) => !dateTimeCorrect || !durationCorrect || pending
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
