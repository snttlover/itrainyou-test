import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { ChatId } from "@/lib/api/chats/coach/get-messages"

export const getCoachChat = (id: ChatId) =>
  get<PersonalChat, {}>(`${config.BACKEND_URL}/api/v1/web/coach/chats/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
