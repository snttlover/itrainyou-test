import { Coach, getCoach } from "@/lib/api/coach"
import { addCoachToFavourites } from "@/lib/api/coach/add-coach-to-favourites"
import { removeCoachFromFavourites } from "@/lib/api/coach/remove-coach-from-favourites"
import { CoachReviewResponse, getCoachReviews } from "@/lib/api/reviews"
import { createGate, runInScope } from "@/scope"
import { createEffect, createEvent, createStore, forward, sample, guard, merge, restore, combine } from "effector-root"
import { genCoachSessions } from "@/components/coach-card/select-date/select-date.model"
import { DurationType } from "@/lib/api/coach-sessions"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"


export const $sessionsPickerStore = genCoachSessions()

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
export const showCreditCardsModal = createEvent<void | boolean>()

export const showBulkedSessionsModal = createEvent<void | boolean>()

export const $creditCardsModal = createStore<boolean>(false)
  .on(showCreditCardsModal, (state,payload) => {
    if (payload) return false
    return !state})
  .on($sessionsPickerStore.buySessionBulk, (state,payload) => false)
  .reset(mounted)

export const $bulkedSessionsModal = createStore<boolean>(false)
  .on(showBulkedSessionsModal, (state, payload) => {
    if (payload) return true
    return !state})
  .on($sessionsPickerStore.buySessionBulk, (state,payload) => true)
  .reset([mounted])

export const $coach = createStore<Coach | null>(null)
  .on(loadCoachFx.doneData, (state, payload) => payload)
  .reset([mounted])

export const $isNotFound = createStore(false)
  .on(loadCoachFx.failData, () => true)
  .reset([mounted])

export const $reviews = createStore<CoachReviewResponse[]>([]).on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

export const $bulkedSessions = createStore([])
  .on($sessionsPickerStore.buySessionsFx.doneData, (state, payload) => payload)
  .reset([mounted])

export const $bulkedSessionsForView = $bulkedSessions.map(sessions =>
  sessions.map((session: {
    id: number
    startDatetime: string
    endDatetime: string
    durationType: string
    coach: CoachItemType
    coachPrice: string
  }) => ({
    id: session.id,
    startDateTime: session.startDatetime,
    endDateTime: session.endDatetime,
    duration: session.durationType,
    coach: session.coach,
    price: session.coachPrice,
  }))
)

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

export const toggleFavourite = createEvent()
export const $isFavourite = $coach.map(coach => !!coach?.isFavourite).on(toggleFavourite, state => !state)
const $id = restore(
  mounted.map(({ id }) => id),
  -1
)

sample({
  clock: guard({ source: toggleFavourite, filter: $isFavourite }),
  source: $id,
  fn: id => ({ id }),
  target: addToFavouriteFx,
})

sample({
  clock: guard({ source: toggleFavourite, filter: $isFavourite.map(is => !is) }),
  source: $id,
  fn: id => ({ id }),
  target: removeFromFavouriteFx,
})
