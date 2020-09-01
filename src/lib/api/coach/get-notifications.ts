import { config } from "@/config"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { GetNotificationsQuery, Notifications } from "@/lib/api/client/get-notifications"

export const getCoachNotifications = (pagination: GetNotificationsQuery) =>
  get<Pagination<Notifications>>(`${config.BACKEND_URL}/api/v1/web/coach/notifications/`, keysToSnake(pagination))
    .then(response => response.data)
    .then(keysToCamel)
