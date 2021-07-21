import { $form, $selectedCategories, } from "@/feature/coach-get-access/coach-get-access.model"
import { createEvent, forward } from "effector-root"
import { categoriesChanged, coachDataChanged } from "@/pages/auth/pages/signup/models/units"
import { config } from "@/config"

export const step4CoachMounted = createEvent()

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
