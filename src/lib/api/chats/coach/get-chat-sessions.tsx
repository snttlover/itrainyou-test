import { get } from "@/lib/network/network"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { excludeKeys } from "@/lib/helpers/exclude"
import { ChatSession, GetChatSessionsQuery } from "@/lib/api/chats/clients/get-chat-sessions"

export const getCoachChatSessions = (params: GetChatSessionsQuery) =>
  get<Pagination<ChatSession>, {}>(
    `${config.BACKEND_URL}/api/v1/web/coach/chats/${params.id}/sessions/`,
    keysToSnake(excludeKeys(params, [`id`]))
  )
    .then(response => response.data)
    .then(keysToCamel)
