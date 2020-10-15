import { changeDashboardType, DashboardType } from "@/feature/dashboard/dashboard"
import { loadUserData } from "@/feature/user/user.model"
import { changeToken, TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { Effect, Event, root, Store } from "effector-root"
import { hydrate } from "effector/fork"
import Cookies from "js-cookie"

type InferEventEffect<T> = T extends Event<infer U> ? U : T extends Effect<infer U, any> ? U : never

export const runInScope = <E extends Event<any> | Effect<any, any, any>>(unit: E, params?: InferEventEffect<E>) =>
  unit(params)

export const getStoreFromScope = <R>(store: Store<R>): R => store.getState()

export const createGate = <T>(defaultState?: T) => {
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

  await runInScope(changeToken, Cookies.get(TOKEN_COOKIE_KEY))
  await runInScope(changeDashboardType, Cookies.get("dashboard") as DashboardType)
  await runInScope(loadUserData)
}
