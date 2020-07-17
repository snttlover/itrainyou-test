import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Chat } from "@/lib/api/chats/clients/get-chats"

export const getCoachChat = (id: number) =>
  get<Chat, {}>(`${config.BACKEND_URL}/api/v1/web/coach/chats/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
