import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { loadUserData, setUserData } from "@/feature/user/user.model"
import { updateMyCoach } from "@/lib/api/coach/update-my-coach"
import { $isStep3FormValid, $step3Form } from "@/pages/coach/profile/edit-page/user-data/step3.model"
import { combine, createEffect, createEvent, forward, guard, sample } from "effector-root"
import { every } from "patronum"
import { $form, $selectedCategories, $formValid } from "./coach-data/coach-data.model"

export const saveCoachData = createEvent()

const editDataFx = createEffect({
  handler: updateMyCoach,
})

export const $canSendForm = every({ predicate: true, stores: [$isStep3FormValid, $formValid] })

sample({
  clock: guard({ source: saveCoachData, filter: $canSendForm }),
  source: combine({ user: $step3Form, coach: $form, categories: $selectedCategories }),
  fn: ({ user, coach, categories }) => ({
    firstName: user.name,
    lastName: user.lastName,
    middleName: user.middleName,
    birthDate: user.birthday.format("YYYY-MM-DD"),
    sex: user.sex,
    avatar: user.image.file,
    categories,
    workExperience: coach.workExperience,
    education: coach.education,
    description: coach.description,
    photos: coach.photos,
  }),
  target: editDataFx,
})

const successToast: Toast = { type: "info", text: "Данные успешно обновлены" }
forward({
  from: editDataFx.doneData,
  to: [toasts.remove.prepend(() => successToast), toasts.add.prepend(() => successToast), loadUserData],
})

const failToast: Toast = { type: "error", text: "Произошла ошибка, попробуйте еще раз позже" }
forward({
  from: editDataFx.failData,
  to: [toasts.remove.prepend(() => failToast), toasts.add.prepend(() => failToast)],
})
