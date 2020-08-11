import { combine, createEffect, createEvent, forward, restore, sample } from "effector-root"
import { createClientReview } from "@/lib/api/client/create-review"
import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { loadUserData } from "@/feature/user/user.model"

export const revocationFx = createEffect({
  handler: createClientReview,
})

export const resetRevocation = createEvent()

export const changeRation = createEvent<number>()
export const $rating = restore(changeRation, 0).reset(resetRevocation)

export const changeRevocationSessionId = createEvent<number>()
const $revocationSessionId = restore(changeRevocationSessionId, 0)

export const changeRevocationResume = createEvent<string>()
export const $resume = restore(changeRevocationResume, ``).reset(resetRevocation)

export const changeRevocationVisibility = createEvent<boolean>()
export const $revocationVisibility = restore(changeRevocationVisibility, false).reset(resetRevocation)

export const sendReview = createEvent()

forward({
  from: changeRevocationSessionId.map(() => true),
  to: changeRevocationVisibility
})

forward({
  from: revocationFx.finally.map(() => false),
  to: changeRevocationVisibility
})

const successToast: Toast = { type: "info", text: "Отзыв отправлен" }
forward({
  from: revocationFx.doneData,
  to: [toasts.remove.prepend(() => successToast), toasts.add.prepend(() => successToast), loadUserData],
})

const failToast: Toast = { type: "error", text: "Произошла ошибка, попробуйте еще раз позже" }
forward({
  from: revocationFx.failData,
  to: [toasts.remove.prepend(() => failToast), toasts.add.prepend(() => failToast)],
})

const $form = combine($rating, $resume, $revocationSessionId, (grade, text, session) => ({ text, grade, session }))

sample({
  source: $form,
  clock: sendReview,
  target: revocationFx,
})
