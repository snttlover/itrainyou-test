import { config } from "@/config"
import { post } from "@/lib/network/network"

export const yandexRegistrationCompleted = () =>
  post(`${config.BACKEND_URL}/api/v1/web/coaches/me/yandex-registration-completed/`, null)