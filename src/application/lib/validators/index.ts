const emailRegexp = /.{2,}@.{2,}/
export const emailValidator = (value: string) => {
  if (value.length === 0 || !emailRegexp.test(value)) return "Указана некорректная почта"
  return null
}

const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,}$/
export const passwordValidator = (value: string) => {
  if (!passwordRegexp.test(value))
    return "Пароль должен содержать латинские буквы, цифры и быть не короче 8 символов"

  return null
}

export const trimString = (value: string) => value.trim()
