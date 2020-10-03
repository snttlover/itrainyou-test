import { Toast, toasts } from "#/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { finishTopUp } from "#/lib/api/wallet/client/finish-top-up"
import { parseQueryString } from "#/lib/helpers/query"
import { loadCardsFx } from "#/pages/client/wallet/cards/cards.model"
import { loadInfoFx } from "#/pages/client/wallet/info/info.model"
import { createGate } from "#/scope"
import { createEffect, forward, split } from "effector"

export const ConfirmationGate = createGate()

const CANCEL_CONFIRM_CODE = -1

const confirmFx = createEffect({
  handler: async () => {
    const paymentIdInLS = localStorage.getItem("saved_payment_id")
    const paymentIdFromQuery = parseQueryString<{ payment_id?: string }>(location.search).payment_id

    const paymentId = paymentIdFromQuery || paymentIdInLS

    if (paymentId) {
      const response = await finishTopUp({ paymentId })
      localStorage.removeItem("saved_payment_id")

      return response
    }

    return CANCEL_CONFIRM_CODE
  },
})

const { __: confirmFinishedSuccess } = split(confirmFx.doneData, {
  canceled: data => data === CANCEL_CONFIRM_CODE,
})

const successConfirmToast: Toast = { type: "info", text: "Кошелек пополнен" }
forward({
  from: confirmFinishedSuccess.map(_ => successConfirmToast),
  to: [toasts.remove, toasts.add, loadInfoFx.prepend(() => {}), loadCardsFx.prepend(() => {})],
})

forward({
  from: ConfirmationGate.open,
  to: confirmFx,
})
