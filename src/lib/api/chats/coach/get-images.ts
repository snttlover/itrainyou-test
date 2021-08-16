import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { CursorPagination, CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { ChatMaterials } from "@/lib/api/chats/clients/get-images"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"

export const getCoachChatMaterials = (id: ChatId, materials: "images" | "documents", params: PaginationRequest) =>
  get<Pagination<ChatMaterials>, CursorPaginationRequest>(
    `${config.BACKEND_URL}/api/v1/web/coach/chats/${id}/${materials}/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
