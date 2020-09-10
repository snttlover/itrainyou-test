import { getWallet } from "@/lib/api/wallet/coach/get-wallet"
import { createGate } from "@/scope"
import { createEffect, createStore, forward } from "effector-root"

export const InfoTabGate = createGate()

export const loadInfoFx = createEffect({
  handler: getWallet,
})

forward({
  from: InfoTabGate.open,
  to: loadInfoFx,
})

export const $isLoading = loadInfoFx.pending

export const $amount = createStore(0).on(loadInfoFx.doneData, (_, { amount }) => Number(amount))
export const $frozenAmount = createStore(0).on(loadInfoFx.doneData, (_, { frozenAmount }) => Number(frozenAmount))
export const $totalAmount = createStore(0).on(loadInfoFx.doneData, (_, { totalAmount }) => Number(totalAmount))
