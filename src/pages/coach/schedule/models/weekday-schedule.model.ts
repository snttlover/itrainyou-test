import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { UpdateCoachSchedule, WeekDayName, WeekDaySlot } from "@/lib/api/coaching-sessions/types"
import { $sessionDate, $formSessionsData } from "@/pages/coach/schedule/models/add-session.model"
import { date } from "@/lib/formatting/date"
import { loadScheduleFx, updateScheduleFx } from "@/pages/coach/schedule/models/schedule.model"
import { loadSessionsWithParamsFx } from "@/pages/coach/schedule/models/sessions.model"
import { attach, combine, createEvent, createStore, forward, restore, sample, merge } from "effector-root"

export const saveWeekdaySlotsFx = attach({
  effect: updateScheduleFx,
  mapParams: (params: UpdateCoachSchedule) => params,
})

forward({
  from: saveWeekdaySlotsFx.done,
  to: loadSessionsWithParamsFx,
})

const saveWeekdaysSlotsSuccessMessage: Toast = { text: "Недельное расписание изменено", type: "info" }
forward({
  from: saveWeekdaySlotsFx.doneData.map(_ => saveWeekdaysSlotsSuccessMessage),
  to: [toasts.remove, toasts.add],
})

const saveWeekdaysSlotsFailMessage: Toast = { text: "Не удалось изменить недельное расписание", type: "error" }
forward({
  from: saveWeekdaySlotsFx.fail.map(_ => saveWeekdaysSlotsFailMessage),
  to: [toasts.remove, toasts.add],
})

const weekDayToNumberMap: { [key in WeekDayName]: 0 | 1 | 2 | 3 | 4 | 5 | 6 } = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
}

export const removeSlot = createEvent<{ slotId: number; weekday: WeekDayName }>()
export const addSlot = createEvent<{ weekday: WeekDayName; startTime: string[]; sessionDurationType: DurationType }>()
export const addSlotFromModal = createEvent()

export const $weekdaySlots = createStore(
  ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(weekday => ({
    weekday,
    slots: [],
  })) as WeekDaySlot[]
).on(
  merge([
    loadScheduleFx.doneData.map(data => data.weekdaySlots),
    saveWeekdaySlotsFx.doneData.map(data => data.weekdaySlots),
  ]),
  (weekdaySlots, loadedWeekdaySlots: WeekDaySlot[]) =>
    weekdaySlots.map(slots => {
      const loadedWeekdaySlot = loadedWeekdaySlots.find(({ weekday }) => slots.weekday === weekday)
      if (!loadedWeekdaySlot) return { ...slots, slots: [] }

      return {
        ...slots,
        slots: loadedWeekdaySlot.slots.map(slot => {
          const times = slot.startTime.split(":").map(parseFloat)
          return {
            ...slot,
            startTime: date
              .utc()
              .day(weekDayToNumberMap[slots.weekday])
              .set("h", times[0])
              .set("m", times[1])
              .format("HH:mm"),
          }
        }),
      }
    })
)

export const $weekdaySlotsForView = $weekdaySlots.map(weekdaySlots =>
  weekdaySlots.map(weekdaySlot => ({
    ...weekdaySlot,
    slots: weekdaySlot.slots.map(item => {
      const times = item.startTime.split(":").map(parseFloat)
      return {
        id: item.id,
        duration: item.sessionDurationType.slice(1),
        startTime: date().set("h", times[0]).set("m", times[1]).format("HH:mm"),
      }
    }),
  }))
)

export const changeDuration = createEvent<DurationType>()
export const $selectedDuration = restore(changeDuration, "D30")

const times = Array.from(Array(24).keys())
  .map(hour => Array.from(Array(4).keys()).map(mod => ({ hour, min: mod * 15 })))
  .flat()

export const $freeWeekdayTimes = combine(
  { times, weekdaySlots: $weekdaySlots, duration: $selectedDuration },
  ({ times, weekdaySlots, duration }) => {
    return weekdaySlots.map(({ weekday, slots }) => {
      const freeTimes = times.filter(({ min, hour }) => {
        const durationMinutes = parseInt(duration.slice(1), 10)
        const optionTime = date.utc().set("h", hour).set("m", min).set("s", 0).set("ms", 0)
        const endTime = optionTime.add(durationMinutes, "minute")

        const isCollideWithExistSessions = slots.reduce((isCollide, slot) => {
          if (isCollide) return isCollide

          const [hour, minute] = slot.startTime.split(":").map(Number)
          const slotDurationMinutes = parseInt(slot.sessionDurationType.slice(1), 10)
          const slotStartTime = date.utc().set("h", hour).set("m", minute).set("s", 0).set("ms", 0)
          const slotEndTime = slotStartTime.add(slotDurationMinutes, "minute")

          const isOptionTimeBetweenSlot = optionTime.isBetween(
            slotStartTime.subtract(1, "ms"),
            slotEndTime.add(1, "ms")
          )
          const isEndTimeBetweenSlot = endTime.isBetween(slotStartTime.subtract(1, "ms"), slotEndTime.add(1, "ms"))

          return isOptionTimeBetweenSlot || isEndTimeBetweenSlot
        }, false)

        return !isCollideWithExistSessions
      })

      return {
        weekday,
        times: freeTimes.map(item => ({
          label: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
          value: `${item.hour.toString().padStart(2, "0")}:${item.min.toString().padEnd(2, "0")}`,
        })),
      }
    })
  }
)

const timeToUTC = (time: string) => {
  const [hour, minute] = time.split(":").map(Number)
  return date.utc().set("h", hour).set("m", minute).set("s", 0).set("ms", 0).format("HH:mm")
}

sample({
  clock: removeSlot,
  source: $weekdaySlots,
  fn: (weekdaySlots, { slotId, weekday }) => {
    return {
      weekdaySlots: weekdaySlots.map(weekdaySlot => ({
        ...weekdaySlot,
        slots: weekdaySlot.slots
          .filter(slot => slot.id !== slotId)
          .map(slot => ({ ...slot, startTime: timeToUTC(slot.startTime) })),
      })),
    }
  },
  target: saveWeekdaySlotsFx,
})

sample({
  clock: addSlot,
  source: $weekdaySlots,
  fn: (weekdaySlots, { weekday, sessionDurationType, startTime }) => {
    return {
      weekdaySlots: weekdaySlots.map(weekdaySlot => {
        if (weekdaySlot.weekday !== weekday) return weekdaySlot

        return {
          ...weekdaySlot,
          slots: [...weekdaySlot.slots, { sessionDurationType, startTime }].map(slot => ({
            ...slot,
            // @ts-ignore
            startTime: timeToUTC(slot.startTime),
          })),
        }
      }),
    }
  },
  target: saveWeekdaySlotsFx,
})

/*sample({
  clock: addSlotFromModal,
  source: {
    sessions: $startDatetime,
    today: $sessionDate,
  },
  fn: ({sessions, today}) => {
    return
  },
  target: saveWeekdaySlotsFx,
})*/
