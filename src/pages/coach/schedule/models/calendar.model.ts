import { date } from "@/lib/formatting/date"
import { Dayjs } from "dayjs"
import { createEvent, createStore, restore } from "effector-root"

export const setCurrentMonth = createEvent<Dayjs>()
export const changeDate = createEvent<Dayjs>()

export const $currentMonth = restore(setCurrentMonth, date()).on(changeDate, (_, payload) => payload)


export const $monthStartDate = $currentMonth.map(dat => date(dat).date(1))
export const $monthEndDate = $monthStartDate.map(dat => date(dat).add(1, "month"))

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

export const showVacationModal = createEvent<void | boolean>()
export const $isVacationModalShowed = createStore<boolean>(false).on(
  showVacationModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })