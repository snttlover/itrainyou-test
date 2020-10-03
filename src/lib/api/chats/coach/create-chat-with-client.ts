import { PersonalChat } from "#/lib/api/chats/clients/get-chats"
import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

export const createChatWithClient = (id: number) =>
  post<PersonalChat, void>(`${config.BACKEND_URL}/api/v1/web/coach/chats/`, keysToSnake({ client: id }))
    .then(response => response.data)
    .then(keysToCamel)
