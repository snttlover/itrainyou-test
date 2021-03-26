import { $coachAccess, loadUserData } from "@/feature/user/user.model"
import { updateRegistrationApplication } from "@/lib/api/coach/update-registration-application"
import { yandexRegistrationCompleted } from "@/lib/api/coach/yandexRegistrationCompleted"
import { date } from "@/lib/formatting/date"
import { InferStoreType } from "@/lib/types/effector"
import { combine, createEffect, createEvent, createStore, forward } from "effector-root"

type CoachState =
  | "approved"
  | "forever-rejected"
  | "approve-wait"
  | "temporary-rejected-wait"
  | "temporary-rejected-done"
  | "profile-fill"
  | "yandex-kassa-not-approved"
  | "yandex-kassa-completed"
  | "tinkoff"

export const updateTime = createEvent()

const $now = createStore(date()).on(updateTime, () => date())
export const $lastRegistrationDaytime = $coachAccess.map(access => date(access.lastRegistrationApplyDatetime))

export const $datetimeLeft = combine({ now: $now, lastRegistrationDaytime: $lastRegistrationDaytime }).map(
  ({ now, lastRegistrationDaytime }) => {
    const diffInMs = date(now).diff(lastRegistrationDaytime, "millisecond", true)
    return {
      days: 90 - Math.ceil(date(now).diff(lastRegistrationDaytime, "day", true)),
      hours: 23 - date.utc(diffInMs).hour(),
      minutes: 59 - date.utc(diffInMs).minute(),
      seconds: 59 - date.utc(diffInMs).second(),
    }
  }
)

export const toggleAddTinkoffCardModal = createEvent<void | boolean>()
export const $addTinkoffCardModalVisibility = createStore<boolean>(false).on(
  toggleAddTinkoffCardModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })

const getCoachState = ({
  access,
  datetimeLeft,
}: {
  access: InferStoreType<typeof $coachAccess>
  datetimeLeft: InferStoreType<typeof $datetimeLeft>
}): CoachState => {
  if (access.isApproved) return "approved"
  if (!access.isApproved && access.isApplicationApproved && access.isYandexRegistrationCompleted && access.paymentSystem === "YOU_KASSA") return "yandex-kassa-completed"
  if (!access.isApproved && access.isApplicationApproved && !access.isYandexRegistrationApproved && access.paymentSystem === "YOU_KASSA") return "yandex-kassa-not-approved"
  if (access.isForeverRejected) return "forever-rejected"
  if (access.isTemporarilyRejected && datetimeLeft.days > 0) return "temporary-rejected-wait"
  if (access.isTemporarilyRejected && datetimeLeft.days <= 0) return "temporary-rejected-done"
  if (!access.isApproved && access.isProfileFilled && access.isApplicationApproved && access.paymentSystem === "TINKOFF") return "tinkoff"
  if (access.isProfileFilled && !access.isApplicationApproved) return "approve-wait"

  return "profile-fill"
}

export const $coachHomeState = combine({
  access: $coachAccess,
  datetimeLeft: $datetimeLeft,
}).map(getCoachState)

export const updateRegistrationFx = createEffect({
  handler: updateRegistrationApplication,
})

export const yandexRegistrationCompletedFx = createEffect({
  handler: yandexRegistrationCompleted,
})

forward({
  from: yandexRegistrationCompletedFx.done,
  to: loadUserData,
})

forward({ from: updateRegistrationFx.done, to: loadUserData })
