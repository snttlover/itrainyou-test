import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"

export const getClientChatMessages = (id: number, params: CursorPaginationRequest) =>
  get<CursorPagination<ChatMessage>, CursorPaginationRequest>(`${config.BACKEND_URL}/api/v1/web/client/chats/${id}/messages/`, params)
    .then(response => response.data)
    .then(keysToCamel)
