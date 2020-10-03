import { get } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { SessionInfo } from "@/lib/api/coach/get-session"

export const getClientSession = (id: number): Promise<SessionInfo> =>
  get(`${config.BACKEND_URL}/api/v1/web/client/sessions/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
