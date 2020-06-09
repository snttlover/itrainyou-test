import { post } from "@/application/lib/network/network"

export const updateRegistrationApplication = () =>
  post(`${process.env.BACKEND_URL}/api/v1/web/coaches/me/update-registration-application/`, null)
