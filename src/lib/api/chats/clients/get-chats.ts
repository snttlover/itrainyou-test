import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Day, ISODate, Pagination, Sex } from "@/lib/api/interfaces/utils.interface"
import { CoachUser } from "../../coach"
import { Client } from "@/lib/api/client/clientInfo"
import { CoachSession } from "@/lib/api/coach-sessions"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"

export type MessageSessionRequestStatuses = 'INITIATED' | 'COMPLETED'
export type MessageTypes = 'USER' | 'SYSTEM' | 'SUPPORT'
export type SupportTicketType = 'SUPPORT_AGENT_FOUND' | 'PROBLEM_SOLVED' | 'LOOKING_FOR_SUPPORT_AGENT'

export type ConflictStatus = 'SOLVED_IN_COACH_FAVOUR' | 'SOLVED_IN_CLIENT_FAVOUR'

export type TransActionsStatus = "MONEY_SUCCESSFULLY_HELD" | "MONEY_HOLD_UNSUCCESSFUL" | ""

export type TransActionProperties= {
    id: number
    type: "SESSION_ENROLLMENT" | "SESSION_CANCELATION" | "CLIENT_ENROLLED_SESSION"
    status: "WAITING_FOR_HOLD" | "IS_HELD" | "SESSION_CANCELLED" | "SUCCEEDED" | "REFUNDED"
    amount: string
    enrolledClient: {
        avatar: string
        birthDate: Day
        creationDatetime: ISODate
        firstName: string
        id: number
        lastName: string
        sex: Sex
    } | null
    session: {
        id: number
        isReviewed: boolean
        coach: {
            id: number
            firstName: string
            lastName: string
            birthDate: string
            sex: Sex
            avatar: string
            isTopCoach: boolean
            creationDatetime: ISODate
        }
        clientPrice: string
        coachPrice: string
        startDatetime: string
        endDatetime: string
        durationType: string
        translationUrl: string
        recordingUrl: string
        materials: string[]
    }

    rescheduleSession: null
    initiatorClient?: Client
    initiatorCoach?: CoachUser
    receiverClient?: Client
    receiverCoach?: CoachUser
    resultDatetime: ISODate
}

export type ChatMessage = {
    id: number
    type: MessageTypes
    text: string
    image: string
    chat: number
    transaction: TransActionProperties | null
    transactionType: TransActionsStatus
    senderCoach: CoachUser | null
    senderClient: Client | null
    senderSupport: Client | null
    sessionRequest: SessionRequest | null
    supportTicket: {
        support: Client
    } | null
    conflict: null | {
        status: ConflictStatus
    }
    sessionRequestStatus: MessageSessionRequestStatuses
    creationDatetime: ISODate
    systemTicketType: SupportTicketType
}


export type SystemChatType = 'SYSTEM'
export type PersonalChatType = 'PERSONAL'
export type SupportChatType = 'SUPPORT'
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
  support: Client

  isBanned: boolean
  isRestricted: boolean
}

export type SystemChat = {
  type: SystemChatType
} & CommonChatFields

export type PersonalChat = {
  type: PersonalChatType
} & CommonChatFields

export type SupportChat = {
  type: SupportChatType
} & CommonChatFields

export type Chat = PersonalChat | SystemChat | SupportChat

type PaginationParams = {
  page: number
  pageSize: number
}

export const getClientChats = (params: PaginationParams) =>
  get<Pagination<Chat>, {}>(`${config.BACKEND_URL}/api/v1/web/client/chats/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
