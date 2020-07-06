import { date } from "@/lib/formatting/date"
import { Dayjs } from "dayjs"
import { createEvent, createStore } from "effector-root"

export const setCurrentMonth = createEvent<Dayjs>()

export const $currentMonth = createStore(date())
export const $monthStartDate = $currentMonth.map(dat => date(dat).date(1))
export const $monthEndDate = $monthStartDate.map(dat => date(dat).add(1, "month"))
