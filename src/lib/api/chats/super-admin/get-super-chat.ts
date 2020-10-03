import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { get } from "#/lib/network/network"
import { Chat } from "#/lib/api/chats/clients/get-chats"
import { ChatId } from "#/lib/api/chats/coach/get-messages"

export const getSupervisorChat = (id: ChatId) =>
  get<Chat, {}>(`${config.BACKEND_URL}/api/v1/web/super-admin/chats/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
