import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { keysToCamel } from "@/lib/network/casing"
import { $token, changeToken, logout, TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { createEvent, createStore, forward, guard, merge, restore } from "effector-root"
import Cookies from "js-cookie"

export type UserData = {
  coach: CoachSelfData | null
  client: ClientSelfData | null
}

export const loggedIn = createEvent<{ token: string }>()
export const loadUserData = createEvent()
export const setUserData = createEvent<UserData>()


export const $userData = createStore<UserData>({ client: null, coach: null })
  .on([setUserData, getMyUserFx.doneData.map(data => keysToCamel(data.data))], (state, payload) => payload)
  .reset(logout)

export const $restrictedUsers = createStore<number[]>( []).on(
  [setUserData, getMyUserFx.doneData.map(data => keysToCamel(data.data))],
  (_, user: UserData) => user.coach?.restrictedClients || []
).reset(logout)

export const $bannedUsers = createStore<number[]>([]).on(
  [setUserData, getMyUserFx.doneData.map(data => keysToCamel(data.data))],
  (_, user: UserData) => user.coach?.bannedClients || []
).reset(logout)

export const $isFullRegistered = $userData.map(userData => userData.client || userData.coach)

export const $coachAccess = $userData.map(userData => ({
  isApproved: userData.coach?.isApproved,
  isForeverRejected: userData.coach?.isForeverRejected,
  isProfileFilled: userData.coach?.isProfileFilled,
  isTemporarilyRejected: userData.coach?.isTemporarilyRejected,
  lastRegistrationApplyDatetime: userData.coach?.lastRegistrationApplyDatetime,
}))

export const $isLoggedIn = $token.map(token => !!token)

forward({
  from: loggedIn.map(({ token }) => token),
  to: changeToken,
})

guard({
  source: loadUserData,
  filter: $isLoggedIn,
  target: getMyUserFx,
})

if (process.env.BUILD_TARGET === "client") {
  $token.updates.watch(token => Cookies.set(TOKEN_COOKIE_KEY, token))
}
