import { loadScheduleFx } from "@/pages/coach/schedule/models/schedule.model"
import { createStore } from "effector"

export const sessions = createStore([]).on(loadScheduleFx.doneData, (_, data) => data.weekdaySlots)
