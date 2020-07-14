import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { Chat } from "@/lib/api/chats/clients/get-chats"

type PaginationParams = {
  page: number
  pageSize: number
}

export const getCoachChats = (params: PaginationParams) =>
  get<Pagination<Chat>, {}>(
    `${config.BACKEND_URL}/api/v1/web/coach/chats/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
