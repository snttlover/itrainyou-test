import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { getMyUser } from "@/lib/api/users/get-my-user"
import { createEffect, createEvent, createStore, forward, guard } from "effector-root"
import Cookies from "js-cookie"

export type UserData = {
  coach: CoachSelfData | null
  client: ClientSelfData | null
}

export const TOKEN_COOKIE_KEY = "token"

export const loggedIn = createEvent<{ token: string }>()
export const loadUserData = createEvent()
export const setUserData = createEvent<UserData>()
export const logout = createEvent()

export const loadUserDataFx = createEffect({
  handler: getMyUser,
})

export const $userData = createStore<UserData>({ client: null, coach: null }).on(
  [setUserData, loadUserDataFx.doneData],
  (state, payload) => payload
)

export const $isFullRegistered = $userData.map(userData => userData.client || userData.coach)

export const $coachAccess = $userData.map(userData => ({
  isApproved: userData.coach?.isApproved,
  isForeverRejected: userData.coach?.isForeverRejected,
  isProfileFilled: userData.coach?.isProfileFilled,
  isTemporarilyRejected: userData.coach?.isTemporarilyRejected,
  lastRegistrationApplyDatetime: userData.coach?.lastRegistrationApplyDatetime,
}))

export const changeToken = createEvent<string>()

export const $token = createStore<string>("")
  .on(changeToken, (_, token) => token)
  .reset(logout)

export const $isLoggedIn = $token.map(token => !!token)

forward({
  from: loggedIn.map(({ token }) => token),
  to: changeToken,
})

guard({
  source: loadUserData,
  filter: $isLoggedIn,
  target: loadUserDataFx,
})

if (process.env.BUILD_TARGET === "client") {
  $token.updates.watch(token => Cookies.set(TOKEN_COOKIE_KEY, token))
}
