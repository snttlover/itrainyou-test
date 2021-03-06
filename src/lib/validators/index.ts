const emailRegexp = /.{2,}@.{2,}\..+/
export const emailValidator = (value: string) => {
  if (value.length === 0 || !emailRegexp.test(value)) return "Указана некорректная почта"
  return null
}

const passwordRegexp = /^[a-zA-Z0-9]+$/
export const passwordValidator = (value: string) => {
  if (value.length < 8) {
    return "Пароль должен состоять как минимум из 8 символов"
  }

  if (!passwordRegexp.test(value)) return "Пароль должен состоять только из латинских букв или цифр"

  return null
}

export const trimString = (value: string | null) => value === null ? "" : value.trim()

export const phoneValidator = (value: string) => {
  // ToDo вникнуть в чем вообще проблема (value может прийти null / undefined), пока просто проверку повесил, но проблему надо решать от корня
  // const clearValue = value.replace(/[^0-9]/g, "")
  const clearValue = value ? value.replace(/[^0-9]/g, "") : ""
  if (clearValue?.length !== 11) return "Неверный формат номера телефона"

  return null
}

export const innValidator = (inn: string) => {
  let result = false
  const error = {code: 0, message: ""}

  if (!inn.length) {
    error.code = 1
    error.message = "ИНН пуст"
  } else if (/[^0-9]/.test(inn)) {
    error.code = 2
    error.message = "ИНН может состоять только из цифр"
  } else if ([10, 12].indexOf(inn.length) === -1) {
    error.code = 3
    error.message = "ИНН может состоять только из 10 или 12 цифр"
  } else {
    const checkDigit = function (inn: string, coefficients: any) {
      let n = 0
      for (const i in coefficients) {
        n += coefficients[i] * inn[i]
      }
      // @ts-ignore
      return parseInt(n % 11 % 10)
    }
    switch (inn.length) {
    case 10:
      // eslint-disable-next-line no-case-declarations
      const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8])
      if (n10 === parseInt(inn[9])) {
        result = true
      }
      break
    case 12:
      // eslint-disable-next-line no-case-declarations
      const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
      // eslint-disable-next-line no-case-declarations
      const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
      if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
        result = true
      }
      break
    }

    if (!result) {
      error.code = 4
      error.message = "Неправильный ИНН"
    }
  }
  return error.message
}