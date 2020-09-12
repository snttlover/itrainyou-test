import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { startTopUp } from "@/lib/api/wallet/client/start-top-up"
import { startTopUpWithCard } from "@/lib/api/wallet/client/start-top-up-with-saved-card"
import { transferToClientWallet } from "@/lib/api/wallet/coach/transfer-to-client-wallet"
import { createEffectorField } from "@/lib/generators/efffector"
import { InferStoreType } from "@/lib/types/effector"
import { $userHasCoach } from "@/pages/client/profile/content/coach-button/profile-coach-button"
import { loadCardsFx } from "@/pages/client/wallet/cards/cards.model"
import { loadInfoFx } from "@/pages/client/wallet/info/info.model"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, forward, guard, restore, sample } from "effector-root"
import { every } from "patronum"

export const FundUpModalGate = createGate()
export const resetFundUpModal = createEvent()
export const submitFundUp = createEvent()

export const changeShowFundUpDialog = createEvent<boolean>()
export const $isFundUpDialogShowed = restore(changeShowFundUpDialog, false)

export const changeType = createEvent<"card" | "coach">()
export const $currentType = restore(changeType, "card")

sample({
  clock: FundUpModalGate.open,
  source: $userHasCoach,
})

export const [$card, cardChanged, $cardError] = createEffectorField({
  defaultValue: -1,
  reset: resetFundUpModal,
})

export const [$saveCard, saveCardChanged] = createEffectorField({
  defaultValue: false,
  reset: resetFundUpModal,
})

export const [$amount, amountChanged, $amountError, $isAmountCorrect] = createEffectorField({
  defaultValue: "",
  eventMapper: changeEvent => changeEvent.map(amount => amount.trim()),
  validator: amount => {
    const parsedAmount = Number(amount)
    if (Number.isNaN(parsedAmount)) return "Введите число"
    else if (parsedAmount < 50) return "Минимальная сумма - 50 ₽"
    return null
  },
  reset: resetFundUpModal,
})

export const $fundUpForm = combine({
  type: $currentType,
  selectedCard: $card,
  amount: $amount,
  saveCard: $saveCard,
})

export const $fundUpErrors = combine({
  selectedCard: $cardError,
  amount: $amountError,
})

export const $canSubmit = every(true, [$isAmountCorrect])

const startTopUpFx = createEffect({
  handler: async (form: InferStoreType<typeof $fundUpForm>) => {
    if (form.type === "coach") {
      return transferToClientWallet({ amount: Number(form.amount) })
    } else if (form.selectedCard === -1) {
      const response = await startTopUp({
        amount: Number(form.amount),
        saveCard: form.saveCard,
      })
      localStorage.setItem("saved_payment_id", response.paymentId)
      window.location.href = response.confirmationUrl

      return response
    } else {
      const response = await startTopUpWithCard({
        id: form.selectedCard,
        amount: Number(form.amount),
      })

      if (response.confirmationUrl) {
        localStorage.setItem("saved_payment_id", response.paymentId)
        window.location.href = response.confirmationUrl

        return response
      }
      return response
    }
  },
})

export const $isTopUpLoading = startTopUpFx.pending

const failMessage: Toast = { text: "Не удалось пополнить кошелек", type: "error" }
forward({
  from: startTopUpFx.failData.map(_ => failMessage),
  to: [toasts.remove, toasts.add],
})

const successMessage: Toast = { text: "Кошелек пополнен", type: "info" }
forward({
  from: startTopUpFx.doneData.map(_ => successMessage),
  to: [
    toasts.remove,
    toasts.add,
    changeShowFundUpDialog.prepend(_ => false),
    resetFundUpModal.prepend(_ => {}),
    loadInfoFx.prepend(() => {}),
    loadCardsFx.prepend(() => {}),
  ],
})

sample({
  clock: guard({ source: submitFundUp, filter: $canSubmit }),
  source: $fundUpForm,
  target: startTopUpFx,
})

forward({
  from: FundUpModalGate.open,
  to: resetFundUpModal,
})
