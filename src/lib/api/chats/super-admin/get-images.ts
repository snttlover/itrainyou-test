import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"

export type ChatImage = {
  file: string,
  id: number
  type: "IMAGE"
}

export const getSupervisorChatImages = (id: ChatId, params: PaginationRequest) =>
  get<Pagination<ChatImage>, CursorPaginationRequest>(`${config.BACKEND_URL}/api/v1/web/support/chats/${id}/images/`, params)
    .then(response => response.data)
    .then(keysToCamel)
