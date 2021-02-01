import { every } from "patronum"
import { combine, createEffect, createEvent, restore } from "effector-root"
import { Toast } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { startSaveCard, StartSaveCardParams } from "@/lib/api/wallet/client/start-save-card"
import { createGate } from "@/scope"
import { finishSaveCard } from "@/lib/api/wallet/client/finish-save-card"
import { InferStoreType } from "@/lib/types/effector"
import { transferToClientWallet } from "@/lib/api/wallet/coach/transfer-to-client-wallet"
import { startTopUp } from "@/lib/api/wallet/client/start-top-up"
import { startTopUpWithCard } from "@/lib/api/wallet/client/start-top-up-with-saved-card"
import { createEffectorField } from "@/lib/generators/efffector"

export const FundUpModalGate = createGate()

export const resetFundUpModal = createEvent()

export const submitFundUp = createEvent()

export const addCard = createEvent<number>()

export const changeShowFundUpDialog = createEvent<boolean>()

export const setRedirectUrl = createEvent<string>()

export const $redirectUrl = restore(setRedirectUrl, "")

export const $isFundUpDialogShowed = restore(changeShowFundUpDialog, false)

export const changeType = createEvent<"card" | "coach">()

export const $currentType = restore(changeType, "card")

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
  redirectUrl: $redirectUrl,
})

export const $fundUpErrors = combine({
  selectedCard: $cardError,
  amount: $amountError,
})

export const $canSubmit = every({ predicate: true, stores: [$isAmountCorrect] })
export const loadSessionsIdFx = createEffect({
  handler: (cardId: number) => {
    const sessionsId = localStorage.getItem("sessions")
    if (!sessionsId) return { sessions: null, card: cardId }
    return { sessions: JSON.parse(sessionsId), card: cardId }
  }
})

const SessionsId = restore(loadSessionsIdFx.doneData, null)

export const startSaveCardFx = createEffect({
  handler: (params: StartSaveCardParams) =>
    startSaveCard(params)
})

export const getPaymentIdFx = createEffect({
  handler: () => {
    return localStorage.getItem("payment_id")
  }
})

export const deletePaymentIdFx = createEffect({
  handler: () => {
    localStorage.removeItem("payment_id")
  }
})

export const finishSaveCardFx = createEffect({
  handler: async () => {
    const paymentId = localStorage.getItem("payment_id")!
    return await finishSaveCard({ paymentId })
  }
})

export const startTopUpFx = createEffect({
  handler: async (form: InferStoreType<typeof $fundUpForm>) => {
    if (form.type === "coach") {
      return transferToClientWallet({ amount: Number(form.amount) })
    } else if (form.selectedCard === -1) {
      const response = await startTopUp({
        amount: Number(form.amount),
        saveCard: form.saveCard,
        returnUrl: !form.redirectUrl
          ? undefined
          : `${window.location.protocol}//${window.location.hostname}:${window.location.port}${form.redirectUrl}`,
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

// @ts-ignore
export const coachFailMessage: Toast = { text: "Недостаточно средств на кошельке коуча", type: "error" }
// @ts-ignore
export const failCardMessage: Toast = { text: "Не удалось запустить процесс пополнения", type: "error" }
// @ts-ignore
export const failMessageUnknown: Toast = { text: "Неизвестная ошибка, попробуйте еще раз позже", type: "error" }
// @ts-ignore
export const successMessage: Toast = { text: "Кошелек пополнен", type: "info" }
// @ts-ignore
export const unsuccessfulAddedCard: Toast = { text: "Не удалось привязать карту", type: "error" }
// @ts-ignore
export const successfulAddedCard: Toast = { text: "Карта успешно привязана", type: "info" }
