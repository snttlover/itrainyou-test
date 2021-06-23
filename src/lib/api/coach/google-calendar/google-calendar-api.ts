import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post, get } from "@/lib/network/network"
import { DurationType } from "@/lib/api/coach-sessions"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"
import { Coach } from "@/lib/api/coach"

export interface AddGoogleCalendarParams {
  code: string
}

export interface GetGoogleEventsParamsTypes {
  start_date__lte?: string
  start_date__gte?: string
  start_date?: string
  duration_type?: DurationType
}

export interface CalendarEvents  {
  sessions: {
    clients: [any]
    id: number
    coach: CoachItemType | number | Coach
    clientPrice: string // example: 12.00
    coachPrice: string // example: 10.00
    startDatetime: ISODate // example: "2020-03-31T15:17:37Z"
    endDatetime: string
    durationType: DurationType //example: 01:00:00
    isFreeSession: boolean
  }[]
  googleCalendarEvents: {
    id: number
    startDatetime: ISODate // example: "2020-03-31T15:17:37Z"
    endDatetime: string
  }[]
}

export const googleCalendarApi = (params: AddGoogleCalendarParams) =>
  post<void, AddGoogleCalendarParams>(`${config.BACKEND_URL}/api/v1/web/coaches/me/add-calendar/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)

export const startSyncCalendar = () =>
  post<void, void>(`${config.BACKEND_URL}/api/v1/web/coaches/me/calendar-start-sync/`)
    .then(response => response.data)
    .then(keysToCamel)

export const endSyncCalendar = () =>
  post<void, void>(`${config.BACKEND_URL}/api/v1/web/coaches/me/calendar-end-sync/`)
    .then(response => response.data)
    .then(keysToCamel)

export const deleteGoogleCalendar = () =>
  post<void, void>(`${config.BACKEND_URL}/api/v1/web/coaches/me/calendar-unlink-google/`)
    .then(response => response.data)
    .then(keysToCamel)

export const getCalendarEvents = (params: GetGoogleEventsParamsTypes) =>
  get<CalendarEvents, GetGoogleEventsParamsTypes>(`${config.BACKEND_URL}/api/v1/web/coaches/me/calendar-events/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)