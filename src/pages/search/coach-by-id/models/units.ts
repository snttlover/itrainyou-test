import { createEffect, createEvent, createStore, restore } from "effector-root"
import { removeCoachFromFavourites } from "@/lib/api/coach/remove-coach-from-favourites"
import { Coach, getCoach } from "@/lib/api/coach"
import { CoachReviewResponse, getCoachReviews } from "@/lib/api/reviews"
import { DurationType } from "@/lib/api/coach-sessions"
import { addCoachToFavourites } from "@/lib/api/coach/add-coach-to-favourites"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"
import { genCoachSessions, genFreeSessions } from "@/oldcomponents/coach-card/select-date/select-date.model"

export const loadCoachFx = createEffect({
  handler: getCoach,
})

export const loadReviewsFx = createEffect({
  handler: getCoachReviews,
})

export const addToFavouriteFx = createEffect({
  handler: addCoachToFavourites,
})

export const removeFromFavouriteFx = createEffect({
  handler: removeCoachFromFavourites,
})

export const mounted = createEvent<{ id: number }>()

export const toggleCreditCardsModal = createEvent<void | boolean>()

export const $sessionsPickerStore = genCoachSessions()

export const $freeSessionsPickerStore = genCoachSessions(0,true)

export const $allFreeSessionsStore = genFreeSessions()

export const $creditCardsModalVisibility = createStore<boolean>(false)

export const $coach = createStore<Coach | null>(null)

export const $isNotFound = createStore(false)

export const $reviews = createStore<CoachReviewResponse[]>([])

export const changeCoachSessionCoachId = $sessionsPickerStore.changeId.prepend<Coach>(coach => coach.id)

export const changeCoachFreeSessionCoachId = $freeSessionsPickerStore.changeId.prepend<Coach>(coach => coach.id)

export const changeCoachSessionDurationTab = $sessionsPickerStore.tabs.changeDurationTab.prepend<Coach>(
  coach => Object.keys(coach.prices).find(key => !!coach[key]) as DurationType
)

export const changeCoachFreeSessionDurationTab = $freeSessionsPickerStore.tabs.changeDurationTab.prepend<Coach>(
  coach => Object.keys(coach.prices).find(key => !!coach[key]) as DurationType
)

export const toggleFavourite = createEvent()
export const $isFavourite = $coach.map(coach => !!coach?.isFavourite)

export const $id = restore(
  mounted.map(({ id }) => id),
  -1
)