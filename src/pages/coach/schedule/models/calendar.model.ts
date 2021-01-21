import { date } from "@/lib/formatting/date"
import { Dayjs } from "dayjs"
import { createEvent, restore } from "effector-root"

export const setCurrentMonth = createEvent<Dayjs>()
export const changeDate = createEvent<Dayjs>()

export const $currentMonth = restore(setCurrentMonth, date()).on(changeDate, (_, payload) => payload)
export const $monthStartDate = $currentMonth.map(dat => date(dat).date(1))
export const $monthEndDate = $monthStartDate.map(dat => date(dat).add(1, "month"))


$currentMonth.watch(month => console.log("currentMonth", month))
$monthStartDate.watch(month => console.log("MonthstartDate", month))
$monthEndDate.watch(month => console.log("MonthEndDate", month))

