import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
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
  defaultValue: -1,
  validator: card => {
    if (card === -1) return "Необходимо выбрать карту"

    return null
  },
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
    return withdrawMoney({ amount: Number(form.amount), card: form.selectedCard })
  },
})

export const $isTopUpLoading = startTopUpFx.pending

const failMessage: Toast = { text: "Не удалось вывести деньги", type: "error" }
forward({
  from: startTopUpFx.failData.map(_ => failMessage),
  to: [toasts.remove, toasts.add],
})

const successMessage: Toast = { text: "Вывод произведен", type: "info" }
forward({
  from: startTopUpFx.doneData.map(_ => successMessage),
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
  source: $fundUpForm,
  target: startTopUpFx,
})

forward({
  from: FundUpModalGate.open,
  to: resetFundUpModal,
})
