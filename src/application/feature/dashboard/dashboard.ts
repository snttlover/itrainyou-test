import { createEffect, createEvent, forward, restore } from "effector-next"

export type DashboardType = "client" | "coach"

export const changeDashboardType = createEvent<DashboardType>()
export const loadDashboardType = createEvent()

const saveDashboardTypeFx = createEffect({
  handler: (type: DashboardType) => {
    localStorage.setItem("dashboard", type)
  },
})

const loadDashboardTypeFx = createEffect({
  handler: () => {
    return localStorage.getItem("dashboard") as DashboardType
  },
})

export const $dashboard = restore(changeDashboardType, "client")

forward({
  from: $dashboard.updates,
  to: saveDashboardTypeFx,
})

forward({
  from: loadDashboardType,
  to: loadDashboardTypeFx,
})

forward({
  from: loadDashboardTypeFx.doneData,
  to: changeDashboardType,
})
