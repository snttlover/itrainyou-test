import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { CursorPagination, CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"

export type ChatMaterials = {
  file: string,
  id: number
  type: "IMAGE" | "OTHER"
}

export const getClientChatMaterials = (id: ChatId, materials: "images" | "documents", params: PaginationRequest) =>
  get<Pagination<ChatMaterials>, CursorPaginationRequest>(`${config.BACKEND_URL}/api/v1/web/client/chats/${id}/${materials}/`, params)
    .then(response => response.data)
    .then(keysToCamel)
