import { serializeQuery } from "@app/lib/formatting/serialize-query"
import { appDomain } from "@app/store"
import { navigate } from "@reach/router"
import { createStoreObject, merge } from "effector"

export const signUpDomain = appDomain.createDomain("sign-up-domain")

export type RegisterUserType = "client" | "couch"
export const changeUserType = signUpDomain.createEvent<RegisterUserType>()
export const $registerUserType = signUpDomain
  .createStore<RegisterUserType>("client")
  .on(changeUserType, (_, payload) => payload)

export const pageMounted = signUpDomain.createEvent()
export const pageUnmount = signUpDomain.createEvent()

export const nextStep = signUpDomain.createEvent()
export const step3Finish = signUpDomain.createEvent<ClientData>()
const setStep = signUpDomain.createEvent<number>()

export const $currentStep = signUpDomain
  .createStore(1)
  .on(nextStep, state => state + 1)
  .on(step3Finish, state => state + 1)
  .on(setStep, (_, payload) => payload)

const $queryParams = createStoreObject({
  step: $currentStep,
  type: $registerUserType
})

const queryParamsChanged = merge([nextStep, changeUserType])

$queryParams.watch(queryParamsChanged, params => {
  navigate(`${location.pathname}?${serializeQuery(params)}`)
})

pageMounted.watch(() => {
  const searchParams = new URLSearchParams(location.search)
  if (searchParams.has("step")) {
    setStep(parseInt(searchParams.get("step") || "1"))
  }
  if (searchParams.has("type")) {
    changeUserType(searchParams.get("type") as RegisterUserType)
  }
})

type ClientData = {
  firstName: string
  lastName: string
  birthDate: string
  sex: "M" | "F"
  avatar: string
  categories: number[]
}

type CouchData = {
  workExperience: string
  education: string
  description: string
  phone: string
  videoInterview: string
}

type UserData =
  | {
      type: "client"
      clientData?: ClientData
    }
  | {
      type: "couch"
      clientData?: ClientData
      couchData?: CouchData
    }

const $userData = $registerUserType
  .map<UserData>(type => ({ type }))
  .on<ClientData>(step3Finish, (state, payload) => ({ type: state.type, clientData: payload }))

$userData.watch(, () => {

})
