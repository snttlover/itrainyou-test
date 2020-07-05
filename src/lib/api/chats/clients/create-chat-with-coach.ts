import { Chat } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export const createChatWithCoach = (id: number) =>
  post<Chat, void>(`${config.BACKEND_URL}/api/v1/web/client/chats/`, keysToSnake({ coach: id }))
    .then(response => response.data)
    .then(keysToCamel)
