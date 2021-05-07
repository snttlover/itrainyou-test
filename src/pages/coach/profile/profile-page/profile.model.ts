import { genCoachSessions } from "@/oldcomponents/coach-card/select-date/select-date.model"
import { $userData, loadUserData } from "@/feature/user/user.model"
import { DurationType } from "@/lib/api/coach-sessions"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { CoachReviewResponse, getCoachReviews } from "@/lib/api/reviews"
import { createGate } from "@/scope"
import { createEffect, createStore, forward, sample } from "effector-root"

export const $profileData = $userData.map(data => data.coach!)

export const loadReviewsFx = createEffect({
  handler: getCoachReviews,
})

export const $reviews = createStore<CoachReviewResponse[]>([]).on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

export const ProfileGate = createGate()

forward({
  from: ProfileGate.open,
  to: loadUserData,
})

sample({
  clock: ProfileGate.open,
  source: $profileData,
  fn: data => ({ id: data.id }),
  target: loadReviewsFx,
})

export const $sessionsPickerStore = genCoachSessions()

const changeCoachSessionCoachId = $sessionsPickerStore.changeId.prepend<CoachSelfData>(coach => coach.id)
const changeCoachSessionDurationTab = $sessionsPickerStore.tabs.changeDurationTab.prepend<CoachSelfData>(
  coach => Object.keys(coach.prices).find(key => !!coach[key]) as DurationType
)

sample({
  clock: ProfileGate.open,
  source: $profileData,
  target: changeCoachSessionCoachId,
})

sample({
  clock: ProfileGate.open,
  source: $profileData,
  target: changeCoachSessionDurationTab,
})
