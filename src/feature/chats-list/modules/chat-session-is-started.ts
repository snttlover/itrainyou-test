import { PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"

export const chatSessionIsStarted = (chat: PersonalChat) => {
  if (!chat.nearestSession) {
    return false
  }

  // если до сессии осталось 5 мин она считается начатой
  const startDate = date(chat.nearestSession.startDatetime).subtract(5, "minute")
  const endDate = date(chat.nearestSession.endDatetime)

  return date().isBetween(startDate, endDate)
}
