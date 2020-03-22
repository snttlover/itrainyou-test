import { RecoveryRequest, recovery } from "@/application/lib/api/recovery"
import { appDomain } from "@/application/store"

import { createEffectorField, UnpackedStoreObjectType } from "@app/lib/generators/efffector"
import { emailValidator, trimString } from "@app/lib/validators"
import { AxiosError } from "axios"
import { combine, createStoreObject, sample } from "effector"

const recoveryDomain = appDomain.createDomain()

export const recoveryFormSended = recoveryDomain.createEvent()

export const recoveryFx = recoveryDomain.createEffect<UnpackedStoreObjectType<typeof $recoveryForm>, RecoveryRequest, AxiosError>({
  handler: ({ email }) => recovery({ email })
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  domain: recoveryDomain,
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString)
})

export const $commonError = recoveryDomain
  .createStore<string | null>(null)
  .on(recoveryFx, () => null)
  .on(recoveryFx.fail, (state, { error }) => `Почта не найдена`)

export const $recoveryForm = createStoreObject({
  email: $email
})

export const $recoveryFormErrors = createStoreObject({
  email: $emailError
})

export const $isFormValid = combine(
  $isEmailCorrect,
  (isEmailCorrect) => isEmailCorrect
)


export const updateRecoverySuccessMessageVisibility = recoveryDomain.createEvent<boolean>()
export const $recoverySuccessMessageVisibility = recoveryDomain
  .createStore(false)
  .on(updateRecoverySuccessMessageVisibility, (state, status) => status)
  .on(recoveryFx.done, () => true)

sample({
  source: $recoveryForm,
  clock: recoveryFormSended,
  target: recoveryFx
})

