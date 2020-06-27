const emailRegexp = /.{2,}@.{2,}\..+/
export const emailValidator = (value: string) => {
  if (value.length === 0 || !emailRegexp.test(value)) return "Указана некорректная почта"
  return null
}

const passwordRegexp = /^[a-zA-Z0-9]+$/
export const passwordValidator = (value: string) => {
  if (value.length < 8) {
    return `Пароль должен состоять как минимум из 8 символов`
  }

  if (!passwordRegexp.test(value)) return "Пароль должен состоять только из латинских букв или цифр"

  return null
}

export const trimString = (value: string) => value.trim()

/**
 *
 * @param value - like +7 999 999-99-99
 */
export const phoneValidator = (value: string) => {
  const clearValue = value.replace(/[^0-9]/g, "")
  if (clearValue.length !== 11) return "Неверный формат номера телефона"

  return null
}