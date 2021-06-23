import { forward, guard, restore } from "effector-root"
import { $userData } from "@/feature/user/user.model"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import {
  showFillFieldsToBecomeCoachWarningDialog,
  userProfileGate
} from "@/pages/client/edit-profile/user-data/client-profile.model"
import {
  $isClientBecomingCoach,
  becomeCoach,
  becomeCoachFx, changeIsClientBecomingCoach,
  reloadUserDataFx
} from "@/pages/client/profile/content/become-coach-dialog/models/units"

guard({
  source: reloadUserDataFx.done,
  filter: $userData.map(user => !!(user.client?.birthDate && user.client?.sex && user.client?.avatar && user.client?.middleName)),
  target: becomeCoachFx
})

guard({
  source: reloadUserDataFx.done,
  filter: $userData.map(user => !(user.client?.birthDate && user.client?.sex && user.client?.avatar && user.client?.middleName)),
  // @ts-ignore
  target: [
    changeIsClientBecomingCoach.prepend(() => true),
    navigatePush.prepend(
      () => ({ url: routeNames.clientProfileEdit(), state: { to: routeNames.coachProfileEdit() }})
    ),
    showFillFieldsToBecomeCoachWarningDialog,
  ]
})

forward({
  from: becomeCoach,
  to: reloadUserDataFx
})

forward({
  from: becomeCoachFx.doneData,
  to: navigatePush.prepend(() => ({ url: routeNames.coach() }))
})

$isClientBecomingCoach.on(
  changeIsClientBecomingCoach, (_, value) => value,
).reset(userProfileGate.close)