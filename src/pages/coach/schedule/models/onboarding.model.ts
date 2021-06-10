import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { DurationType } from "@/lib/api/coach-sessions"
import { createSession } from "@/lib/api/coaching-sessions/create-session"
import { date } from "@/lib/formatting/date"
import { $showedSessions, sessionAdded } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, restore, sample } from "effector-root"
import { $prices } from "@/pages/coach/schedule/models/price-settings/units"
import { changeFilterView } from "@/pages/coach/schedule/models/sessions.model"

export const showOnBoarding = createEvent<void | boolean>()
export const $onBoardingvisibility = createStore<boolean>(false).on(
  showOnBoarding,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })