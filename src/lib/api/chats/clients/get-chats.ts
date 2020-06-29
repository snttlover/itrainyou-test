import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate, Pagination } from "@/lib/api/interfaces/utils.interface"
import { CoachUser } from "../../coach"
import { Client } from "@/lib/api/client/clientInfo"
import { CoachSession } from "@/lib/api/coach-sessions"

export type Chat = {
  id: number
  type: "PERSONAL" | "SYSTEM"
  support: null
  coach: CoachUser
  clients: [Client]
  lastMessage: null | {
    text: string,
    chat: number
    senderCoach: CoachUser | null
    senderClient: Client | null
    creationDatetime: ISODate
  }
  nearestSession: null | CoachSession
  materialsCount: 0
  isFavourite: false
  hadSessions: false
  newMessagesCount: 0
  creationDatetime: ISODate
}

type PaginationParams = {
  page: number
  pageSize: number
}

export const getClientChats = (params: PaginationParams) =>
  get<Pagination<Chat>, {}>(
    `${config.BACKEND_URL}/api/v1/web/client/chats/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
