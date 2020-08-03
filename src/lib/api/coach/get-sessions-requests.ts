import { get } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { ISODate, Pagination } from "@/lib/api/interfaces/utils.interface"
import { Client } from "@/lib/api/client/clientInfo"
import { CoachUser } from "@/lib/api/coach"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"

export type GetCoachSessionRequestsQuery = {
  session: number
  pageSize: number
  page: number
}

export type SessionRequestTypes = "CANCEL" | "RESCHEDULE" | "BOOK" | "CONFIRMATION_COMPLETION"
export type SessionRequestStatus = "AWAITING" | "APPROVED" | "AUTOMATICALLY_APPROVED" | "DENIED" | "CANCELLED"
export type SessionRequestProblems = "COACH_ABSENT" | "COACH_INADEQUATE" | "OTHER"

export type SessionRequest = {
  id: number
  type: SessionRequestTypes
  status: SessionRequestStatus
  problem: SessionRequestProblems
  initiatorClient: Client | null
  initiatorCoach: CoachUser | null
  receiverClient: Client | null
  receiverCoach: CoachUser
  session: DashboardSession
  rescheduleSession: null | {
    id: number
    coach: number
    startDatetime: ISODate
    endDatetime: ISODate
  }
  creationDatetime: ISODate
  resultDatetime: ISODate
}

export const getCoachSessionRequests = (params: GetCoachSessionRequestsQuery) =>
  get<Pagination<SessionRequest>, {}>(`${config.BACKEND_URL}/api/v1/web/coach/session-requests/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
