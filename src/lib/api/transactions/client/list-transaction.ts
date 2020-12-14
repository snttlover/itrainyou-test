import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate, Pagination, Sex, Day } from "@/lib/api/interfaces/utils.interface"

type TransactionType = "SESSION_ENROLLMENT" | "SESSION_CANCELATION" | "TOP_UP" | "WITHDRAW" | "CLIENT_ENROLLED_SESSION" | "TRANSFER_TO_CLIENT_WALLET"

export type SessionTransaction = {
  id: number
  type: TransactionType
  status: "WAITING_FOR_HOLD" | "IS_HELD" | "SESSION_CANCELLED" | "SUCCEEDED" | "REFUNDED"
  isHeld: boolean
  amount: string
  session: {
  id: number
    coach: {
    id: number
      firstName: string
      lastName: string
      birthDate: string
      sex: "M" | "F"
      avatar: string
      isTopCoach: boolean
      creationDatetime: string
  },
  clientPrice: string
    coachPrice: string
    startDatetime: string
    endDatetime: string
    durationType: string
    translationUrl: string
    recordingUrl: string
    materials: string[]
},
  creationDatetime: string
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
