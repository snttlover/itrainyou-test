import { changeToken, TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { Effect, Event, root } from "effector-root"
import { createGate as createEffectorGate } from "effector-react"
import { allSettled, fork, hydrate, Scope } from "effector/fork"
import Cookies from "js-cookie"

type InferEventEffect<T> = T extends Event<infer U> ? U : T extends Effect<infer U, any> ? U : never

let scope: Scope

export const runInScope = <E extends Event<any> | Effect<any, any, any>>(unit: E, params?: InferEventEffect<E>) =>
  allSettled(unit, { scope, params })

export const createGate = <T>(defaultState?: T) => {
  const params = {
    defaultState,
    domain: root,
  }
  if (!defaultState) delete params.defaultState
  return createEffectorGate<T>(params)
}

export const restoreState = async () => {
  hydrate(root, { values: window.INITIAL_STATE })
  scope = fork(root)

  await runInScope(changeToken, Cookies.get(TOKEN_COOKIE_KEY))

  return scope
}
