import { config } from "@/config"
import { Delete } from "@/lib/network/network"

export const deleteCard = (id: number) => Delete(`${config.BACKEND_URL}/api/v1/web/client/cards/${id}/`)
