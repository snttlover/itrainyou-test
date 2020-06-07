import {
  categoriesChanged,
  coachDataChanged,
  REGISTER_SAVE_KEY,
} from "@/application/pages/auth/pages/signup/signup.model"
import {
  descriptionChanged,
  educationChanged,
  phoneChanged,
  restorePhotos,
  videoInterviewChanged,
  workExperienceChanged,
  $form,
  $selectedCategories,
  toggleCategory,
} from "@/application/feature/coach-get-access/coach-get-access.model"
import { createEvent, forward } from "effector-next"

export const step4CoachMounted = createEvent()

step4CoachMounted.watch(() => {
  try {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    if (!stringData) return
    const data = JSON.parse(stringData)
    const coachData = data.coachData
    coachData.description && descriptionChanged(coachData.description)
    coachData.education && educationChanged(coachData.education)
    coachData.phone && phoneChanged(coachData.phone)
    coachData.photos && restorePhotos(coachData.photos)
    coachData.videoInterview && videoInterviewChanged(coachData.videoInterview)
    coachData.workExperience && workExperienceChanged(coachData.workExperience)
    data.categories && data.categories.forEach(toggleCategory)
  } catch (e) {}
})

forward({
  from: $form.updates,
  to: coachDataChanged,
})

forward({
  from: $selectedCategories.updates,
  to: categoriesChanged,
})
