
import {
  descriptionChanged,
  educationChanged,
  restorePhotos,
  videoInterviewChanged,
  workExperienceChanged,
  $form,
  $selectedCategories,
  setCategories,
} from "@/feature/coach-get-access/coach-get-access.model"
import { createEffect, createEvent, forward, Event } from "effector-root"
import { combineEvents, spread } from "patronum"
import { CoachData, REGISTER_SAVE_KEY, UserData } from "@/pages/auth/pages/signup/models/types"
import { categoriesChanged, coachDataChanged, signUpPageMounted } from "@/pages/auth/pages/signup/models/units"
import { loadSystemInfoFx } from "@/feature/coach-get-access/coach-get-access.model"
import { config } from "@/config"

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
  // @ts-ignore
  from: $form.updates.map((coachFormData) => {
    if (config.SERVER_DEFAULT_PAYMENT_SYSTEM === "TINKOFF") {
      return {...coachFormData, inn: "", legalForm: ""}
    }
    return coachFormData
  }),
  to: coachDataChanged,
})

forward({
  from: $selectedCategories.updates,
  to: categoriesChanged,
})

forward({
  from: step4CoachMounted,
  to: loadSystemInfoFx,
})
