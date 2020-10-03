import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { finishSaveCard } from "@/lib/api/wallet/coach/finish-save-card"
import { parseQueryString } from "@/lib/helpers/query"
import { loadCardsFx } from "@/pages/coach/wallet/cards/cards.model"
import { loadInfoFx } from "@/pages/coach/wallet/info/info.model"
import { createGate } from "@/scope"
import { createEffect, forward, split } from "effector"

export const ConfirmationGate = createGate()

const CANCEL_CONFIRM_CODE = -1
const CONFIRM_SAVE_CARD = -2

const confirmFx = createEffect({
  handler: async () => {
    const paymentIdInLS = localStorage.getItem("saved_withdraw_id")
    const paymentIdFromQuery = parseQueryString<{ payment_id?: string }>(location.search).payment_id

    const paymentId = paymentIdFromQuery || paymentIdInLS
    const isSaveCard = JSON.parse(localStorage.getItem("try_save_card") || "false")

    if (paymentId && isSaveCard) {
      await finishSaveCard({ paymentId })
      localStorage.removeItem("saved_withdraw_id")
      localStorage.removeItem("try_save_card")

      return CONFIRM_SAVE_CARD
    }

    return CANCEL_CONFIRM_CODE
  },
})

const { __: confirmFinishedSuccess, saveCard } = split(confirmFx.doneData, {
  canceled: data => data === CANCEL_CONFIRM_CODE,
  saveCard: data => data === CONFIRM_SAVE_CARD,
})

const successConfirmToast: Toast = { type: "info", text: "Кошелек пополнен" }
forward({
  from: confirmFinishedSuccess.map(_ => successConfirmToast),
  to: [toasts.remove, toasts.add, loadInfoFx.prepend(() => {}), loadCardsFx.prepend(() => {})],
})

const cardSavedToast: Toast = { type: "info", text: "Карта сохранена, теперь вы можете вывести" }
forward({
  from: saveCard.map(_ => cardSavedToast),
  to: [toasts.remove, toasts.add, loadInfoFx.prepend(() => {}), loadCardsFx.prepend(() => {})],
})

forward({
  from: ConfirmationGate.open,
  to: confirmFx,
})
