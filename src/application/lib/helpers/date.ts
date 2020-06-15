import dayjs from "dayjs"

export const date = (date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string) => {
  return dayjs(date, option, locale)
}

date.utc = dayjs.utc

export const getYearsCount = (birthday: string) => {
  !birthday && (birthday = date().toISOString())
  return date().diff(date(birthday, "YYYY-MM-DDDD"), "year")
}
