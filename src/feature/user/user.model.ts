import { ClientSelfData } from "../../lib/api/client/clientInfo"
import { CoachSelfData } from "../../lib/api/coach/get-my-coach"
import { getMyUser, GetMyUserResponse } from "../../lib/api/users/get-my-user"
import { serverStarted, TOKEN_KEY } from "../../store"
import { createEffect, createEvent, createStore } from "effector-root"
import Cookies from "js-cookie"

export type UserData = {
  coach: CoachSelfData | null
  client: ClientSelfData | null
}

export const loggedIn = createEvent<{ token: string }>()
export const setUserData = createEvent<UserData>()
export const logout = createEvent()

export const loadUserDataFx = createEffect<void, GetMyUserResponse>({
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

export const $token = createStore<string | undefined>("")
  .on(serverStarted, (state, payload) => payload.cookies[TOKEN_KEY])
  .on(loggedIn, (state, payload) => payload.token)
  .on(changeToken, (_, token) => token)
  .reset(logout)

export const $isLoggedIn = createStore(false)
  .on(loggedIn, () => true)
  .on($token, (state, payload) => !!payload)
  .reset(logout)

if (typeof window !== "undefined") {
  const tokenCookie = Cookies.get(TOKEN_KEY)
  tokenCookie && loggedIn({ token: tokenCookie })

  $token.updates.watch(token => {
    if (token) Cookies.set(TOKEN_KEY, token)
    else Cookies.remove(TOKEN_KEY)
  })
}
