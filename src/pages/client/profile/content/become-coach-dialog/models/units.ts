import { createEffect, createEvent, createStore, restore } from "effector-root"
import { $userData } from "@/feature/user/user.model"
import { becomeCoachRequest } from "@/lib/api/client/become-coach"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"

export const resetChangeCoachWarningDialogVisibility = createEvent()

export const changeCoachWarningDialogVisibility = createEvent<boolean>()
export const $becomeCoachWarningDialogVisibility = restore(
  changeCoachWarningDialogVisibility, false)
  .reset(resetChangeCoachWarningDialogVisibility)

export const $userHasCoach = $userData.map(user => !!user.coach)

export const becomeCoach = createEvent()

export const becomeCoachFx = createEffect({
  handler: becomeCoachRequest
})

export const changeIsClientBecomingCoach = createEvent<boolean>()
export const $isClientBecomingCoach = createStore<boolean>(false)

export const reloadUserDataFx = getMyUserApiFx.clone()
