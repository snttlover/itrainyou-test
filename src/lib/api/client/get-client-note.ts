import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface UpdateClientRequest {
  id: number
}

export interface UpdateClientResponse {
  id: number
  coach: number
  client: number
  text: string
}

export const getClientNote = ({ id }: UpdateClientRequest): Promise<UpdateClientResponse> =>
  get(`${config.BACKEND_URL}/api/v1/web/clients/${id}/note/`)
    .then(response => response.data)
    .then(keysToCamel)
