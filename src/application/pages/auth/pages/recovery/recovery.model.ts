import { RecoveryRequest, recovery } from "@/application/lib/api/recovery"
import { createEffectorField, UnpackedStoreObjectType } from "@/application/lib/generators/efffector"
import { emailValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStore, createStoreObject, sample } from "effector-next"

export const recoveryFormSended = createEvent()

export const recoveryFx = createEffect<UnpackedStoreObjectType<typeof $recoveryForm>, RecoveryRequest, AxiosError>({
  handler: ({ email }) => recovery({ email })
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString)
})

export const $commonError = createStore<string | null>(null)
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


export const updateRecoverySuccessMessageVisibility = createEvent<boolean>()
export const $recoverySuccessMessageVisibility = createStore(false)
  .on(updateRecoverySuccessMessageVisibility, (state, status) => status)
  .on(recoveryFx.done, () => true)

sample({
  source: $recoveryForm,
  clock: recoveryFormSended,
  target: recoveryFx
})

