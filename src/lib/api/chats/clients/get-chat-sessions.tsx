import { get } from "#/lib/network/network"
import { Day, ISODate, Pagination, Sex } from "#/lib/api/interfaces/utils.interface"
import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { CoachSession } from "#/lib/api/coach-sessions"
import { Client } from "#/lib/api/client/clientInfo"
import { excludeKeys } from "#/lib/helpers/exclude"

export type ChatSession = CoachSession & {
  coach: {
    id: number
    firstName: string
    lastName: string
    birthDate: Day
    sex: Sex
    avatar: string
    isTopCoach: boolean
    creationDatetime: ISODate
  }
  clients: Client[]
}

export type GetChatSessionsQuery = {
  id: number
  page: number
  pageSize: number
  excludePast?: 'True'
  past?: 'True'
}

export const getClientChatSessions = (params: GetChatSessionsQuery) =>
  get<Pagination<ChatSession>, {}>(
    `${config.BACKEND_URL}/api/v1/web/client/chats/${params.id}/sessions/`,
    keysToSnake(excludeKeys(params, [`id`]))
  )
    .then(response => response.data)
    .then(keysToCamel)
