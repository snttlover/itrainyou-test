import { combine, createEffect, createEvent, restore } from "effector-root"
import { Toast } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { startSaveCard, StartSaveCardParams } from "@/lib/api/wallet/client/start-save-card"
import { finishSaveCard } from "@/lib/api/wallet/client/finish-save-card"

export const submitFundUp = createEvent()

export const addCard = createEvent<number>()

export const changeShowFundUpDialog = createEvent<boolean>()

export const setRedirectUrl = createEvent<string>()

export const $redirectUrl = restore(setRedirectUrl, "")

export const $isFundUpDialogShowed = restore(changeShowFundUpDialog, false)

export const loadSessionsIdFx = createEffect({
  handler: (cardId: number) => {
    const sessionsId = localStorage.getItem("sessions")
    if (!sessionsId) return { sessions: null, card: cardId }
    return { sessions: JSON.parse(sessionsId), card: cardId }
  }
})

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
