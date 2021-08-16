import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { updateMyUser } from "@/lib/api/users/update-my-user"
import { $token, changeToken, logout } from "@/lib/network/token"
import dayjs from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, guard, restore } from "effector-root"
import { sessionToken } from "@/feature/user/session-token"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"

export type UserData = {
  coach: CoachSelfData | null
  client: ClientSelfData | null
  timeZone?: string
}

export const loggedIn = createEvent<{ token: string }>()
export const setIsSocialSignupInProgress = createEvent<boolean>()
export const loadUserData = createEvent()
export const setUserData = createEvent<UserData>()

export const $userData = createStore<UserData>({ client: null, coach: null })
  .on([setUserData, getMyUserApiFx.fx.doneBody], (state, payload) => payload)
  .reset(logout)

export const $isFullyRegistered = $userData.map(userData => !!(userData.client || userData.coach))

export const $coachAccess = $userData.map(userData => ({
  isApproved: userData.coach?.isApproved,
  isForeverRejected: userData.coach?.isForeverRejected,
  isProfileFilled: userData.coach?.isProfileFilled,
  isTemporarilyRejected: userData.coach?.isTemporarilyRejected,
  lastRegistrationApplyDatetime: userData.coach?.lastRegistrationApplyDatetime,
  isYandexRegistrationApproved: userData.coach?.isYandexRegistrationApproved,
  isApplicationApproved: userData.coach?.isApplicationApproved,
  isYandexRegistrationCompleted: userData.coach?.isYandexRegistrationCompleted,
  paymentSystem: userData.coach?.paymentSystem,
}))

export const $isSocialSignupInProgress = restore(setIsSocialSignupInProgress, false)
export const $isLoggedIn = $token.map(token => !!token)

export const $timeZone = $userData.map(data => data.client?.user.timeZone || data.coach?.user.timeZone || data.timeZone)

forward({
  from: loggedIn.map(({ token }) => token),
  to: changeToken,
})

guard({
  source: loadUserData,
  filter: $isLoggedIn,
  target: getMyUserApiFx.fx,
})

if (process.env.BUILD_TARGET === "client") {
  $token.updates.watch(sessionToken.set)

  const setUserTimezoneFx = createEffect({
    handler: async () => {
      const timeZone = dayjs.tz.guess()
      return await updateMyUser({ timeZone })
    },
  })

  forward({
    from: guard({
      source: $userData,
      filter: combine(
        $isLoggedIn,
        $timeZone,
        (isLoggedIn, timeZone) => isLoggedIn && (!timeZone || timeZone === "UTC")
      ),
    }),
    to: setUserTimezoneFx,
  })

  forward({
    from: setUserTimezoneFx.doneData,
    to: setUserData,
  })
}
