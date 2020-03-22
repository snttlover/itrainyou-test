import { createEffectorField } from "@app/lib/generators/efffector"
import { trimString } from "@app/lib/validators"
import { signUpDomain } from "@app/pages/auth/pages/signup/signup.model"
import { combine, createStoreObject } from "effector"
import * as dayjs from 'dayjs'

export const [$name, nameChanged, $nameError, $isNameCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: '',
  validator: value => {
    if (!value) return 'Поле обязательно к заполению'
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [$lastName, lastNameChanged, $lastNameError, $isLastNameCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: '',
  validator: value => {
    if (!value) return 'Поле обязательно к заполению'
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: dayjs(),
  validator: value => null
})

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: '',
  validator: value => {
    if (!value) return 'Поле обязательно к заполению'
    return null
  }
})

export const $step3Form = createStoreObject({
  name: $name,
  lastName: $lastName,
  birthday: $birthday,
  sex: $sex
})

export const $step3FormErrors = createStoreObject({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  sex: $sexError
})

export const $isStep3FormValid = combine(
  $isNameCorrect,
  $isLastNameCorrect,
  $isBirthdayCorrect,
  $isSexCorrect,
  (...args) => args.every(val => val)
)
