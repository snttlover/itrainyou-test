import {
  categoriesChanged,
  CoachData,
  coachDataChanged,
  REGISTER_SAVE_KEY,
  signUpPageMounted,
  UserData,
} from "@/pages/auth/pages/signup/signup.model"
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
} from "@/feature/coach-get-access/coach-get-access.model"
import { createEffect, createEvent, forward, Event } from "effector-root"
import { combineEvents, spread } from "patronum"

export const step4CoachMounted = createEvent()
const waitAllEvents = combineEvents({ events: [step4CoachMounted, signUpPageMounted] })

const loadDataFx = createEffect({
  handler(): UserData {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    return JSON.parse(stringData!)
  },
})

forward({
  from: waitAllEvents,
  to: loadDataFx,
})

spread({
  source: loadDataFx.doneData.map(data => data.coachData) as Event<CoachData>,
  targets: {
    description: descriptionChanged,
    education: educationChanged,
    phone: phoneChanged,
    photos: restorePhotos,
    videoInterview: videoInterviewChanged,
    workExperience: workExperienceChanged,
  },
})

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
