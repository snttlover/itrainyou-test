import dayjs from "dayjs"

export const getYearsCount = (birthday: string) => {
  !birthday && (birthday = new Date().toISOString())
  return dayjs().diff(dayjs(birthday, "YYYY-MM-DDDD"), "year")
}
