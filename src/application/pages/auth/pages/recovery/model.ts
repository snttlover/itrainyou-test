import { RecoveryRequest, recovery } from "@/application/lib/api/recovery"
import { appDomain } from "@/application/store"
import { AxiosError } from "axios"
import extractBackendErrorText from "@/application/lib/formating/extractBackendFirstErrorText"

const recoveryDomain = appDomain.createDomain()

// form
export const updateEmail = recoveryDomain.createEvent<string>()
export const $email = recoveryDomain.createStore(``).on(updateEmail, (state, email) => email)

// queries
export const recoveryFx = recoveryDomain.createEffect<RecoveryRequest, void>().use(form => recovery(form))

// errors
export const updateRecoveryError = recoveryDomain.createEvent<string>()
export const $recoveryError = recoveryDomain.createStore(``).on(updateRecoveryError, (state, error) => error)

export const updateRecoverySuccessMessageVisibility = recoveryDomain.createEvent<boolean>()
export const $recoverySuccessMessageVisibility = recoveryDomain
  .createStore(false)
  .on(updateRecoverySuccessMessageVisibility, (state, status) => status)
  .on(recoveryFx.done, () => true)

// loading
export const $recoveryFetching = recoveryDomain
  .createStore(false)
  .on(recoveryFx, () => true)
  .on(recoveryFx.finally, () => false)

recoveryFx.done.watch(() => {
  updateRecoveryError(``)
  updateEmail(``)
})

recoveryFx.fail.watch(({ error }) => {
  const axiosError = error as AxiosError
  if (axiosError.response) {
    return updateRecoveryError(extractBackendErrorText(axiosError))
  }
})
