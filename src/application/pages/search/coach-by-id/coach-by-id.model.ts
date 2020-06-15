import { Coach, getCoach } from "@/application/lib/api/coach"
import { CoachReviewResponse, getCoachReviews } from "@/application/lib/api/reviews"
import { createEffect, createEvent, createStore, forward, sample } from "effector-next"
import { genCoachSessions } from "@/application/components/coach-card/select-date/select-date.model"
import { DurationType } from "@/application/lib/api/coach-sessions"

export const loadCoachFx = createEffect({
  handler: getCoach,
})

export const loadReviewsFx = createEffect({
  handler: getCoachReviews,
})

export const mounted = createEvent<{ id: number }>()

export const $coach = createStore<Coach | null>(null).on(loadCoachFx.doneData, (state, payload) => payload)
export const $reviews = createStore<CoachReviewResponse[]>([]).on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

export const $sessionsPickerStore = genCoachSessions()
const loadSessions = createEffect({
  handler: (coach: Coach) => {
    $sessionsPickerStore.changeId(coach.id)
    // @ts-ignore
    const defaultTab = Object.keys(coach.prices).find(key => !!coach[key]) as DurationType
    $sessionsPickerStore.tabs.changeDurationTab(defaultTab)
  },
})

sample({
  source: loadCoachFx.doneData,
  target: loadSessions,
})

forward({
  from: mounted,
  to: [loadCoachFx, loadReviewsFx],
})
