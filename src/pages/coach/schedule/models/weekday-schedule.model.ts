import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { UpdateCoachSchedule, WeekDayName, WeekDaySlot } from "@/lib/api/coaching-sessions/types"
import { date } from "@/lib/formatting/date"
import { loadScheduleFx, updateScheduleFx } from "@/pages/coach/schedule/models/schedule.model"
import { attach, combine, createEvent, createStore, forward, restore, sample } from "effector-root"

export const saveWeekdaySlotsFx = attach({
  effect: updateScheduleFx,
  mapParams: (params: UpdateCoachSchedule) => params,
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

export const removeSlot = createEvent<{ slotId: number; weekday: WeekDayName }>()
export const addSlot = createEvent<{ weekday: WeekDayName; startTime: string; sessionDurationType: DurationType }>()

export const $weekdaySlots = createStore(
  ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(weekday => ({
    weekday,
    slots: [],
  })) as WeekDaySlot[]
).on(
  loadScheduleFx.doneData.map(data => data.weekdaySlots),
  (weekdaySlots, loadedWeekdaySlots: WeekDaySlot[]) =>
    weekdaySlots.map(slots => {
      const loadedWeekdaySlot = loadedWeekdaySlots.find(({ weekday }) => slots.weekday === weekday)
      if (!loadedWeekdaySlot) return slots

      return {
        ...slots,
        slots: loadedWeekdaySlot.slots,
      }
    })
)

export const $weekdaySlotsForView = $weekdaySlots.map(weekdaySlots =>
  weekdaySlots.map(weekdaySlot => ({
    ...weekdaySlot,
    slots: weekdaySlot.slots.map(item => ({
      id: item.id,
      duration: item.sessionDurationType.slice(1),
      startTime: item.startTime.split(":").slice(0, 2).join(":"),
    })),
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
        const optionTime = date().set("h", hour).set("m", min).set("s", 0).set("ms", 0)
        const endTime = optionTime.add(durationMinutes, "minute")

        const isCollideWithExistSessions = slots.reduce((isCollide, slot) => {
          if (isCollide) return isCollide

          const [hour, minute] = slot.startTime.split(":").map(Number)
          const slotStartTime = date().set("h", hour).set("m", minute)
          const slotEndTime = slotStartTime.add(durationMinutes, "minute")

          return (
            optionTime.isBetween(slotStartTime.subtract(1, "ms"), slotEndTime) ||
            endTime.isBetween(slotStartTime.subtract(1, "ms"), slotEndTime)
          )
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

sample({
  clock: removeSlot,
  source: $weekdaySlots,
  fn: (weekdaySlots, { slotId, weekday }) => {
    return {
      weekdaySlots: weekdaySlots.map(weekdaySlot => ({
        ...weekdaySlot,
        slots: weekdaySlot.slots.filter(slot => slot.id !== slotId),
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
          slots: [...weekdaySlot.slots, { sessionDurationType, startTime }],
        }
      }),
    }
  },
  target: saveWeekdaySlotsFx,
})
