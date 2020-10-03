import {
  categoriesChanged,
  coachDataChanged,
  REGISTER_SAVE_KEY,
  signUpPageMounted,
} from "#/pages/auth/pages/signup/signup.model"
import {
  descriptionChanged,
  educationChanged,
  phoneChanged,
  restorePhotos,
  videoInterviewChanged,
  workExperienceChanged,
  $form,
  $selectedCategories,
  setCategories,
} from "#/feature/coach-get-access/coach-get-access.model"
import { createEffect, createEvent, forward } from "effector-root"
import { combineEvents, spread } from "patronum"

export const step4CoachMounted = createEvent()
const waitAllEvents = combineEvents([step4CoachMounted, signUpPageMounted])

const loadDataFx = createEffect({
  handler() {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    return JSON.parse(stringData!)
  },
})

forward({
  from: waitAllEvents,
  to: loadDataFx,
})

spread(
  loadDataFx.doneData.map(data => data.coachData),
  {
    description: descriptionChanged,
    education: educationChanged,
    phone: phoneChanged,
    photos: restorePhotos,
    videoInterview: videoInterviewChanged,
    workExperience: workExperienceChanged,
  }
)

forward({
  from: loadDataFx.doneData.map(data => data.categories),
  to: setCategories,
})

forward({
  from: $form.updates,
  to: coachDataChanged,
})

forward({
  from: $selectedCategories.updates,
  to: categoriesChanged,
})
