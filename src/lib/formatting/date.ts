import { $userData, UserData } from "@/feature/user/user.model"
import { getStoreFromScope } from "@/scope"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/ru"
import utc from "dayjs/plugin/utc"
import isBetween from "dayjs/plugin/isBetween"
import weekday from "dayjs/plugin/weekday"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(weekday)
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ru")


export const date = (date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string): Dayjs => {
  if (date === null) date = undefined

  let options: Exclude<dayjs.OptionType, string> = {}

  if (typeof option === "string") options.format = option
  else options = { ...option }

  const userData =
    process.env.BUILD_TARGET === "client" ? getStoreFromScope($userData) : { client: { user: { timeZone: "GMT" } } }

  const timeZone = userData?.client?.user?.timeZone || dayjs.tz.guess()

  const dt = dayjs(date, options, locale)

  if (timeZone === "Atlantic/Azores" || timeZone === "GMT") return dt.utc()

  let dateWithTimeZone = dt.tz(timeZone)
  if (isNaN(dateWithTimeZone["$D"])) {
    // В мобильно хроме после 88 версии поменялась работа с таймзонами
    dateWithTimeZone = dayjs.tz(dt, timeZone)
  }

  return dateWithTimeZone
}
date.utc = dayjs.utc

export const getYearsCount = (birthday: string | undefined) => {
  !birthday && (birthday = date().toISOString())
  return date().diff(date(birthday, "YYYY-MM-DD"), "year")
}

export const formatISOStringToLocaleDateString = (iso: string, format: string) => {
  const localDate = date(iso)

  if (!localDate.isValid()) return "Invalid Date"

  return date(iso).format(format)
}
