import { createEffect, createEvent, restore } from "effector-root"
import { Toast } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { startSaveClientCard, StartSaveClientCardParams } from "@/lib/api/wallet/client/start-save-card"
import { startSaveCoachCard, StartSaveCoachCardParams  } from "@/lib/api/wallet/coach/start-save-card"
import { finishSaveClientCard } from "@/lib/api/wallet/client/finish-save-card"
import { finishSaveCoachCard } from "@/lib/api/wallet/coach/finish-save-card"

export const PAYMENT_KEY = "payment_id"
export const addCard = createEvent<number | void>()

export const changeShowFundUpDialog = createEvent<boolean>()

export const setRedirectUrl = createEvent<string>()

export const $redirectUrl = restore(setRedirectUrl, "")

export const loadSessionsIdFx = createEffect({
  handler: (cardId: number) => {
    const sessionsId = localStorage.getItem("sessions")
    if (!sessionsId) return { sessions: null, card: cardId }
    return { sessions: JSON.parse(sessionsId), card: cardId }
  }
})

export const startSaveClientCardFx = createEffect({
  handler: (params: StartSaveClientCardParams) => startSaveClientCard({returnUrl: params.returnUrl, coach: params.coach})
})

export const startSaveCoachCardFx = createEffect({
  handler: (params: StartSaveCoachCardParams) => startSaveCoachCard({returnUrl: params.returnUrl})
})

export const getPaymentIdFx = createEffect({
  handler: () => {
    const stringData = localStorage.getItem(PAYMENT_KEY)
    return JSON.parse(stringData!)
  }
})

export const deletePaymentIdFx = createEffect({
  handler: () => {
    localStorage.removeItem(PAYMENT_KEY)
  }
})

export const finishSaveClientCardFx = createEffect({
  handler: (params: {
      type: "coach" | "client"
      paymentId: string
  }) => finishSaveClientCard({ paymentId: params.paymentId })
})

export const finishSaveCoachCardFx = createEffect({
  handler: (params: {
        type: "coach" | "client"
        paymentId: string
    }) => finishSaveCoachCard({ paymentId: params.paymentId })
})

// @ts-ignore
export const unsuccessfulAddedCard: Toast = { text: "Не удалось привязать карту", type: "error" }
// @ts-ignore
export const successfulAddedCard: Toast = { text: "Карта успешно привязана", type: "info" }
