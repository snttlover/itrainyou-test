import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export interface AddGoogleCalendarParams {
  refreshToken: string
}

export const addGoogleCalendar = (params: AddGoogleCalendarParams) =>
  post<void, AddGoogleCalendarParams>(`${config.BACKEND_URL}/api/v1/web/coaches/me/add-calendar/`, params)
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
