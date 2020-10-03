import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { date } from "@/lib/formatting/date"

const sessionStatuses = {
  started: `Сессия началась`,
  finished: `Сессия прошла`,
  doesNotExist: `Нет ближайших сессий`
}

export const getSessionStatusByDates = (start?: ISODate, end?: ISODate) => {
  if (!start || !end) {
    return sessionStatuses.doesNotExist
  }

  if (date(new Date()).isAfter(date(end))) {
    return sessionStatuses.finished
  }

  if (date(new Date()).isAfter(date(start))) {
    return sessionStatuses.started
  }

  return date(start).format(`DD MMMM HH:mm`)
}
