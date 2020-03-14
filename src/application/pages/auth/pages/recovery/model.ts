import { RecoveryRequest, recovery } from "@/application/lib/api/recovery"
import { NetworkError } from "@/application/lib/network/network"
import { appDomain } from "@/application/store"
import { extractError } from "@/application/lib/network/extract-error"

const recoveryDomain = appDomain.createDomain()

// form
export const updateEmail = recoveryDomain.createEvent<string>()
export const $email = recoveryDomain.createStore(``).on(updateEmail, (state, email) => email)

// queries
export const recoveryFx = recoveryDomain.createEffect<RecoveryRequest, void, NetworkError>().use(form => recovery(form))

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

recoveryFx.fail.watch(({ error }) => updateRecoveryError(extractError(error)))
