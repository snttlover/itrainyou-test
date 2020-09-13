import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { createSession } from "@/lib/api/coaching-sessions/create-session"
import { date } from "@/lib/formatting/date"
import { $prices } from "@/pages/coach/schedule/models/price-settings.model"
import { $allSessions, sessionAdded } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { combine, createEvent, sample, restore, createStore, createEffect, guard, forward } from "effector-root"

export const setModalShow = createEvent<boolean>()
export const $isAddSessionModalShowed = restore(setModalShow, false)

export const setAddSessionDate = createEvent<Dayjs>()
const $sessionDate = restore(setAddSessionDate, date())

export const $durationList = createStore<{ label: string; value: DurationType }[]>([
  { label: "30 минут", value: "D30" },
  { label: "45 минут", value: "D45" },
  { label: "60 минут", value: "D60" },
  { label: "90 минут", value: "D90" },
])

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

export const durationChanged = createEvent<DurationType>()
const $duration = restore<DurationType>(durationChanged, "D30")
const $durationIsCorrect = combine($durationOptions, $duration, (opts, selected) =>
  opts.map(({ value }) => value).includes(selected)
)

export const $startDatetimeOptions = combine(
  { opts: $timesOptions, sessionDate: $sessionDate, sessions: $daySessions, selectedDuration: $duration },
  ({ opts, sessionDate, sessions, selectedDuration }) => {
    const now = date()

    return opts
      .filter(({ hour, min }) => {
        const optionTime = date.utc(sessionDate).set("h", hour).set("m", min).set("s", 0).set("ms", 0)
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
)

export const startDatetimeChanged = createEvent<string>()
const $startDatetime = restore<string>(startDatetimeChanged, "00:00")
const $startDatetimeIsCorrect = combine($startDatetimeOptions, $startDatetime, (opts, selected) =>
  opts.map(({ value }) => value).includes(selected)
)

export const addSession = createEvent()

export const $form = combine({ startDatetime: $startDatetime, durationType: $duration })

export const createSessionsFx = createEffect({
  handler: createSession,
})

forward({
  from: createSessionsFx.doneData,
  to: sessionAdded,
})

const successToastMessage: Toast = { type: "info", text: "Сессиия создана" }
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

const $canBeCreated = combine(
  $startDatetimeIsCorrect,
  $durationIsCorrect,
  createSessionsFx.pending,
  (dateTimeCorrect, durationCorrect, pending) => dateTimeCorrect && durationCorrect && !pending
)

sample({
  clock: guard({ source: addSession, filter: $canBeCreated }),
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
})
