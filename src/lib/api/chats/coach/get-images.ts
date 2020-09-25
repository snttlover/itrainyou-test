import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { ChatImage } from "@/lib/api/chats/clients/get-images"

export const getCoachChatImages = (id: ChatId, params: CursorPaginationRequest) =>
  get<CursorPagination<ChatImage>, CursorPaginationRequest>(`${config.BACKEND_URL}/api/v1/web/coach/chats/${id}/images/`, params)
    .then(response => response.data)
    .then(keysToCamel)
