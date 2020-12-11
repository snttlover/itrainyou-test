import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { startTopUp } from "@/lib/api/wallet/client/start-top-up"
import { startSaveCard, StartSaveCardParams, StartSaveCardResponse } from "@/lib/api/wallet/client/start-save-card"
import { finishSaveCard, FinishSaveCardRequest, FinishSaveCardResponse } from "@/lib/api/wallet/client/finish-save-card"
import { startTopUpWithCard } from "@/lib/api/wallet/client/start-top-up-with-saved-card"
import { transferToClientWallet } from "@/lib/api/wallet/coach/transfer-to-client-wallet"
import { createEffectorField } from "@/lib/generators/efffector"
import { isAxiosError } from "@/lib/network/network"
import { InferStoreType } from "@/lib/types/effector"
import { $userHasCoach } from "@/pages/client/profile/content/coach-button/profile-coach-button"
import { loadCardsFx } from "@/pages/client/wallet/cards/cards.model"
import { loadInfoFx } from "@/pages/client/wallet/info/info.model"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, forward, guard, restore, sample, split, attach } from "effector-root"
import { every } from "patronum"
import { mounted } from "@/pages/search/coach-by-id/coach-by-id.model"
import { mounted as homeMounted } from "@/pages/client/home/home.model.ts"
import { routeNames } from "@/pages/route-names"

export const FundUpModalGate = createGate()
export const ClientProfileGate = createGate()
export const resetFundUpModal = createEvent()
export const submitFundUp = createEvent()
export const addCard = createEvent()

export const changeShowFundUpDialog = createEvent<boolean>()
export const setRedirectUrl = createEvent<string>()

export const $redirectUrl = restore(setRedirectUrl, "")
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
  redirectUrl: $redirectUrl,
})

export const $fundUpErrors = combine({
  selectedCard: $cardError,
  amount: $amountError,
})

export const $canSubmit = every({ predicate: true, stores: [$isAmountCorrect] })

const startSaveCardFx = createEffect({
  handler: (returnUrl:string ) =>
    startSaveCard({returnUrl: `${window.location.protocol}//${window.location.hostname}${returnUrl}`})
})

const getPaymentIdFx = createEffect({
  handler: () => {
    const paymentId = localStorage.getItem("payment_id")
    return paymentId
  }
})

const deletePaymentIdFx = createEffect({
  handler: () => {
    localStorage.removeItem("payment_id")
  }
})

export const finishSaveCardFx = createEffect({
  handler: async () => {
    const paymentId = localStorage.getItem("payment_id")!
    const response:FinishSaveCardResponse = await finishSaveCard({paymentId})
    return response
  }
})

const startTopUpFx = createEffect({
  handler: async (form: InferStoreType<typeof $fundUpForm>) => {
    if (form.type === "coach") {
      return transferToClientWallet({ amount: Number(form.amount) })
    } else if (form.selectedCard === -1) {
      const response = await startTopUp({
        amount: Number(form.amount),
        saveCard: form.saveCard,
        returnUrl: !form.redirectUrl
          ? undefined
          : `${window.location.protocol}//${window.location.hostname}${form.redirectUrl}`,
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

const { failedTopUpFromCoach, failedTopUpWithCard, __: failedTopUpUnknown } = split(startTopUpFx.fail, {
  failedTopUpFromCoach: ({ params, error }) =>
    params.type === "coach" && isAxiosError(error) && error.response?.status === 400,
  failedTopUpWithCard: ({ params, error }) =>
    params.type === "card" && isAxiosError(error) && error.response?.status === 400,
})

const coachFailMessage: Toast = { text: "Недостаточно средств на кошельке коуча", type: "error" }
forward({
  from: failedTopUpFromCoach.map(_ => coachFailMessage),
  to: [toasts.remove, toasts.add],
})

const failCardMessage: Toast = { text: "Не удалось запустить процесс пополнения", type: "error" }
forward({
  from: failedTopUpWithCard.map(_ => failCardMessage),
  to: [toasts.remove, toasts.add],
})

const failMessageUnknown: Toast = { text: "Неизвестная ошибка, попробуйте еще раз позже", type: "error" }
forward({
  from: failedTopUpUnknown.map(_ => failMessageUnknown),
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

const unsuccessfullAddedCard: Toast  = { text: "Не удалось привязать карту", type: "error" }
forward({
  from: finishSaveCardFx.fail.map(({params,error}) => unsuccessfullAddedCard),
  to: [
    toasts.remove,
    toasts.add,
    deletePaymentIdFx.prepend(() => {}),
  ],
})

const successfullAddedCard: Toast = { text: "Карта добавлена", type: "info" }
forward({
  from: finishSaveCardFx.doneData.map(_ => successfullAddedCard),
  to: [
    toasts.remove,
    toasts.add,
    loadInfoFx.prepend(() => {}),
    loadCardsFx.prepend(() => {}),
    deletePaymentIdFx.prepend(() => {}),
  ],
})

startSaveCardFx.doneData.watch((response) => {
  localStorage.setItem("payment_id", response.paymentId)
  window.location.href = response.confirmationUrl
  return
})

forward({
  from: [ClientProfileGate.open, mounted, homeMounted],
  to: getPaymentIdFx,
})

forward({
  from: [ClientProfileGate.open.map(() => routeNames.clientProfile()),
    mounted.map((id)=> routeNames.searchCoachPage(id.id.toString())),
    homeMounted.map(() => routeNames.client()),
  ],
  to: setRedirectUrl,
})

guard({
  source: getPaymentIdFx.doneData,
  filter: paymentId => paymentId !== null,
  target: finishSaveCardFx,
})

sample({
  clock: addCard,
  source: $redirectUrl,
  target: startSaveCardFx,
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
