import { createEvent, restore } from "effector-root"
import { $userData } from "@/feature/user/user.model"

export const changeProfileCoachButtonVisibility = createEvent<boolean>()
export const $profileCoachButtonVisibility = restore(changeProfileCoachButtonVisibility, false)

export const $userHasCoach = $userData.map(user => !!user.coach)
