import { createEffect, createEvent, createStore, forward } from "effector-root"
import cookie from "js-cookie"

export type DashboardType = "client" | "coach"

export const changeDashboardType = createEvent<DashboardType>()

const saveDashboardTypeFx = createEffect({
  handler: (type: DashboardType) => cookie.set("dashboard", type, { expires: 1000 }),
})

export const $dashboard = createStore<DashboardType>("client").on(changeDashboardType, (_, type) => type)

forward({
  from: $dashboard.updates,
  to: saveDashboardTypeFx,
})
