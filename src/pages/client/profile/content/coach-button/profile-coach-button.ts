import { attach,  createEffect, createEvent, forward, guard, restore } from "effector-root"
import { $userData } from "@/feature/user/user.model"
import { becomeCoachRequest } from "@/lib/api/client/become-coach"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { showClientProfileCoachDialog } from "@/pages/client/edit-profile/user-data/client-profile.model"

export const reset = createEvent()

export const changeProfileCoachButtonVisibility = createEvent<boolean>()
export const $profileCoachButtonVisibility = restore(changeProfileCoachButtonVisibility, false).reset(reset)

export const $userHasCoach = $userData.map(user => !!user.coach)

export const becomeCoach = createEvent()

const becomeCoachFx = createEffect({
  handler: becomeCoachRequest
})

const reloadUserDataFx = attach({
  // @ts-ignore
  effect: getMyUserFx,
  mapParams: () => {}
})

guard({
  source: reloadUserDataFx.done,
  filter: $userData.map(user => !!(user.client?.birthDate && user.client?.sex && user.client?.avatar && !!user.client?.middleName)),
  target: becomeCoachFx
})

guard({
  source: reloadUserDataFx.done,
  filter: $userData.map(user => !(user.client?.birthDate && user.client?.sex && user.client?.avatar && !!user.client?.middleName)),
  // @ts-ignore
  target: [navigatePush.prepend(() => ({ url: routeNames.clientProfileEdit(), state: { to: routeNames.coachProfileEdit() }})), showClientProfileCoachDialog]
})

forward({
  from: becomeCoach,
  to: reloadUserDataFx
})

forward({
  from: becomeCoachFx.doneData,
  to: navigatePush.prepend(() => ({ url: routeNames.coach() }))
})
