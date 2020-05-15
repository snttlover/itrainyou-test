import { Coach, getCoach } from "@/application/lib/api/coach"
import { CoachReviewResponse, getCoachReviews } from "@/application/lib/api/reviews"
import { serverStarted } from "@/store"
import { createEffect, createEvent, createStore, forward } from "effector-next"

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
