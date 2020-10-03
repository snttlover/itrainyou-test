import { config } from "#/config"
import { ISODate, Pagination } from "#/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { get } from "#/lib/network/network"
import { DashboardSession } from "#/lib/api/coach/get-dashboard-sessions"
import { Client } from "#/lib/api/client/clientInfo"
import { CoachUser } from "#/lib/api/coach"

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

export type SessionsRemindNotificationType = {
  type: 'SESSION_REMINDER'
  sessions: DashboardSession[]
}

export type ReviewNotificationType = {
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

export type NewCoachNotificationType = {
  type: 'NEW_COACH'
  newCoach: CoachUser
}

export type Notifications = (SessionsRemindNotificationType | ReviewNotificationType | NewCoachNotificationType) & NotificationCommon

export const getClientNotifications = (pagination: GetNotificationsQuery) =>
  get<Pagination<Notifications>>(`${config.BACKEND_URL}/api/v1/web/client/notifications/`, keysToSnake(pagination))
    .then(response => response.data)
    .then(keysToCamel)
