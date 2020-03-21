import { appDomain } from "@app/store"

export const signUpDomain = appDomain.createDomain("sign-up-domain")

export type RegisterUserType = "client" | "couch"
export const changeUserType = signUpDomain.createEvent<RegisterUserType>()
export const $registerUserType = signUpDomain
  .createStore<RegisterUserType>("client")
  .on(changeUserType, (_, payload) => payload)

export const pageMounted = signUpDomain.createEvent()
export const pageUnmount = signUpDomain.createEvent()

export const nextStep = signUpDomain.createEvent()
const setStep = signUpDomain.createEvent<number>()

export const $currentStep = signUpDomain
  .createStore(1)
  .on(nextStep, state => state + 1)
  .on(setStep, (_, payload) => payload)

const STEP_KEY = "__register-step__"

$currentStep.watch(nextStep, step => {
  localStorage.setItem(STEP_KEY, JSON.stringify(step))
})

pageMounted.watch(() => {
  const rawSavedStep = localStorage.getItem(STEP_KEY)
  if (!rawSavedStep) return
  try {
    setStep(JSON.parse(rawSavedStep))
  } catch (error) {
    /* ignore */
  }
})

pageUnmount.watch(() => {
  localStorage.removeItem(STEP_KEY)
})
