import { $coachAccess, loadUserDataFx } from "@/application/feature/user/user.model"
import { updateRegistrationApplication } from "@/application/lib/api/coach/update-registration-application"
import { InferStoreType } from "@/application/lib/types/effector"
import dayjs from "dayjs"
import { combine, createEffect, createEvent, createStore, forward } from "effector"

type CoachState =
  | "approved"
  | "forever-rejected"
  | "approve-wait"
  | "temporary-rejected-wait"
  | "temporary-rejected-done"
  | "profile-fill"

export const updateTime = createEvent()

const $now = createStore(dayjs()).on(updateTime, () => dayjs())
export const $lastRegistrationDaytime = $coachAccess.map(access => dayjs(access.lastRegistrationApplyDatetime))

export const $datetimeLeft = combine({ now: $now, lastRegistrationDaytime: $lastRegistrationDaytime }).map(
  ({ now, lastRegistrationDaytime }) => {
    const diffInMs = now.diff(lastRegistrationDaytime, "millisecond", true)
    return {
      days: 90 - Math.ceil(now.diff(lastRegistrationDaytime, "day", true)),
      hours: 23 - dayjs(diffInMs).hour(),
      minutes: 59 - dayjs(diffInMs).minute(),
      seconds: 59 - dayjs(diffInMs).second(),
    }
  }
)

const getCoachState = ({
  access,
  datetimeLeft,
}: {
  access: InferStoreType<typeof $coachAccess>
  datetimeLeft: InferStoreType<typeof $datetimeLeft>
}): CoachState => {
  if (access.isApproved) return "approved"
  if (access.isForeverRejected) return "forever-rejected"
  if (access.isTemporarilyRejected && datetimeLeft.days > 0) return "temporary-rejected-wait"
  if (access.isTemporarilyRejected && datetimeLeft.days <= 0) return "temporary-rejected-done"
  if (access.isProfileFilled) return "approve-wait"

  return "profile-fill"
}

export const $coachHomeState = combine({
  access: $coachAccess,
  datetimeLeft: $datetimeLeft,
}).map(getCoachState)

export const updateRegistrationFx = createEffect({
  handler: updateRegistrationApplication,
})

forward({ from: updateRegistrationFx.done, to: loadUserDataFx })
