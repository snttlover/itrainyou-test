import { ResetPasswordRequest } from "@/application/lib/api/reset-password"
import { appDomain } from "@/application/store"
import { AxiosError } from "axios"
import extractBackendErrorText from "@/application/lib/formating/extractBackendFirstErrorText"
import { resetPassword } from "@/application/lib/api/reset-password"

const resetPasswordDomain = appDomain.createDomain()

// form
export const updatePassword = resetPasswordDomain.createEvent<string>()
export const $password = resetPasswordDomain.createStore(``).on(updatePassword, (_, password) => password)

export const updateRepeatedPassword = resetPasswordDomain.createEvent<string>()
export const $repeatedPassword = resetPasswordDomain
  .createStore(``)
  .on(updateRepeatedPassword, (_, password) => password)

// queries
export const resetPasswordFx = resetPasswordDomain.createEffect<ResetPasswordRequest, void>().use(form => resetPassword(form))

// errors
export const updateResetPasswordError = resetPasswordDomain.createEvent<string>()
export const $resetPasswordError = resetPasswordDomain
  .createStore(``)
  .on(updateResetPasswordError, (state, error) => error)

// loading
export const $resetPasswordFetching = resetPasswordDomain
  .createStore(false)
  .on(resetPasswordFx, () => true)
  .on(resetPasswordFx.finally, () => false)

resetPasswordFx.done.watch(() => {
  alert("logged in")
  updateResetPasswordError(``)
  updatePassword(``)
  updateRepeatedPassword(``)
})

resetPasswordFx.fail.watch(({ error }) => {
  const axiosError = error as AxiosError
  if (axiosError.response) {
    return updateResetPasswordError(extractBackendErrorText(axiosError))
  }
})
