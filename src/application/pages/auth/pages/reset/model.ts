import { ResetPasswordRequest } from "@/application/lib/api/reset-password"
import { NetworkError } from "@/application/lib/network/network"
import { appDomain } from "@/application/store"
import { AxiosError } from "axios"
import { extractError } from "@/application/lib/network/extract-error"
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
export const resetPasswordFx = resetPasswordDomain.createEffect<ResetPasswordRequest, void, NetworkError>().use(form => resetPassword(form))

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

resetPasswordFx.fail.watch(({ error }) => updateResetPasswordError(extractError(error)))

