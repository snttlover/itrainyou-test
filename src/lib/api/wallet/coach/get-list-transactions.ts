import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate, Pagination, Sex } from "@/lib/api/interfaces/utils.interface"

type TransactionType = "SESSION_ENROLLMENT" | "SESSION_CANCELLATION" | "TOP_UP" | "WITHDRAW" | "CLIENT_ENROLLED_SESSION"

export type Transaction = {
  id: number
  type: "TRANSFER_TO_CLIENT_WALLET" | TransactionType
  enrolledClient: null
  isHeld: boolean
  amount: string
  wallet: number
  session: {
    id: string
    coach: {
      id: string
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
    startDatetime: ISODate
    endDatetime: ISODate
    durationType: string
    translationUrl: string
    recordingUrl: string
    materials: string[]
  } | null
  creationDatetime: ISODate
}

type PaginationParams = {
  page: number
  pageSize: number
}

export const getCoachTransactionsList = (params: PaginationParams): Promise<Pagination<Transaction>> =>
  get<Pagination<Transaction>>(`${config.BACKEND_URL}/api/v1/web/coach/transactions/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
