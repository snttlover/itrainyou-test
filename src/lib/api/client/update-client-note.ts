import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { patch } from "@/lib/network/network"

export interface UpdateClientRequest {
  id: number
  text: string
}

export interface UpdateClientResponse {
  id: number
  coach: number
  client: number
  text: string
}

export const updateClientNote = ({ id, text }: UpdateClientRequest): Promise<UpdateClientResponse> =>
  patch(`${config.BACKEND_URL}/api/v1/web/clients/${id}/note/`, { text })
    .then(response => response.data)
    .then(keysToCamel)
