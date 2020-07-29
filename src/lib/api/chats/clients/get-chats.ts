import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate, Pagination } from "@/lib/api/interfaces/utils.interface"
import { CoachUser } from "../../coach"
import { Client } from "@/lib/api/client/clientInfo"
import { CoachSession } from "@/lib/api/coach-sessions"

export type ChatMessage = {
  id: number
  text: string
  chat: number
  senderCoach: CoachUser | null
  senderClient: Client | null
  creationDatetime: ISODate
}


export type SystemChatType = 'SYSTEM'
export type PersonalChatType = 'PERSONAL'
export type ChatTypes = SystemChatType | PersonalChatType

type CommonChatFields = {
  id: number
  lastMessage: null | ChatMessage
  nearestSession: null | CoachSession
  materialsCount: 0
  isFavourite: false
  hadSessions: false
  newMessagesCount: 0
  creationDatetime: ISODate

  coach?: CoachUser
  clients: [Client]
  support: null
}

export type SystemChat = {
  type: SystemChatType
} & CommonChatFields

export type Chat = {
  type: PersonalChatType
} & CommonChatFields

type PaginationParams = {
  page: number
  pageSize: number
}

export const getClientChats = (params: PaginationParams) =>
  get<Pagination<Chat | SystemChat>, {}>(`${config.BACKEND_URL}/api/v1/web/client/chats/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
