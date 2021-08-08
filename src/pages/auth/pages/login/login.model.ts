import { $dashboard } from "@/feature/dashboard/dashboard"
import { loggedIn, setUserData } from "@/feature/user/user.model"
import { createEffectorField } from "@/lib/generators/efffector"
import { navigateReplace } from "@/feature/navigation"
import { trimString } from "@/lib/validators"
import { routeNames } from "@/pages/route-names"
import { combine,  createEvent, createStoreObject, forward, sample, merge } from "effector-root"
import { userFound } from "@/pages/auth/pages/socials/models/units"
import { loginApiFx, LoginResponse } from "@/shared/api/login"
import { getMyUserFx } from "@/lib/api/users/get-my-user"

export const loginFx = loginApiFx.clone()

export const loginFormSent = createEvent()
export const resetLoginForm = createEvent()

export const [$phoneOrEmail, phoneOrEmailChanged, $phoneOrEmailError, $isPhoneOrEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  eventMapper: event => event.map(trimString),
  reset: resetLoginForm,
})

$phoneOrEmailError
  .on(loginFx, () => null)
  .on(loginFx.fail, () => "Неверные данные")

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  eventMapper: event => event.map(trimString),
  reset: resetLoginForm,
})

export const $loginForm = createStoreObject({
  phoneOrEmail: $phoneOrEmail,
  password: $password,
})

export const $loginFormErrors = createStoreObject({
  phoneOrEmail: $phoneOrEmailError,
  password: $passwordError,
})

export const $isFormValid = combine(
  $isPasswordCorrect,
  $isPhoneOrEmailCorrect,
  (isPasswordCorrect, isPhoneOrEmailCorrect) => isPasswordCorrect && isPhoneOrEmailCorrect
)

sample({
  source: $loginForm,
  clock: loginFormSent,
  fn: ({ phoneOrEmail, password }) => {
    let userId = phoneOrEmail
    if (phoneOrEmail.includes("@")) {
      // it's email, nothing to do transformation
    } else if (phoneOrEmail[0] === "8" || phoneOrEmail[0] === "7") {
      // it's phone
      userId = "+7" + phoneOrEmail.substr(1)
    }

    return {
      email: userId,
      password
    }
  },
  target: loginFx,
})

const loginFxUserFoundMerged = merge([loginFx.doneBody, userFound])

sample({
  source: $dashboard,
  clock: loginFxUserFoundMerged,
  fn: (dashboard, data) => {
    let url
    if (!data.user.client && !data.user.coach) {
      url = routeNames.signup("2")
    } else if (data.user.coach?.isForeverRejected) {
      url = routeNames.client()
    } else if (dashboard === "coach" && data.user.coach) {
      url = routeNames.coach()
    } else if (data.user.coach) {
      url = routeNames.coach()
    } else if (dashboard === "client") {
      url = routeNames.client()
    } else {
      url = routeNames.client()
    }
    return {
      url,
    }
  },
  target: navigateReplace,
})

forward({
  from: loginFxUserFoundMerged,
  to: [
    loggedIn,
    getMyUserFx,
    setUserData.prepend((response: LoginResponse) => ({ client: response.user.client, coach: response.user.coach })),
  ],
})
