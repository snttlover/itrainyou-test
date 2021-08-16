import { changeDashboardType, DashboardType } from "@/feature/dashboard/dashboard"
import { changeToken } from "@/lib/network/token"
import { Effect, Event, root, Store } from "effector-root"
import { hydrate } from "effector/fork"
import Cookies from "js-cookie"
import { sessionToken } from "@/feature/user/session-token"
import { Gate } from "effector-react"

type InferEventEffect<T> = T extends Event<infer U> ? U : T extends Effect<infer U, any> ? U : never

export const runInScope = <E extends Event<any> | Effect<any, any, any>>(unit: E, params?: InferEventEffect<E>) =>
  unit(params)

export const getStoreFromScope = <R>(store: Store<R>): R => store.getState()

export const createGate = <T>(defaultState?: T): Gate<T> => {
  const params = {
    defaultState,
    domain: root,
  }
  if (!defaultState) delete params.defaultState
  const effectorCreateGate = require("effector-react").createGate

  // @ts-ignore
  return effectorCreateGate<T>(params)
}

export const restoreState = async () => {
  hydrate(root, { values: window.INITIAL_STATE })

  await runInScope(changeToken, sessionToken.get())
  await runInScope(changeDashboardType, Cookies.get("dashboard") as DashboardType)
}
