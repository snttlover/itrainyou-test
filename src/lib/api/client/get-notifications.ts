import { config } from "@/config"
import { ISODate, Pagination } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { Client } from "@/lib/api/client/clientInfo"
import { CoachUser } from "@/lib/api/coach"

export interface GetNotificationsQuery {
  page: number
  pageSize: number
}

type NotificationCommon = {
  id: number
  isReadByReceiver: boolean
  clientToNotify: null | number
  coachToNotify: null | number
  creationDatetime: ISODate
}

type SessionsRemindNotification = {
  type: 'TOMORROW_SESSIONS_REMINDER'
  sessions: DashboardSession[]
}

type ReviewNotification = {
  type: 'NEW_REVIEW'
  review: {
    id: number
    session: number
    grade: number
    text: string
    reviewerClient: Client
    reviewedCoach: CoachUser
  }
}

type NewCoachNotification = {
  type: 'NEW_COACH'
  newCoach: CoachUser
}

export type Notifications = (SessionsRemindNotification | ReviewNotification | NewCoachNotification) & NotificationCommon

export const getClientNotifications = (pagination: GetNotificationsQuery) =>
  get<Pagination<Notifications>>(`${config.BACKEND_URL}/api/v1/web/client/notifications/`, keysToSnake(pagination))
    .then(response => response.data)
    .then(keysToCamel)
