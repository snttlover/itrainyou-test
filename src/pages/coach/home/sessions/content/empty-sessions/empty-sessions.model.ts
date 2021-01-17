import { createStore } from "effector-root"
import { getMyUserFx } from "@/lib/api/users/get-my-user"

export const $coachStore = createStore(false).on(getMyUserFx.doneData, (state, {data}: any) => {
  return !!data?.coach?.schedule?.weekday_slots
})
