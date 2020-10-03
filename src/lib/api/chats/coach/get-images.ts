import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { get } from "#/lib/network/network"
import { CursorPagination, CursorPaginationRequest, Pagination } from "#/lib/api/interfaces/utils.interface"
import { ChatId } from "#/lib/api/chats/coach/get-messages"
import { ChatImage } from "#/lib/api/chats/clients/get-images"
import { PaginationRequest } from "#/feature/pagination/modules/pagination"

export const getCoachChatImages = (id: ChatId, params: PaginationRequest) =>
  get<Pagination<ChatImage>, CursorPaginationRequest>(`${config.BACKEND_URL}/api/v1/web/coach/chats/${id}/images/`, params)
    .then(response => response.data)
    .then(keysToCamel)
