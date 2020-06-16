import dayjs from "dayjs"

export const date = (date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string) => {
  return dayjs(date, option, locale)
}
date.utc = dayjs.utc

export const getYearsCount = (birthday: string) => {
  !birthday && (birthday = date().toISOString())
  return date().diff(date(birthday, "YYYY-MM-DD"), "year")
}

export const formatISOStringToLocaleDateString = (iso: string, format: string) => {
  const localDate = date(iso)

  if (!localDate.isValid()) return "Invalid Date"

  return date(iso).format(format)
}
