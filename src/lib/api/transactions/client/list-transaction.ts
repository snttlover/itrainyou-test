import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate, Pagination, Sex, Day } from "@/lib/api/interfaces/utils.interface"
import { CoachSession } from "@/lib/api/coach-sessions"

type TransactionType = "SESSION_ENROLLMENT" | "SESSION_CANCELLATION" | "TOP_UP" | "WITHDRAW" | "CLIENT_ENROLLED_SESSION"

export type SessionTransaction = {
  id: number
  type: TransactionType
  isHeld: boolean
  amount: string // decimal
  wallet: number // wallet id
  creationDatetime: ISODate // iso
  enrolledClient: {
    avatar: string
    birthDate: Day
    creationDatetime: ISODate
    firstName: string
    id: number
    lastName: string
    sex: Sex
  } | null
  session: CoachSession & {
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
    client: {
      id: string
      firstName: string
      lastName: string
      birthDate: string
      sex: Sex
      avatar: string
      isTopCoach: boolean
      creationDatetime: ISODate
    }
  }
}

type PaginationParams = {
  page: number
  pageSize: number
}

export const getMyTransactions = (params: PaginationParams) =>
  get<Pagination<SessionTransaction>, {}>(
    `${config.BACKEND_URL}/api/v1/web/client/transactions/`,
    keysToSnake({
      sessionOnly: true,
      ...params,
    })
  )
    .then(response => response.data)
    .then(keysToCamel)

export const getMyTransactionsCoach = (params: PaginationParams) =>
  get<Pagination<SessionTransaction>, {}>(
    `${config.BACKEND_URL}/api/v1/web/coach/transactions/`,
    keysToSnake({
      sessionOnly: true,
      ...params,
    })
  )
    .then(response => response.data)
    .then(keysToCamel)
