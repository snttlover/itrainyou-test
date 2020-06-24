import { Coach, getCoach } from "@/lib/api/coach"
import { CoachReviewResponse, getCoachReviews } from "@/lib/api/reviews"
import { createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { genCoachSessions } from "@/components/coach-card/select-date/select-date.model"
import { DurationType } from "@/lib/api/coach-sessions"

export const loadCoachFx = createEffect({
  handler: getCoach,
})

export const loadReviewsFx = createEffect({
  handler: getCoachReviews,
})

export const mounted = createEvent<{ id: number }>()

export const $coach = createStore<Coach | null>(null)
  .on(mounted, () => null)
  .on(loadCoachFx.doneData, (state, payload) => payload)

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

mounted.watch(console.log)

forward({
  from: mounted,
  to: [loadCoachFx, loadReviewsFx],
})
