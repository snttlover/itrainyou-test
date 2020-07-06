import { config } from "@/config"
import { Delete } from "@/lib/network/network"

export const removeCoachSession = (id: number) => Delete(`${config.BACKEND_URL}/api/v1/web/coach/sessions/${id}/`)
