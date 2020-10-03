import { config } from "@/config"
import { post } from "@/lib/network/network"

export const updateRegistrationApplication = () =>
  post(`${config.BACKEND_URL}/api/v1/web/coaches/me/update-registration-application/`, null)
