import { Coach, getCoach } from "@/lib/api/coach"
import { CoachReviewResponse, getCoachReviews } from "@/lib/api/reviews"
import { createGate, runInScope } from "@/scope"
import { createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { genCoachSessions } from "@/components/coach-card/select-date/select-date.model"
import { DurationType } from "@/lib/api/coach-sessions"

export const loadCoachFx = createEffect({
  handler: getCoach,
})

export const loadReviewsFx = createEffect({
  handler: getCoachReviews,
})

export const coachByIdGate = createGate()
export const mounted = createEvent<{ id: number }>()

export const $coach = createStore<Coach | null>(null)
  .on(loadCoachFx.doneData, (state, payload) => payload)
  .reset(coachByIdGate.close)

export const $reviews = createStore<CoachReviewResponse[]>([]).on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

export const $sessionsPickerStore = genCoachSessions()

const changeCoachSessionCoachId = $sessionsPickerStore.changeId.prepend<Coach>(coach => coach.id)
const changeCoachSessionDurationTab = $sessionsPickerStore.tabs.changeDurationTab.prepend<Coach>(
  coach => Object.keys(coach.prices).find(key => !!coach[key]) as DurationType
)

forward({
  from: loadCoachFx.doneData,
  to: [changeCoachSessionCoachId, changeCoachSessionDurationTab],
})

forward({
  from: mounted,
  to: [loadCoachFx, loadReviewsFx],
})
