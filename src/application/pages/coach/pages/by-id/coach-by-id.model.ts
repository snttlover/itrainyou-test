import { Coach, getCoach } from "@/application/lib/api/coach"
import { CoachReviewResponse, getCoachReviews } from "@/application/lib/api/reviews"
import { serverStarted } from "@/store"
import { createEffect, createEvent, createStore, forward, sample } from "effector-next"
import { genCoachSessions } from "@/application/components/coach-card/select-date/select-date.model"

export const loadCoachFx = createEffect({
  handler: getCoach
})

export const loadReviewsFx = createEffect({
  handler: getCoachReviews
})

export const mounted = createEvent<{ id: number }>()

export const $coach = createStore<Coach | null>(null).on(loadCoachFx.doneData, (state, payload) => payload)
export const $reviews = createStore<CoachReviewResponse[]>([]).on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

export const $sessionsPickerStore = genCoachSessions()
const loadSessions = createEffect({
  handler: (id: number) => $sessionsPickerStore.loadData({ id, params: {} })
})

sample({
  // @ts-ignore
  source: serverStarted.map(({ query }) => query.id),
  clock: loadCoachFx.done,
  target: loadSessions
})

forward({
  // @ts-ignore
  from: [mounted, serverStarted.map(({ query }) => query)],
  to: [loadCoachFx]
})

// Only on client
forward({
  from: mounted,
  to: loadReviewsFx
})
