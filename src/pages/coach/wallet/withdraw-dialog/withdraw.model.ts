import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { startSaveCard } from "@/lib/api/wallet/coach/start-save-card"
import { withdrawMoney } from "@/lib/api/wallet/coach/withdraw-money"
import { createEffectorField } from "@/lib/generators/efffector"
import { InferStoreType } from "@/lib/types/effector"
import { loadCardsFx } from "../cards/cards.model"
import { loadInfoFx } from "../info/info.model"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, forward, guard, restore, sample } from "effector-root"
import { every } from "patronum"

export const FundUpModalGate = createGate()
export const resetFundUpModal = createEvent()
export const submitFundUp = createEvent()

export const changeShowWithdrawDialog = createEvent<boolean>()
export const $isWithdrawDialogShowed = restore(changeShowWithdrawDialog, false)

export const [$card, cardChanged, $cardError] = createEffectorField({
  defaultValue: -2,
  validator: card => {
    if (card === -1) return "Необходимо выбрать карту"

    return null
  },
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

export const $withdrawForm = combine({
  selectedCard: $card,
  amount: $amount,
})

export const $withdrawErrors = combine({
  selectedCard: $cardError,
  amount: $amountError,
})

export const $canSubmit = combine($withdrawForm, $withdrawErrors, (form, errors) => {
  if (form.selectedCard === -2) return true

  return Object.values(errors).every(value => value === null)
})

const startWithdrawFx = createEffect({
  handler: async (form: InferStoreType<typeof $withdrawForm>) => {
    if (form.selectedCard === -2) {
      const response = await startSaveCard()
      localStorage.setItem("saved_withdraw_id", response.paymentId)
      localStorage.setItem("try_save_card", String(true))
      window.location.href = response.confirmationUrl

      return response
    } else {
      return withdrawMoney({ amount: Number(form.amount), card: form.selectedCard })
    }
  },
})

export const $isTopUpLoading = startWithdrawFx.pending

const failMessage: Toast = { text: '', type: "error" }
forward({
  from: startWithdrawFx.failData.map(error => {
    failMessage.text = (error as any)?.response.data.non_field_errors.toString() || "Не удалось вывести деньги"
    return failMessage
  }),
  to: [toasts.remove, toasts.add],
})

const successMessage: Toast = { text: "Вывод произведен", type: "info" }
forward({
  from: startWithdrawFx.doneData.map(_ => successMessage),
  to: [
    toasts.remove,
    toasts.add,
    changeShowWithdrawDialog.prepend(_ => false),
    resetFundUpModal.prepend(_ => {}),
    loadInfoFx.prepend(() => {}),
    loadCardsFx.prepend(() => {}),
  ],
})

sample({
  clock: guard({ source: submitFundUp, filter: $canSubmit }),
  source: $withdrawForm,
  target: startWithdrawFx,
})

forward({
  from: FundUpModalGate.open,
  to: resetFundUpModal,
})
