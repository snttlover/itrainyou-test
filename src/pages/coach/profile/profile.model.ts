import { $userData } from "@/feature/user/user.model"
import { CoachReviewResponse, getCoachReviews } from "@/lib/api/reviews"
import { createGate } from "@/scope"
import { createEffect, createStore, sample } from "effector-root"

export const $profileData = $userData.map(data => data.coach!)

export const loadReviewsFx = createEffect({
  handler: getCoachReviews,
})

export const $reviews = createStore<CoachReviewResponse[]>([]).on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

export const ProfileGate = createGate()

sample({
  clock: ProfileGate.open,
  source: $profileData,
  fn: data => ({ id: data.id }),
  target: loadReviewsFx,
})
