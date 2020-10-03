import { config } from "@/config"
import { GetMyUserResponse } from "@/lib/api/users/get-my-user"
import { keysToCamel } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export const becomeCoachRequest = (): Promise<GetMyUserResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/clients/me/become-coach/`)
    .then(response => response.data)
    .then(keysToCamel)
