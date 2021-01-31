import { forward, guard, sample } from "effector-root"
import {
  $bookSessionsStatusModalVisibility,
  $bulkedSessions,
  $coach,
  $creditCardsModalVisibility,
  $id,
  $isFavourite,
  $isNotFound,
  $reviews,
  $sessionsPickerStore,
  addToFavouriteFx,
  changeCoachSessionCoachId,
  changeCoachSessionDurationTab,
  loadCoachFx,
  loadReviewsFx,
  mounted,
  removeFromFavouriteFx,
  toggleCreditCardsModal,
  toggleBookSessionsStatusModal,
  toggleFavourite
} from "@/pages/search/coach-by-id/models/units"
import { finishSaveCardFx } from "@/feature/client-funds-up/dialog/fund-up.model"

$creditCardsModalVisibility.on(
  toggleCreditCardsModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })
  .on($sessionsPickerStore.buySessionBulk, () => {
    console.log("kek")
    console.log("ale")
    return false
  })
  .reset(mounted)

$bookSessionsStatusModalVisibility.on(
  toggleBookSessionsStatusModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })
  .on($sessionsPickerStore.buySessionBulk, () => true)
  .on(finishSaveCardFx, () => true)
  .reset([mounted])

$coach.on(
  loadCoachFx.doneData,
  (state, payload) => payload
).reset([mounted])

$isNotFound.on(
  loadCoachFx.failData, () => true
).reset([mounted])

$reviews.on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

$bulkedSessions.on(
  $sessionsPickerStore.buySessionsFx.doneData,
  (state, payload) => payload
).reset([mounted])

$isFavourite.on(toggleFavourite, state => !state)

forward({
  from: loadCoachFx.doneData,
  to: [changeCoachSessionCoachId, changeCoachSessionDurationTab],
})

forward({
  from: mounted,
  to: [loadCoachFx, loadReviewsFx],
})

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
