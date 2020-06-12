import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"
import { ISODate, Pagination, Sex, Day } from "@/application/lib/api/interfaces/utils.interface"
import { CoachSession } from "@/application/lib/api/coach-sessions"

type TransactionType = 'SESSION_ENROLLMENT' | 'SESSION_CANCELLATION' | 'TOP_UP' | 'WITHDRAW' | 'CLIENT_ENROLLED_SESSION'

export type SessionTransaction = {
  id: number
  type: TransactionType
  isHeld: boolean
  amount: string // decimal
  wallet: number // wallet id
  creationDatetime: ISODate // iso
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
  }
}

type PaginationParams = {
  page: number
  pageSize: number
}

export const getMyTransactions = (params: PaginationParams) =>
  get<Pagination<SessionTransaction>, {}>(`${process.env.BACKEND_URL}/api/v1/web/client/transactions/`, keysToSnake({
    sessionOnly: true,
    ...params
  }))
    .then(response => response.data)
    .then(keysToCamel)
